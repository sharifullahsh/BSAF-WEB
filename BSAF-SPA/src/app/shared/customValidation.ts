import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const chkOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const isSelected = control.get('isSelected');
    const other = control.get('other');
    console.log("other is >>>>>> "+ other.value);
    return lookupName && lookupName.value === 'Other' && isSelected.value === true && !other.value ? { 'otherRequired': true } : null;
  };
export const returnOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const isSelected = control.get('isSelected');
    const other = control.get('other');
    console.log("other is >>>>>> "+ other.value);
    return lookupName && lookupName.value === 'Other' && isSelected.value === true && !other.value ? { 'returnOtherRequired': true } : null;
  };
  