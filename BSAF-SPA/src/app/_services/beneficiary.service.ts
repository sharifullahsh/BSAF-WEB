import { CheckboxForView } from './../models/CheckboxForView';
import { familyMemStayedBehindNoValidator, intendToReturnToHostReasonValidator, 
  professionInHostCountryOtherValidator, hoHEducationLevelValidator,
  hoHEducationLevelOtherValidator, numChildrenAttendedSchooleValidator, 
  atLeastOnePSNValidator, atLeastOneReturnReasonValidator, 
  atLeastOneDeterminationValidator, mainConcernValidator,
  individualValidator } from '../shared/validator/customValidation';
import { leavingReasonFirstOtherValidator, leavingReasonSecondOtherValidator,
  leavingReasonThirdOtherValidator, countryOfExilOtherValidator, beforeReturnProvinceValidator } from 'src/app/shared/validator/customValidation';
import {topNeed1OtherValidator, topNeed2OtherValidator, topNeed3OtherValidator} from 'src/app/shared/validator/customValidation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from './alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { InitialLookups } from '../models/InitialLookups';
import { isArray } from 'util';
import { DeterminationForView } from '../models/Determination';
import { PostArrivalNeedForView } from '../models/PostArrivalNeeds';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
 
  initialLooupsData: InitialLookups;
  baseUrl = environment.apiUrl;
  beneficiaryForm: FormGroup;
  individualForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  createBeneficiaryForm(){
    return this.fb.group({
      beneficiaryID: [null],
      cardID: [{value: null, disabled: true}],
      screeningDate: [new Date(), Validators.required],
      provinceBCP: [null, Validators.required],
      borderPoint: [null, Validators.required],
      beneficiaryType: [null, Validators.required],
      returnStatus: [null, Validators.required],
      originProvince: [null, Validators.required],
      originDistrict: [null, Validators.required],
      originVillage: ['', Validators.required],
      returnProvince: [null, Validators.required],
      returnDistrict: [null, Validators.required],
      returnVillage: ['', Validators.required],
      leavingReason1: [null, Validators.required],
      leavingReason1Other: [null],
      leavingReason2: [null],
      leavingReason2Other: [null],
      leavingReason3: [null],
      leavingReason3Other: [null],
      ownHouse: [null, Validators.required],
      whereWillLive: [null, Validators.required],
      rentPayForAccom: [null],
      rentPayCurrency: [null],
      allowForJob: [null, Validators.required],
      countryOfExile: [null, Validators.required],
      countryOfExilOther: [null],
      beforReturnProvince: [null],
      beforReturnDistrictID: [null],
      beforReturnRemarks: [null],
      familyMemStayedBehind: [null, Validators.required],
      familyMemStayedBehindNo: [null],
      lengthOfStayYears: [0, Validators.required],
      lengthOfStayMonths: [0, Validators.required],
      lengthOfStayDays: [0, Validators.required],
      wouldYouReturn: [null, Validators.required],
      haveFamilyBenefited: [null, Validators.required],
      transportationDate: [new Date()],
      transportationInfo: [null],
      transportAccompaniedBy: [null],
      transportAccomByNo: [null],
      topNeed1: [null, Validators.required],
      topNeed1Other: [null],
      topNeed2: [null],
      topNeed2Other: [null],
      topNeed3: [null],
      topNeed3Other: [null],
      intendToDo: [null, Validators.required],
      intendToReturnToHostReason: [null],
      professionInHostCountry: [null, Validators.required],
      professionInHostCountryOther: [null],
      hoHCanReadWrite: [null, Validators.required],
      hoHEducationLevel: [null],
      hoHEducationLevelOther: [null],
      numHHHaveTaskira: [0],
      numHHHavePassport: [0],
      numHHHaveDocOther: [0],
      doHaveSecureLivelihood: [null, Validators.required],
      didChildrenGoToSchoole: [null, Validators.required],
      numChildrenAttendedSchoole: [null],
      photo: [null],
      individuals: this.fb.array([]),
      benefitedFromOrgs: this.fb.array([]),
      postArrivalNeeds: this.fb.array([]),
      psns: this.fb.array([]),
      returnReasons: this.fb.array([]),
      determinations: this.fb.array([]),
      moneySources: this.fb.array([]),
      broughtItems: this.fb.array([]),
      transportations: this.fb.array([]),
      livelihoodEmpNeeds: this.fb.array([]),
      needTools: this.fb.array([]),
      mainConcerns: this.fb.array([]),
      hostCountrySchools: this.fb.array([]),
      // postalCode: [null, Validators.compose([
      //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      // ],
    }, {validators: [individualValidator, leavingReasonFirstOtherValidator,
       leavingReasonSecondOtherValidator, leavingReasonThirdOtherValidator,
       countryOfExilOtherValidator, beforeReturnProvinceValidator,
       familyMemStayedBehindNoValidator, topNeed1OtherValidator,
       topNeed2OtherValidator, topNeed3OtherValidator,
       intendToReturnToHostReasonValidator, professionInHostCountryOtherValidator,
       hoHEducationLevelValidator, hoHEducationLevelOtherValidator,
       numChildrenAttendedSchooleValidator, atLeastOnePSNValidator,
       atLeastOneReturnReasonValidator, atLeastOneDeterminationValidator,
       mainConcernValidator]});
  }
  //beneficiaryForm: FormGroup = 
