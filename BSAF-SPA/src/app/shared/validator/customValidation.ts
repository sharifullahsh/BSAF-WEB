import { CheckboxForView } from '../../models/CheckboxForView';
import { ValidatorFn, FormGroup, ValidationErrors, FormArray } from '@angular/forms';
import { DeterminationForView } from '../../models/Determination';
import { Individual } from '../../models/Individual';

export const chkOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const isSelected = control.get('isSelected');
    const other = control.get('other');
    return lookupName && lookupName.value === 'Other' && isSelected.value === true &&
     !other.value ? { otherRequired: true } : null;
  };
export const determinationOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const lookupName = control.get('lookupName');
    const answerCode = control.get('answerCode');
    const other = control.get('other');
    return lookupName && lookupName.value === 'Other' && answerCode && answerCode.value
    && !other.value ? { determinationOtherRequired: true } : null;
  };
export const postArrivalNeedPDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const isProvided = control.get('isProvided');
    const providedDate = control.get('providedDate');
    return isProvided && isProvided.value === true &&
    !providedDate.value ? { postArrivalNeedPDateRequired: true } : null;
  };
export const leavingReasonFirstOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const firstReason = control.get('leavingReason1');
    const other = control.get('leavingReason1Other');
    return firstReason.value && firstReason.value === 'LROther' &&
     !other.value ? { leavingReasonFirstOtherRequired: true } : null;
  };
export const leavingReasonSecondOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const secondReason = control.get('leavingReason2');
    const other = control.get('leavingReason2Other');
    return secondReason.value && secondReason.value === 'LROther' &&
     !other.value ? { leavingReasonSecondOtherRequired: true } : null;
  };
export const leavingReasonThirdOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const thirdReason = control.get('leavingReason3');
    const other = control.get('leavingReason3Other');
    return thirdReason.value && thirdReason.value === 'LROther' &&
     !other.value ? { leavingReasonThirdOtherRequired: true } : null;
  };
export const countryOfExilOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const countryOfExile = control.get('countryOfExile');
    const countryOfExilOther = control.get('countryOfExilOther');
    return countryOfExile.value && countryOfExile.value === 'COther' &&
     !countryOfExilOther.value ? { countryOfExilOtherRequired: true } : null;
  };
export const beforeReturnProvinceValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const countryOfExile = control.get('countryOfExile');
    const beforReturnProvince = control.get('beforReturnProvince');
    return countryOfExile.value && (countryOfExile.value === 'Iran' || countryOfExile.value === 'Pakistan') &&
     !beforReturnProvince.value ? { beforeReturnProvinceRequired: true } : null;
  };

export const familyMemStayedBehindNoValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const familyMemStayedBehind = control.get('familyMemStayedBehind');
    const familyMemStayedBehindNo = control.get('familyMemStayedBehindNo');
    return familyMemStayedBehind.value && familyMemStayedBehind.value === true &&
     !familyMemStayedBehindNo.value ? { familyMemStayedBehindNoRequired: true } : null;
  };

export const topNeed1OtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const topNeed1 = control.get('topNeed1');
    const topNeed1Other = control.get('topNeed1Other');
    return topNeed1.value && topNeed1.value === 'TNOther' &&
     !topNeed1Other.value ? { topNeed1OtherRequired: true } : null;
  };
export const topNeed2OtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const topNeed2 = control.get('topNeed2');
    const topNeed2Other = control.get('topNeed2Other');
    return topNeed2.value && topNeed2.value === 'TNOther' &&
     !topNeed2Other.value ? { topNeed2OtherRequired: true } : null;
  };
export const topNeed3OtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const topNeed3 = control.get('topNeed3');
    const topNeed3Other = control.get('topNeed3Other');
    return topNeed3.value && topNeed3.value === 'TNOther' &&
     !topNeed3Other.value ? { topNeed3OtherRequired: true } : null;
  };

export const intendToReturnToHostReasonValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const intendToDo = control.get('intendToDo');
    const intendToReturnToHostReason = control.get('intendToReturnToHostReason');
    return intendToDo.value && intendToDo.value === 'RTH' &&
     !intendToReturnToHostReason.value ? { intendToReturnToHostReasonRequired: true } : null;
  };
export const professionInHostCountryOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const professionInHostCountry = control.get('professionInHostCountry');
    const professionInHostCountryOther = control.get('professionInHostCountryOther');
    return professionInHostCountry.value && professionInHostCountry.value === 'ProfOther' &&
     !professionInHostCountryOther.value ? { professionInHostCountryOtherRequired: true } : null;
  };
export const hoHEducationLevelValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const hoHCanReadWrite = control.get('hoHCanReadWrite');
    const hoHEducationLevel = control.get('hoHEducationLevel');
    return hoHCanReadWrite.value && hoHCanReadWrite.value === true &&
     !hoHEducationLevel.value ? { hoHEducationLevelRequired: true } : null;
  };

export const hoHEducationLevelOtherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const hoHEducationLevel = control.get('hoHEducationLevel');
    const hoHEducationLevelOther = control.get('hoHEducationLevelOther');
    return hoHEducationLevel.value && hoHEducationLevel.value === 'EDUOther' &&
     !hoHEducationLevelOther.value ? { hoHEducationLevelOtherRequired: true } : null;
  };
export const numChildrenAttendedSchooleValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const didChildrenGoToSchoole = control.get('didChildrenGoToSchoole');
    const numChildrenAttendedSchoole = control.get('numChildrenAttendedSchoole');
    return didChildrenGoToSchoole.value && didChildrenGoToSchoole.value === true &&
     !numChildrenAttendedSchoole.value ? { numChildrenAttendedSchooleRequired: true } : null;
  };
export const atLeastOnePSNValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const psns = control.get('psns').value as CheckboxForView[];
    const numbSelected =  psns.filter(psn => psn.isSelected === true).length;
    return numbSelected === 0 ? { atLeastOnePSNRequired: true } : null;
  };
export const atLeastOneReturnReasonValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const returnReasons = control.get('returnReasons').value as CheckboxForView[];
    const numbSelected =  returnReasons.filter(r => r.isSelected === true).length;
    return numbSelected === 0 ? { atLeastOneReturnReasonRequired: true } : null;
  };
export const atLeastOneDeterminationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const determinations = control.get('determinations').value as DeterminationForView[];
    const numbSelected =  determinations.filter(d => !!d.answerCode).length;
    return numbSelected === 0 ? { atLeastOneDeterminationRequired: true } : null;
  };
export const mainConcernValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const mainConcerns = control.get('mainConcerns').value as CheckboxForView[];
    const numbSelected =  mainConcerns.filter(r => r.isSelected === true).length;
    return numbSelected === 0 ? { mainConcernRequired: true } : null;
  };
export const individualValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const individuals = (control.get('individuals').value as Individual[]);
    const houseHolds =  individuals.find(r => r.relationshipCode === 'HH' || r.relationshipCode === "HSelf");
    return !houseHolds ? { individualRequired: true } : null;
  };
// export const rentAmountRequiredValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//     const whereWillLive = control.get('whereWillLive');
//     const rentPayForAccom = control.get('rentPayForAccom');
//     const rentPayCurrency = control.get('rentPayCurrency');
//     return whereWillLive.value && whereWillLive.value === 'RH' &&
//      (!rentPayForAccom.value || !rentPayCurrency.value) ? { rentAmountRequired: true } : null;
//   };
//   export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }