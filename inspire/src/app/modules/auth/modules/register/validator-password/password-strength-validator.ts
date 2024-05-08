import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      // Valeur vide, pas d'erreur
      return null;
    }

    const hasUppercase = /[A-Z]/.test(control.value);
    const isLongEnough = control.value.length >= 8;

    if (!hasUppercase || !isLongEnough) {
      // Une des conditions n'est pas remplie, retourner l'erreur
      return { strongPassword: true };
    }

    // Le mot de passe est fort, pas d'erreur
    return null;
  };
}
