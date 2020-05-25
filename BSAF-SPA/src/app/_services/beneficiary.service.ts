import { familyMemStayedBehindNoValidator, intendToReturnToHostReasonValidator, professionInHostCountryOtherValidator, hoHEducationLevelValidator, hoHEducationLevelOtherValidator, numChildrenAttendedSchooleValidator, atLeastOnePSNValidator, atLeastOneReturnReasonValidator, atLeastOneDeterminationValidator } from './../shared/customValidation';
import { leavingReasonFirstOtherValidator, leavingReasonSecondOtherValidator,
  leavingReasonThirdOtherValidator, countryOfExilOtherValidator, beforeReturnProvinceValidator } from 'src/app/shared/customValidation';
import {topNeed1OtherValidator, topNeed2OtherValidator, topNeed3OtherValidator} from 'src/app/shared/customValidation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from './alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { InitialLookups } from '../models/InitialLookups';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  initialLooupsData: InitialLookups;
  baseUrl = environment.apiUrl;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  beneficiaryForm: FormGroup = this.fb.group({
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
    lengthOfStayYears: [null, Validators.required],
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
    isSubmitted: [null],
    isCardIssued: [null],
    photo: [null],
    insertedBy: [null],
    insertedDate: [null],
    lastUpdatedBy: [null],
    lastUpdatedDate: [null],
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
  }, {validators: [leavingReasonFirstOtherValidator, leavingReasonSecondOtherValidator,
     leavingReasonThirdOtherValidator, countryOfExilOtherValidator,
     beforeReturnProvinceValidator, familyMemStayedBehindNoValidator,
     topNeed1OtherValidator, topNeed2OtherValidator, topNeed3OtherValidator,
     intendToReturnToHostReasonValidator, professionInHostCountryOtherValidator,
     hoHEducationLevelValidator, hoHEducationLevelOtherValidator,
     numChildrenAttendedSchooleValidator, atLeastOnePSNValidator,
     atLeastOneReturnReasonValidator,atLeastOneDeterminationValidator]});
  individualForm = this.fb.group({
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
  resetBeneficiaryForm(){
    this.beneficiaryForm.reset();
  }
  resetIndividualForm(){
    this.individualForm.reset();
  }
  getSearchedBeneficiary(searchCritria: any): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiary/listPartial', searchCritria, httpOptions);
  }
  getBeneficiary(id:number){
    return this.http.get(this.baseUrl+'beneficiary/'+id);
  }
}

