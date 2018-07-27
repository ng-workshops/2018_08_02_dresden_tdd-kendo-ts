import { Validator, InputForValidation } from './validation/validation';

function generateForm() {
  const form = `
  <form class="test-form">
    <input name="first-name" type="text" data-validation="alphabetical" placeholder="firstname" />
    <input name="age" type="text" data-validation="numeric" placeholder="age" />
  </form>`;

  var body = document.getElementsByTagName('body')[0];
  const container = document.createElement('div');
  container.style.display = 'none';
  container.innerHTML = form;
  body.appendChild(container);

  let formElement = document.querySelector('.test-form');
  return formElement.cloneNode(true) as HTMLFormElement;
}

describe('Testing the form', function() {
  let sut: Validator;
  let form: HTMLFormElement;

  beforeEach(() => {
    sut = new Validator();
    form = generateForm();
  });

  it('should validate a form with all of the possible validation types', function() {
    const name = form.querySelector('input[name="first-name"]') as HTMLInputElement;
    const age = form.querySelector('input[name="age"]') as HTMLInputElement;

    name.value = 'Bob';
    age.value = '42';

    const result = sut.validateForm(form);
    expect(result.isValid).toBeTruthy();
    expect(result.errors.length).toEqual(0);
  });

  it('should return an error when a name is invalid', function() {
    const name = form.querySelector('input[name="first-name"]') as HTMLInputElement;
    const age = form.querySelector('input[name="age"]') as HTMLInputElement;

    name.value = '!!!';
    age.value = '42';

    const result = sut.validateForm(form);

    expect(result.isValid).toBeFalsy();
    expect(result.errors[0]).toBeDefined();
    expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
  });

  it('should return an error when an age is invalid', function() {
    const name = form.querySelector('input[name="first-name"]') as HTMLInputElement;
    const age = form.querySelector('input[name="age"]') as HTMLInputElement;

    name.value = 'Greg';
    age.value = 'a';

    const result = sut.validateForm(form);

    expect(result.isValid).toBeFalsy();
    expect(result.errors[0]).toBeDefined();
    expect(result.errors[0].message).toEqual('a is not a valid age value');
  });

  it('should return multiple errors if more than one field is invalid', function() {
    const name = form.querySelector('input[name="first-name"]') as HTMLInputElement;
    const age = form.querySelector('input[name="age"]') as HTMLInputElement;

    name.value = '!!!';
    age.value = 'a';

    const result = sut.validateForm(form);

    expect(result.isValid).toBeFalsy();
    expect(result.errors[0]).toBeDefined();
    expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
    expect(result.errors[1]).toBeDefined();
    expect(result.errors[1].message).toEqual('a is not a valid age value');
  });
});

describe('the createValidationQueries function', function() {
  let sut: Validator;
  let form: HTMLFormElement;

  beforeEach(() => {
    sut = new Validator();
    form = generateForm();
  });

  it('should map input elements with a data-validation attribute to an array of validation objects', function() {
    const name = form.querySelector('input[name="first-name"]') as HTMLInputElement;
    const age = form.querySelector('input[name="age"]') as HTMLInputElement;

    name.value = 'Bob';
    age.value = '42';

    const validations = sut.createValidationQueries([name, age] as any);

    expect(validations.length).toBe(2);

    expect(validations[0].name).toBe('first-name');
    expect(validations[0].type).toBe('alphabetical');
    expect(validations[0].value).toBe('Bob');

    expect(validations[1].name).toBe('age');
    expect(validations[1].type).toBe('numeric');
    expect(validations[1].value).toBe('42');
  });
});

describe('the validateItem function', function() {
  let sut: Validator;
  beforeEach(function() {
    sut = new Validator();
  });

  const validationRules = new Map([['alphabetical', /^[a-z]+$/i]]);

  it('should return true when the passed item is deemed valid against the supplied validation rules', function() {
    const validation: InputForValidation = {
      type: 'alphabetical',
      value: 'Bob'
    };

    const isValid = sut.validateItem(validation, validationRules);
    expect(isValid).toBeTruthy();
  });

  it('should return false when the passed item is deemed invalid', function() {
    const validation: InputForValidation = {
      type: 'alphabetical',
      value: '42'
    };

    const isValid = sut.validateItem(validation, validationRules);
    expect(isValid).toBeFalsy();
  });

  it('should return false when the specified validation type is not found', function() {
    const validation: any = {
      type: 'foo',
      value: '42'
    };

    const isValid = sut.validateItem(validation, validationRules);
    expect(isValid).toBeFalsy();
  });
});
