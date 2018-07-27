define(["require", "exports", "./validation"], function (require, exports, validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function generateForm() {
        var form = "\n  <form class=\"test-form\">\n    <input name=\"first-name\" type=\"text\" data-validation=\"alphabetical\" placeholder=\"firstname\" />\n    <input name=\"age\" type=\"text\" data-validation=\"numeric\" placeholder=\"age\" />\n  </form>";
        var body = document.getElementsByTagName('body')[0];
        var container = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = form;
        body.appendChild(container);
        var formElement = document.querySelector('.test-form');
        return formElement.cloneNode(true);
    }
    describe('Testing the form', function () {
        var sut;
        var form;
        beforeEach(function () {
            sut = new validation_1.Validator();
            form = generateForm();
        });
        it('should validate a form with all of the possible validation types', function () {
            var name = form.querySelector('input[name="first-name"]');
            var age = form.querySelector('input[name="age"]');
            name.value = 'Bob';
            age.value = '42';
            var result = sut.validateForm(form);
            expect(result.isValid).toBeTruthy();
            expect(result.errors.length).toEqual(0);
        });
        it('should return an error when a name is invalid', function () {
            var name = form.querySelector('input[name="first-name"]');
            var age = form.querySelector('input[name="age"]');
            name.value = '!!!';
            age.value = '42';
            var result = sut.validateForm(form);
            expect(result.isValid).toBeFalsy();
            expect(result.errors[0]).toBeDefined();
            expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
        });
        it('should return an error when an age is invalid', function () {
            var name = form.querySelector('input[name="first-name"]');
            var age = form.querySelector('input[name="age"]');
            name.value = 'Greg';
            age.value = 'a';
            var result = sut.validateForm(form);
            expect(result.isValid).toBeFalsy();
            expect(result.errors[0]).toBeDefined();
            expect(result.errors[0].message).toEqual('a is not a valid age value');
        });
        it('should return multiple errors if more than one field is invalid', function () {
            var name = form.querySelector('input[name="first-name"]');
            var age = form.querySelector('input[name="age"]');
            name.value = '!!!';
            age.value = 'a';
            var result = sut.validateForm(form);
            expect(result.isValid).toBeFalsy();
            expect(result.errors[0]).toBeDefined();
            expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
            expect(result.errors[1]).toBeDefined();
            expect(result.errors[1].message).toEqual('a is not a valid age value');
        });
    });
    describe('the createValidationQueries function', function () {
        var sut;
        var form;
        beforeEach(function () {
            sut = new validation_1.Validator();
            form = generateForm();
        });
        it('should map input elements with a data-validation attribute to an array of validation objects', function () {
            var name = form.querySelector('input[name="first-name"]');
            var age = form.querySelector('input[name="age"]');
            name.value = 'Bob';
            age.value = '42';
            var validations = sut.createValidationQueries([name, age]);
            expect(validations.length).toBe(2);
            expect(validations[0].name).toBe('first-name');
            expect(validations[0].type).toBe('alphabetical');
            expect(validations[0].value).toBe('Bob');
            expect(validations[1].name).toBe('age');
            expect(validations[1].type).toBe('numeric');
            expect(validations[1].value).toBe('42');
        });
    });
    describe('the validateItem function', function () {
        var sut;
        beforeEach(function () {
            sut = new validation_1.Validator();
        });
        var validationRules = new Map([['alphabetical', /^[a-z]+$/i]]);
        it('should return true when the passed item is deemed valid against the supplied validation rules', function () {
            var validation = {
                type: 'alphabetical',
                value: 'Bob'
            };
            var isValid = sut.validateItem(validation, validationRules);
            expect(isValid).toBeTruthy();
        });
        it('should return false when the passed item is deemed invalid', function () {
            var validation = {
                type: 'alphabetical',
                value: '42'
            };
            var isValid = sut.validateItem(validation, validationRules);
            expect(isValid).toBeFalsy();
        });
        it('should return false when the specified validation type is not found', function () {
            var validation = {
                type: 'foo',
                value: '42'
            };
            var isValid = sut.validateItem(validation, validationRules);
            expect(isValid).toBeFalsy();
        });
    });
});
//# sourceMappingURL=validation.spec.js.map