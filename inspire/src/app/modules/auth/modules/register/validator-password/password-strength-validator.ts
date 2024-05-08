import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const hasUppercase = /[A-Z]/.test(control.value);
    const isLongEnough = control.value.length >= 8;

    if (!hasUppercase || !isLongEnough) {
      return { strongPassword: true };
    }

    return null;
  };
}
