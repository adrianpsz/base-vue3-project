import { Validation } from "@/utils/validation";

/**
 * Validator
 */
class Validator {
  constructor(validation, name) {
    this.validation = validation;
    this.name = name;
  }

  /**
   * Run validator
   *
   * @param fieldName
   * @param validationName
   * @param values
   *
   * @returns {*}
   */
  runValidation(fieldName, validationName, values) {
    return this.validation[this.name](...values);
  }
}

/**
 * Form
 */
export default class Form {
  constructor(validation) {
    this.fields = {};
    this.validation = validation;
    this.errors = {};
    this.validators = {};

    // validators
    this.registerValidator("requiredCheckbox");
    this.registerValidator("required");
    this.registerValidator("minLength");
    this.registerValidator("maxLength");
    this.registerValidator("minValue");
    this.registerValidator("maxValue");
    this.registerValidator("equalValue");
    this.registerValidator("isEmail");
    this.registerValidator("isNumber");
    this.registerValidator("customValidator");

    this.validatorsNames = Object.keys(this.validators);

    return this;
  }

  /**
   * Form factory
   *
   * @param translate
   *
   * @returns {Form}
   */
  static create(translate) {
    return new Form(new Validation(translate));
  }

  /**
   * Register validator
   *
   * @param name
   */
  registerValidator(name) {
    this.validators[name] = new Validator(this.validation, name);
  }

  /**
   * Add basic field
   *
   * @param name
   * @param value
   * @param validation
   *
   * @returns {Form}
   */
  addField(name, value, validation) {
    this.fields[name] = {
      value: value,
      error: "",
      validation: validation,
    };

    return this;
  }

  /**
   * Add text field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addTextField(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      required: true,
      minLength: 3,
      maxLength: 255,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add text field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addNumberField(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      required: true,
      isNumber: true,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add empty field
   *
   * @param name
   * @param customValidator
   *
   * @returns {Form}
   */
  addEmpty(name, customValidator = Validation.empty) {
    this.addField(name, "", {
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add textarea field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addTextarea(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      required: true,
      minLength: 3,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add email field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addEmailField(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      required: true,
      isEmail: true,
      minLength: 5,
      maxLength: 255,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add password field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addPasswordField(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      required: true,
      minLength: 8,
      maxLength: 255,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Add checkbox field
   *
   * @param name
   * @param value
   * @param customValidator
   *
   * @returns {Form}
   */
  addCheckboxField(name, value, customValidator = Validation.empty) {
    this.addField(name, value, {
      requiredCheckbox: true,
      customValidator: customValidator,
    });

    return this;
  }

  /**
   * Get the form field by name
   *
   * @param fieldName
   *
   * @returns {*}
   */
  getField(fieldName) {
    this.checkField(fieldName);
    return this.fields[fieldName];
  }

  /**
   * Check if the form has the field
   *
   * @param fieldName
   *
   * @returns {boolean}
   */
  checkField(fieldName) {
    if (!Object.prototype.hasOwnProperty.call(this.fields, fieldName))
      throw new Error("The form does not have field: " + fieldName);
  }

  /**
   * Get the form error by name
   *
   * @param fieldName
   *
   * @returns {*}
   */
  getError(fieldName) {
    this.checkField(fieldName);
    return this.fields[fieldName].error;
  }

  /**
   * Get form fields
   *
   * @returns {*|{}}
   */
  getFields() {
    return this.fields;
  }

  /**
   * Get form errors
   *
   * @returns {*|{}}
   */
  getErrors() {
    return this.errors;
  }

  /**
   * If form field has an error
   *
   * @param fieldName
   *
   * @returns {boolean}
   */
  hasError(fieldName) {
    this.checkField(fieldName);
    return this.fields[fieldName].error.length > 0;
  }

  /**
   * Check if the form is valid
   *
   * @returns {boolean}
   */
  isValid() {
    this.errors = {};
    try {
      // check all fields by name
      for (const fieldName in this.fields) {
        this.fields[fieldName].error = "";
        // go through all validations
        for (const validationName in this.fields[fieldName].validation) {
          // error, when no validator
          if (!this.validatorsNames.includes(validationName))
            throw new Error("No validator with name: " + validationName);

          // go through all validators
          for (const validator in this.validators) {
            if (validationName === validator) {
              // check error
              const error = this.validators[validator].runValidation(
                fieldName,
                validationName,
                [
                  this.fields[fieldName].value,
                  this.fields[fieldName].validation[validationName],
                ]
              );
              if (error.length > 0) {
                // register error
                this.errors[fieldName] = error;
                this.fields[fieldName].error = error;
              }
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
      return false;
    }

    return Object.keys(this.errors).length === 0;
  }

  /**
   * Get form data
   */
  getData() {
    let data = {};
    for (const prop in this.fields) {
      data[prop] = this.getField(prop).value;
    }

    return data;
  }

  /**
   * Get data from FormData
   *
   * @param event
   *
   * @returns {FormData}
   */
  getFormData(event) {
    return new FormData(event.target);
  }

  /**
   * Check response errors
   *
   * @param response
   */
  responseErrors(response) {
    if (response && Object.prototype.hasOwnProperty.call(response, "data")) {
      const data = response.data;
      if (Object.prototype.hasOwnProperty.call(data, "errors")) {
        for (let prop in data.errors) {
          const destProp = prop.replaceAll(/\.[0-9]/g, "");
          if (Object.prototype.hasOwnProperty.call(this.fields, destProp)) {
            this.fields[destProp].error = data.errors[prop][0];
          }
        }
      }
    }
  }

  /**
   * Populate from model
   *
   * @param model
   */
  populate(model) {
    for (let prop in this.fields) {
      if (Object.prototype.hasOwnProperty.call(model, prop)) {
        this.fields[prop].value = model[prop];
      }
    }

    return this;
  }
}
