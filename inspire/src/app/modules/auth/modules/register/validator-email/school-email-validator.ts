import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailSchoolValidator(extention: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = (control.value as string).endsWith(extention);

    if (!isValid) {
      return {
        extension: { value: control.value, expected: extention },
      };
    } else {
      return null;
    }
  };
}
