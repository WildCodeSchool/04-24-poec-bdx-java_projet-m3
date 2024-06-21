import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailPasswordValidator(
  emailKey: string,
  passwordKey: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.get(emailKey)?.value;
    const password = control.get(passwordKey)?.value;

    // Vérifie si l'email est valide
    const emailControl = control.get(emailKey);
    const isValidEmail = emailControl && !emailControl.errors?.['email'];

    // Vérifie si le mot de passe est valide (exemple : longueur minimale de 8 caractères)
    const isValidPassword = password && password.length >= 8;

    const errors: ValidationErrors = {};

    if (!isValidEmail) {
      errors['invalidEmail'] = true;
    }

    if (!isValidPassword) {
      errors['invalidPassword'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
