import { CheckboxForView } from '../../models/CheckboxForView';
import { PSN } from './../../models/PSN';
import { AlertifyService } from './../../_services/alertify.service';
import { Lookup, HostCountryProvince, HostCountryDistrict } from './../../models/Lookup';
import { Individual } from './../individuals/individuals.component';
import { Beneficiary } from './../../models/Beneficiary';
import { BeneficiaryService } from './../../_services/beneficiary.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LookupService } from '../../_services/lookup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { InitialLookups } from 'src/app/models/InitialLookups';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'src/app/models/image';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.css']
})
export class BeneficiaryFormComponent implements OnInit {
  postArrivalNeedTbleColumns: string[] = ['NeedAssistance', 'IsProvided', 'ProvidedDate', 'Comments'];
  selectedTab = new FormControl(0);
  beneficiary: Beneficiary;
  individuals: Individual[];
  originDistricts: Lookup[];
  returnDistricts: Lookup[];
  psn: CheckboxForView[] = [];
  returnReason: CheckboxForView[] = [];
  initialLooupsData: InitialLookups;
  photoPath: any;
  hostCountryProvinces: HostCountryProvince[];
  hostCountryDistricts: HostCountryDistrict[];
  beneficiaryForm = this.fb.group({
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
    // psns: ,
     returnReasons: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       reasonCode: [null],
       other: [null],
      })
     ]),
     determinations: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       determinationCode: [null],
       answerCode: [null],
       other: [null],
      })
     ]),
     moneySources: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       moneySourceCode: [null],
       moneySourceOther: [null],
      })
     ]),
     broughtItems: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       itemCode: [null],
       itemOther: [null],
      })
     ]),
     postArrivalNeeds: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       needCode: [null],
       provided: [null],
       ProvidedDate: [null],
       Comment: [null],
      })
     ]),
     benefitedFromOrgs: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       date: [null],
      provinceCode: [null],
      districtID: [null],
      village: [null],
      orgCode: [null],
      assistanceProvided: [null]
      })
     ]),
     transportations: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       typedCode: [null],
       other: [null],
      })
     ]),
     livelihoodEmpNeeds: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       needCode: [null]
      })
     ]),
     needTools: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       toolCode: [null],
       other: [null]
      })
     ]),
     mainConcerns: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       concernCode: [null],
       other: [null]
      })
     ]),
     hostCountrySchools: this.fb.array([
      this.fb.group({
       id: [null],
       beneficiaryID: [null],
       schoolTypeCode: [null]
      })
     ]),
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
  });
  individualForm = this.fb.group({
    individualID: [null],
    beneficiaryID: [null],
    name: [null],
    drName: [null],
    fName: [null],
    drFName: [null],
    genderCode: [null],
    gender: [null],
    maritalStatusCode: [null],
    maritalStatus: [null],
    age: [null],
    idTypeCode: [null],
    idType: [null],
    idNo: [null],
    relationshipCode: [null],
    relationship: [null],
    contactNumber: [null],
  });
  // psn = this.fb.array([
  //   this.fb.group({
  //    id: [null],
  //    beneficiaryID: [null],
  //    isSelected:[false],
  //    lookupName:[''],
  //    lookupCode: [null],
  //    psnOther: [null],
  //   })
  //  ]);


  constructor(private fb: FormBuilder, private lookupService: LookupService,
              private route: ActivatedRoute, private beneficiaryService: BeneficiaryService,
              private alertifyService: AlertifyService,
              private _sanitizer: DomSanitizer) {}

  // get psn() {
  //   return this.beneficiaryForm.get('psns') as FormArray;
  // }
  ngOnInit(): void {
      this.route.data.subscribe((data: {initialLookups: InitialLookups}) => {
        this.initialLooupsData = data.initialLookups;
        console.log("data is >>>>>>> "+ JSON.stringify(this.initialLooupsData));
      });
    // this.heroes$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return this.service.getHeroes();
    //   })
    // );
    // this.lookupService.getInitialLookups().subscribe((data: InitialLookups) =>
    //   {
    //   this.initialLooupsData = data;
    //   console.log("data is >>>>>>> "+ JSON.stringify(this.initialLooupsData));
    // });
 
      const id = +this.route.snapshot.paramMap.get('id');
      // console.log('id is >>>>>>>>>>>>>>><<<<<<<<<<<<<<< ' + id);
      if(id){
        this.beneficiaryService.getBeneficiary(id).subscribe((response: Beneficiary) => {
          // console.log('beneficiary is >>>>>>>>>>>>>> ' + JSON.stringify(response));
          this.beneficiary = response;
          this.individuals = response.individuals;
          this.beneficiaryForm.patchValue({
            ...response
          },{onlySelf:true});
          const originProvince = this.beneficiaryForm.get('originProvince').value;
          if (originProvince){
            this.lookupService.getDistrictLookups(originProvince).subscribe((response: Lookup[]) => {
              this.originDistricts = response;
            }, (error) => {
              console.log('erro is >>>>>>' + JSON.stringify(error));
              this.alertifyService.error('Unable to load origin districts.');
            });
          }
          const returnProvince = this.beneficiaryForm.get('returnProvince').value;
          if (originProvince){
            this.lookupService.getDistrictLookups(returnProvince).subscribe((response: Lookup[]) => {
              this.returnDistricts = response;
            }, (error) => {
              console.log('erro is >>>>>>' + JSON.stringify(error));
              this.alertifyService.error('Unable to load origin districts.');
            });
          }
          this.psn = this.createCheckboxList(this.initialLooupsData.psns);
          for (const bPsn of this.beneficiary.psNs) {
            for (const i in this.psn) {
              if(bPsn.psnCode === this.psn[i].lookupCode){
                this.psn[i].isSelected =true;
                this.psn[i].Other = bPsn.psnOther;
              }
            }
          }
          // console.log("return reason are >>>>>>>"+JSON.stringify(this.initialLooupsData.returnReasons));
          this.returnReason = this.createCheckboxList(this.initialLooupsData.returnReasons);
          for (const reason of this.beneficiary.returnReasons) {
            for (const i in this.returnReason) {
              if(reason.reasonCode === this.returnReason[i].lookupCode){
                this.returnReason[i].isSelected = true;
                this.returnReason[i].Other = reason.Other;
              }
            }
          }
          this.loadHostCountryProvinces(response.countryOfExile);
          // this.photoPath = "data:image/png;base64,"+ response.photo;
          console.log("photo is >>>>>>>>>>>"+response.photo);
          if(response.photo){
            this.photoPath = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response.photo}`);
          }else{
            this.photoPath = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
    
          }
    
          // console.log('form value are >>>>>>>>>>> ' + JSON.stringify(this.beneficiaryForm.value));
        }, (error) => {
          console.log('can not lood beneficar ');
        });
      }
  
  }
 createCheckboxList(lookupList:Lookup[]){
  let createdList:CheckboxForView[] = [];
  for (const item of lookupList){
    let option: CheckboxForView;
    option = {
      isSelected: false,
      lookupCode: item.lookupCode,
      lookupName: item.lookupName,
      Other: null,
    };
    if (option.lookupName !== 'Other'){
     createdList.unshift(option);
   }else{
    createdList.push(option);
   }
  }
  return createdList;
}
  // get individuals() {
  //   return this.beneficiaryForm.get('individuals') as FormArray;
  // }
  originProvinceChanged(event: any){
    if(event.value){
      this.lookupService.getDistrictLookups(event.value).subscribe((response: Lookup[]) => {
        this.originDistricts = response;
      }, (error) => {
        console.log('erro is >>>>>>' + JSON.stringify(error));
        this.alertifyService.error('Unable to load origin districts.');
      });
    }
  }
  hostCountryProvinceChanged(event: any){
    if(event.value){
      this.lookupService.getHostCountryDistricts(event.value).subscribe((response: HostCountryDistrict[]) => {
        this.hostCountryDistricts = response;
      }, (error) => {
        console.log('erro is >>>>>>' + JSON.stringify(error));
        this.alertifyService.error('Unable to load origin districts.');
      });
    }
  }
  loadHostCountryProvinces(country: string){
    this.hostCountryDistricts = [];
    if(country && (country =="Iran" || country == "Pakistan")){
      const ountryCode = country == "Iran" ? "IRN":"PAK";
      this.lookupService.getHostCountryProvinces(ountryCode).subscribe((response: HostCountryProvince[]) => {
      this.hostCountryProvinces = response;
    }, (error) => {
      console.log('erro is >>>>>>' + JSON.stringify(error));
      this.alertifyService.error('Unable to load origin districts.');
    });
    }else{
      this.hostCountryProvinces = [];
      this.hostCountryDistricts = [];
    }
  }
  hostCountryChanged(event: any){
    this.loadHostCountryProvinces(event.value);
  }
  returnProvinceChanged(event: any){
    if(event.value){
      this.lookupService.getDistrictLookups(event.value).subscribe((response: Lookup[]) => {
        this.returnDistricts = response;
      }, (error) => {
        console.log('erro is >>>>>>' + JSON.stringify(error));
        this.alertifyService.error('Unable to load origin districts.');
      });
    }
  }
  nextTab(){

  }
  onSubmit() {
    alert('Thanks!');
  }
  ngAfterViewInit(): void {
    console.log('inside the view ater init >>>>>>>>>>>>>');
    const province = this.beneficiaryForm.get('originProvince').value;
    console.log('province is >>>>>>>>>>>>>' + province);

  }
}
