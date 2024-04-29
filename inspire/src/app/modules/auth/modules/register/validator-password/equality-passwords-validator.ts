import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkEqualityValidator(
  password: string,
  checkPassword: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get(password)?.value;
    const value2 = control.get(checkPassword)?.value;

    if (!(value1 && value2 && value1 === value2)) {
      return { notEqual: { actual: value1, expected: value2 } };
    } else {
      return null;
    }
  };
}
