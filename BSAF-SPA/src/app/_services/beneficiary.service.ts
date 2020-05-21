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
    cardID: null,
    screeningDate: null,
    provinceBCP: null,
    borderPoint: null,
    beneficiaryType: [null],
    returnStatus: [null],
    originProvince: [null],
    originDistrict: [null],
    originVillage: [null],
    returnProvince: [null],
    returnDistrict: [null],
    returnVillage: [null],
    leavingReason1: [null],
    leavingReason1Other: [null],
    leavingReason2: [null],
    leavingReason2Other: [null],
    leavingReason3: [null],
    leavingReason3Other: [null],
    ownHouse: [null],
    whereWillLive: [null],
    rentPayForAccom: [null],
    rentPayCurrency: [null],
    allowForJob: [null],
    countryOfExile: [null],
    countryOfExilOther: [null],
    beforReturnProvince: [null],
    beforReturnDistrictID: [null],
    beforReturnRemarks: [null],
    familyMemStayedBehind: [null],
    familyMemStayedBehindNo: [null],
    lengthOfStayYears: [null],
    lengthOfStayMonths: [null],
    lengthOfStayDays: [null],
    wouldYouReturn: [null],
    haveFamilyBenefited: [null],
    transportationDate: [null],
    transportationInfo: [null],
    transportAccompaniedBy: [null],
    transportAccomByNo: [null],
    topNeed1: [null],
    topNeed1Other: [null],
    topNeed2: [null],
    topNeed2Other: [null],
    topNeed3: [null],
    topNeed3Other: [null],
    intendToDo: [null],
    intendToReturnToHostReason: [null],
    professionInHostCountry: [null],
    professionInHostCountryOther: [null],
    hoHCanReadWrite: [null],
    hoHEducationLevel: [null],
    hoHEducationLevelOther: [null],
    numHHHaveTaskira: [null],
    numHHHavePassport: [null],
    numHHHaveDocOther: [null],
    doHaveSecureLivelihood: [null],
    didChildrenGoToSchoole: [null],
    numChildrenAttendedSchoole: [null],
    isActive: [null],
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
  });
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
  getSearchedBeneficiary(searchCritria: any): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiary/listPartial', searchCritria, httpOptions);
  }
  getBeneficiary(id:number){
    return this.http.get(this.baseUrl+'beneficiary/'+id);
  }
}

