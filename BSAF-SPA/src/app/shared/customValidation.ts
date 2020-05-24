import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const chkOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const isSelected = control.get('isSelected');
    const other = control.get('other');
    return lookupName && lookupName.value === 'Other' && isSelected.value === true && !other.value ? { otherRequired: true } : null;
  };
export const determinationOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const answerCode = control.get('answerCode');
    const other = control.get('other');
    return lookupName && lookupName.value === 'Other' && answerCode && answerCode.value
    && !other.value ? { determinationOtherRequired: true } : null;
  };
export const leavingReasonFirstOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const firstReason = control.get('leavingReason1');
    const other = control.get('leavingReason1Other');
    console.log("other is "+ other?.value);
    console.log("rist reason is "+ firstReason?.value);
    console.log(firstReason && firstReason.value && firstReason.value === 'LROther' && !other.value);
    console.log(firstReason && firstReason.value && firstReason.value === 'LROther' && !other.value ? { leavingReasonFirstOtherRequired: true } : null);
    return firstReason && firstReason.value && firstReason.value === 'LROther' && !other.value ? { leavingReasonFirstOtherRequired: true } : null;
  };
  
//   export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }