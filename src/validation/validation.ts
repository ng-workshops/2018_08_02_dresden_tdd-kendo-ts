export type VALIDATION_RULES = 'alphabetical' | 'numeric';

export interface Input {
  name: string;
  dataset: {
    validation: VALIDATION_RULES;
  };
  value: any;
}

export interface InputForValidation {
  name?: string;
  type: VALIDATION_RULES;
  value: any;
}

export class Validator {
  validationRules = new Map([['alphabetical', /^[a-z]+$/i], ['numeric', /^[0-9]+$/]]);

  validateItem(validation: InputForValidation, validationRules: Map<string, RegExp>): boolean {
    if (!validationRules.has(validation.type)) {
      return false;
    }

    return validationRules.get(validation.type).test(validation.value);
  }

  createValidationQueries(inputs: NodeListOf<HTMLInputElement>): InputForValidation[] {
    return Array.from(inputs).map((input: HTMLInputElement) => ({
      name: input.name,
      type: input.dataset.validation as VALIDATION_RULES,
      value: input.value
    }));
  }

  validateForm(form: HTMLFormElement) {
    const result = {
      get isValid() {
        return this.errors.length === 0;
      },

      errors: []
    };

    for (let validation of this.createValidationQueries(form.querySelectorAll('input'))) {
      let isValid = this.validateItem(validation, this.validationRules);

      if (!isValid) {
        result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
      }
    }

    return result;
  }
}
