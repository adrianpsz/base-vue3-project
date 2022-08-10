export class Validation {
  constructor(t) {
    this.t = t;
  }

  static empty() {
    return "";
  }

  required(value) {
    if (!value && value !== 0) return this.t("form.validation.required");
    return "";
  }

  requiredCheckbox(value) {
    if (!value) return this.t("form.validation.requiredCheckbox");
    return "";
  }

  minLength(value, signs) {
    if (value.length < signs)
      return this.t("form.validation.minLength", [signs]);
    return "";
  }

  maxLength(value, signs) {
    if (value.length > signs)
      return this.t("form.validation.maxLength", [signs]);
    return "";
  }

  isEmail(value) {
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return this.t("form.validation.emailNotValid");
    return "";
  }

  minValue(value, min) {
    if (value < min) return this.t("form.validation.minValue", [min]);
    return "";
  }

  maxValue(value, max) {
    if (value > max) return this.t("form.validation.maxValue", [max]);
    return "";
  }

  equalValue(value, equal) {
    if (value !== equal) return this.t("form.validation.equalValue", [equal]);
    return "";
  }

  isNumber(value) {
    if (isNaN(value)) return this.t("form.validation.isNumber");
    return "";
  }

  customValidator(value, fn) {
    return fn(value);
  }

  requiredMinMax(value, min, max) {
    let error;
    if ((error = this.required(value))) {
      return error;
    } else if ((error = this.minLength(value, min))) {
      return error;
    } else if ((error = this.maxLength(value, max))) {
      return error;
    }
    return "";
  }

  requiredMinMaxIsEmail(value, min, max) {
    let error;
    if ((error = this.requiredMinMax(value, min, max))) {
      return error;
    } else if ((error = this.isEmail(value))) {
      return error;
    }
    return "";
  }
}
