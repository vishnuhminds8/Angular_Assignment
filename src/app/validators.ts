import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidator {
  static specialCharValidator(control: FormControl):{[s: string]: boolean}{
    console.log(control.value);
      if (!control.value.match(/^[A-Za-z]*$|^[A-Za-z][A-Za-z ]*[A-Za-z]$/)) {
        return {
          invaliddata: true
        };
      } else {
       return null;
      }
    }

    static emailValidator(control: FormControl) {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
          return {
            'invalidEmailAddress': true
          };
      }
    }

    static seatsValidator(totalseats: any) {
      return (c: AbstractControl): { [key: string]: boolean } | null => { 
          if (c.value > totalseats) {
              return { 'numseats': true };
          }
          return null;
      };
    }
}