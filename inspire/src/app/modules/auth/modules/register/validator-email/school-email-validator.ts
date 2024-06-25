import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.development';

export function emailSchoolValidator(extention: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = (control.value as string).endsWith(extention);

    if (!isValid) {
      return {
        extension: {
          value: control.value,
          expected: environment.EXTENSION_EMAIL,
        },
      };
    } else {
      return null;
    }
  };
}
