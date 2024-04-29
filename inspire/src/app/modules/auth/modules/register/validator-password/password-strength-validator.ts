import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const passwordRegex = RegExp('(?=.*[A-Z])');
  const valid = passwordRegex.test(control.value);

  const errors = {
    strongPassword: {
      rules: 'must contain at least one uppercase letter',
    },
  };

  return !valid ? errors : null;
}
