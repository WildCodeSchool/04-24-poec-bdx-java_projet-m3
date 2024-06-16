import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateOrderValidator(
  dateBegin: string,
  dateEnd: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // date are formated as 'yyyy-mm-dd'
    const value1 = control.get(dateBegin)?.value;
    const value2 = control.get(dateEnd)?.value;
    // check if date end is before date begin
    const dateBeginObj = new Date(value1);
    const dateEndObj = new Date(value2);

    if (value1 && value2 && dateEndObj < dateBeginObj) {
      return {
        datesNotValid: 'La date de fin ne peut pas etre avant la date de début',
      };
    } else {
      return null;
    }
  };
}