createIndividualForm(){
  return this.fb.group({
    individualID: [null],
    name: [null, Validators.required],
    drName: [null],
    fName: [null, Validators.required],
    drFName: [null],
    genderCode: [null, Validators.required],
    gender: [null],
    maritalStatusCode: [null, Validators.required],
    maritalStatus: [null],
    age: [null, Validators.required],
    idTypeCode: [null],
    idType: [null],
    idNo: [null],
    relationshipCode: [null, Validators.required],
    relationship: [null],
    contactNumber: [null],
  });
}
  newBenefitedFromOrg(): FormGroup{
    return this.fb.group({
      id: [null],
      beneficiaryID: [null],
      date: [null, Validators.required],
      provinceCode: [null, Validators.required],
      districtID: [null, Validators.required],
      village: [null],
      orgCode: [null, Validators.required],
      assistanceProvided: [null, Validators.required]
    });
  }
  showNeedTools(): boolean{
    const livelihoodEmpNeeds = this.beneficiaryForm.get('livelihoodEmpNeeds').value  as CheckboxForView[];
    const provideToolsSelected =  livelihoodEmpNeeds.filter(l => l.lookupCode === 'POT' && l.isSelected === true).length;
    if (provideToolsSelected){
      return true;
    }else{
      return false;
    }
    //return numbSelected === 0 ? { atLeastOneReturnReasonRequired: true } : null;
  }

  getSearchedBeneficiary(searchCritria: any): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiary/listPartial', searchCritria, httpOptions);
  }
  getBeneficiary(id: number){
    return this.http.get(this.baseUrl + 'beneficiary/' + id);
  }
  getBeneficiaryForView(id: number){
    return this.http.get(this.baseUrl + 'beneficiary/viewBeneficiary/' + id);
  }
  deleteBeneficiary(id: number){
    return this.http.delete(this.baseUrl + 'beneficiary/' + id);
  }
  addBeneficiary(): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiary/', this.getBeneficiaryFormValue(), httpOptions);
  }
  updateBeneficiary() {
    return this.http.put(this.baseUrl + 'beneficiary/' +
    this.beneficiaryForm.value.beneficiaryID, this.getBeneficiaryFormValue(), httpOptions);
  }
  getBeneficiaryFormValue(){
    const formValue = (this.beneficiaryForm.getRawValue());
    if (formValue.psns && Array.isArray(formValue.psns)) {
    formValue.psns = (formValue.psns as CheckboxForView[]).filter(p => p.isSelected === true)
    .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
    }
    if (formValue.returnReasons && Array.isArray(formValue.returnReasons)) {
      formValue.returnReasons = (formValue.returnReasons as CheckboxForView[]).filter(p => p.isSelected === true)
      .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
      }
    if (formValue.determinations && Array.isArray(formValue.determinations)) {
          formValue.determinations = (formValue.determinations as DeterminationForView[]).filter(p => !!p.answerCode)
          .map(p => ({ lookupCode: p.lookupCode, answerCode: p.answerCode, other: p.other}));
          }
    if (formValue.moneySources && Array.isArray(formValue.moneySources)) {
          formValue.moneySources = (formValue.moneySources as CheckboxForView[]).filter(p => p.isSelected === true)
          .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
          }
    if (formValue.broughtItems && Array.isArray(formValue.broughtItems)) {
          formValue.broughtItems = (formValue.broughtItems as CheckboxForView[]).filter(p => p.isSelected === true)
          .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
         }
    if (formValue.postArrivalNeeds && Array.isArray(formValue.postArrivalNeeds)) {
          formValue.postArrivalNeeds = (formValue.postArrivalNeeds as PostArrivalNeedForView[]).filter(p => p.isProvided === true)
          .map(p => ({id: p.id, lookupCode: p.lookupCode, isProvided: p.isProvided, providedDate: p.providedDate, comment: p.comment}));
          }
    if (formValue.transportations && Array.isArray(formValue.transportations)) {
          formValue.transportations = (formValue.transportations as CheckboxForView[]).filter(p => p.isSelected === true)
          .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
           }
    if (formValue.livelihoodEmpNeeds && Array.isArray(formValue.livelihoodEmpNeeds)) {
          formValue.livelihoodEmpNeeds = (formValue.livelihoodEmpNeeds as CheckboxForView[]).filter(p => p.isSelected === true)
          .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
          }
    if (formValue.needTools && Array.isArray(formValue.needTools)) {
          formValue.needTools = (formValue.needTools as CheckboxForView[]).filter(p => p.isSelected === true)
          .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
          }
    if (formValue.mainConcerns && Array.isArray(formValue.mainConcerns)) {
         formValue.mainConcerns = (formValue.mainConcerns as CheckboxForView[]).filter(p => p.isSelected === true)
         .map(p => ({ lookupCode: p.lookupCode, other: p.other}));
          }
    return formValue;
  }
}

