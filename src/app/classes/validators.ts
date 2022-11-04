import {AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  public static regexValidator(regexPattern: string, err?: { [key: string]: any }): ValidatorFn {
    const rgx = new RegExp(regexPattern);
    const errFinal: { [key: string]: any } = err === undefined
      ? {"error": `Input does not match '${rgx}'.`}
      : err;

    return (control: AbstractControl): { [key: string]: any } | null => {
      let ret: { [key: string]: any } | null;
      if (!control.value)
        ret = null;
      else {
        const isMatch = rgx.test(control.value);
        ret = isMatch ? null : errFinal;
      }
      return ret;
    }
  }

  public static characterRequiredValidator(
    lowercaseCharRequired: boolean, uppercaseCharRequired: boolean, digitCharRequired: boolean, specialCharRequired: boolean): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      let ret: { [key: string]: any } | null;
      let value = control.value;

      const containsLowercaseTest = (value: string): boolean => {
        for (let i = 0; i < value.length; i++) {
          const c = value[i];
          if (c == c.toLowerCase() && c != c.toUpperCase())
            return true;
        }
        return false;
      };
      const containsUppercaseTest = (value: string): boolean => {
        for (let i = 0; i < value.length; i++) {
          const c = value[i];
          if (c != c.toLowerCase() && c == c.toUpperCase())
            return true;
        }
        return false;
      };

      const containsDigitTest = (value: string): boolean => {
        for (let i = 0; i < value.length; i++) {
          const c = value[i];
          if (c >= '0' && c <= '9')
            return true;
        }
        return false;
      };

      const containsSpecialTest = (value: string): boolean => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const rgx = new RegExp(specialChars);
        for (let i = 0; i < value.length; i++) {
          const c = value[i];
          if (rgx.test(c))
            return true;
        }
        return false;
      };

      if (!value)
        ret = null;
      else {
        const lowercaseFail = lowercaseCharRequired && !containsLowercaseTest(value);
        const uppercaseFail = uppercaseCharRequired && !containsUppercaseTest(value);
        const digitFail = digitCharRequired && !containsDigitTest(value);
        const specialFail = specialCharRequired && !containsSpecialTest(value);
        if (lowercaseFail || uppercaseFail || digitFail || specialFail) {
          ret = {}
          if (lowercaseFail) ret["containsLowercase"] = false;
          if (uppercaseFail) ret["containsUppercase"] = false;
          if (digitFail) ret["containsDigit"] = false;
          if (specialFail) ret["containsSpecial"] = false;
        } else
          ret = null;
      }
      return ret;
    };
  }

  public static passwordMatchValidator(firstFormValuePath: string, secondFormValuePath: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let ret: { [key: string]: any } | null;

      const passwordFirstValue = control.get(firstFormValuePath)?.value;
      const passwordSecondValue = control.get(secondFormValuePath)?.value;

      if (!passwordFirstValue && !passwordSecondValue)
        ret = null;
      else
        ret = passwordFirstValue === passwordSecondValue
          ? null
          : {isMatch: false};
      return ret;
    };
  }
}
