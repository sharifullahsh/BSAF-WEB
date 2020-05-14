import { PostArrivalNeedForView } from './../../models/PostArrivalNeeds';
import { DeterminationForView, DeterminationLookup } from './../../models/Determination';
import { CheckboxForView } from '../../models/CheckboxForView';
import { AlertifyService } from './../../_services/alertify.service';
import { Lookup, HostCountryProvince, HostCountryDistrict } from './../../models/Lookup';
import { Individual } from './../individuals/individuals.component';
import { Beneficiary } from './../../models/Beneficiary';
import { BeneficiaryService } from './../../_services/beneficiary.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LookupService } from '../../_services/lookup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
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
  psnList: CheckboxForView[] = [];
  returnReasonList: CheckboxForView[] = [];
  initialLooupsData: InitialLookups;
  photoPath: any;
  hostCountryProvinces: HostCountryProvince[];
  hostCountryDistricts: HostCountryDistrict[];
  determinationsList: DeterminationForView[] = [];
  moneySources: CheckboxForView[] = [];
  broughtItems: CheckboxForView[] = [];
  transportations: CheckboxForView[] = [];
  livelihoodEmpNeeds: CheckboxForView[] = [];
  needTools: CheckboxForView[] = [];
  postArrivalNeedsList: PostArrivalNeedForView[] = [];
  mainConcerns: CheckboxForView[] = [];
  hostCountrySchools: CheckboxForView[] = [];
  benefitedIndistrictList1: Lookup[] = [];
  benefitedIndistrictList2: Lookup[] = [];
  benefitedFromOrgsInDistrict = {
    0: this.benefitedIndistrictList1,
    1: this.benefitedIndistrictList2,
  };
  individualEditRowIndex = 0;
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
    // psns: ,
    //  returnReasons: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    reasonCode: [null],
    //    other: [null],
    //   })
    //  ]),
    //  determinations: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    determinationCode: [null],
    //    answerCode: [null],
    //    other: [null],
    //   })
    //  ]),
    //  moneySources: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    moneySourceCode: [null],
    //    moneySourceOther: [null],
    //   })
    //  ]),
    //  broughtItems: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    itemCode: [null],
    //    itemOther: [null],
    //   })
    //  ]),
    //  postArrivalNeeds: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    needCode: [null],
    //    provided: [null],
    //    ProvidedDate: [null],
    //    Comment: [null],
    //   })
    //  ]),
    //  benefitedFromOrgs: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    date: [null],
    //   provinceCode: [null],
    //   districtID: [null],
    //   village: [null],
    //   orgCode: [null],
    //   assistanceProvided: [null]
    //   })
    //  ]),
    //  transportations: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    typedCode: [null],
    //    other: [null],
    //   })
    //  ]),
    //  livelihoodEmpNeeds: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    needCode: [null]
    //   })
    //  ]),
    //  needTools: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    toolCode: [null],
    //    other: [null]
    //   })
    //  ]),
    //  mainConcerns: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    concernCode: [null],
    //    other: [null]
    //   })
    //  ]),
    //  hostCountrySchools: this.fb.array([
    //   this.fb.group({
    //    id: [null],
    //    beneficiaryID: [null],
    //    schoolTypeCode: [null]
    //   })
    //  ]),
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

  newIndividual(): FormGroup{
    return this.fb.group({
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
  }
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
        console.log('data is >>>>>>> ' + JSON.stringify(this.initialLooupsData));
        this.postArrivalNeedsList = this.createPostArrivalNeedsList(this.initialLooupsData.postArrivalNeeds);
        this.setPostArrivalNeedsForm();
        this.psnList = this.createCheckboxListForView(this.initialLooupsData.psns);
        this.setPSNForm();
        this.returnReasonList = this.createCheckboxListForView(this.initialLooupsData.returnReasons);
        this.setReturnReasonForm();
        this.determinationsList = this.createDeterminationListForView(this.initialLooupsData.determinations);
        this.setDeterminationForm();
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
      if (id){
        this.beneficiaryService.getBeneficiary(id).subscribe((response: Beneficiary) => {
          console.log('beneficiary is >>>>>>>>>>>>>> ' + JSON.stringify(response));
          this.beneficiary = response;
          this.individuals = response.individuals;
          for (const iterator of this.beneficiary.benefitedFromOrgs) {
            this.addBenefitedFromOrg();
          }
          this.beneficiaryForm.patchValue({
            beneficiaryID: response.beneficiaryID,
            cardID: response.cardID,
            screeningDate: response.screeningDate,
            provinceBCP: response.provinceBCP,
            borderPoint: response.borderPoint,
            beneficiaryType: response.beneficiaryType,
            returnStatus: response.returnStatus,
            originProvince: response.originProvince,
            originDistrict: response.originDistrict,
            originVillage: response.originVillage,
            returnProvince: response.returnProvince,
            returnDistrict: response.returnDistrict,
            returnVillage: response.returnVillage,
            leavingReason1: response.leavingReason1,
            leavingReason1Other: response.leavingReason1Other,
            leavingReason2: response.leavingReason2,
            leavingReason2Other: response.leavingReason2Other,
            leavingReason3: response.leavingReason3,
            leavingReason3Other: response.leavingReason3Other,
            ownHouse: response.ownHouse,
            whereWillLive: response.whereWillLive,
            rentPayForAccom: response.rentPayForAccom,
            rentPayCurrency: response.rentPayCurrency,
            allowForJob: response.allowForJob,
            countryOfExile: response.countryOfExile,
            countryOfExilOther: response.countryOfExilOther,
            beforReturnProvince: response.beforReturnProvince,
            beforReturnDistrictID: response.beforReturnDistrictID,
            beforReturnRemarks: response.beforReturnRemarks,
            familyMemStayedBehind: response.familyMemStayedBehind,
            familyMemStayedBehindNo: response.familyMemStayedBehindNo,
            lengthOfStayYears: response.lengthOfStayYears,
            lengthOfStayMonths: response.lengthOfStayMonths,
            lengthOfStayDays: response.lengthOfStayDays,
            wouldYouReturn: response.wouldYouReturn,
            haveFamilyBenefited: response.haveFamilyBenefited,
            transportationDate: response.transportationDate,
            transportationInfo: response.transportationInfo,
            transportAccompaniedBy: response.transportAccompaniedBy,
            transportAccomByNo: response.transportAccomByNo,
            topNeed1: response.topNeed1,
            topNeed1Other: response.topNeed1Other,
            topNeed2: response.topNeed2,
            topNeed2Other: response.topNeed2Other,
            topNeed3: response.topNeed3,
            topNeed3Other: response.topNeed3Other,
            intendToDo: response.intendToDo,
            intendToReturnToHostReason: response.intendToReturnToHostReason,
            professionInHostCountry: response.professionInHostCountry,
            professionInHostCountryOther: response.professionInHostCountryOther,
            hoHCanReadWrite: response.hoHCanReadWrite,
            hoHEducationLevel: response.hoHEducationLevel,
            hoHEducationLevelOther: response.hoHEducationLevelOther,
            numHHHaveTaskira: response.numHHHaveTaskira,
            numHHHavePassport: response.numHHHavePassport,
            numHHHaveDocOther: response.numHHHaveDocOther,
            doHaveSecureLivelihood: response.doHaveSecureLivelihood,
            didChildrenGoToSchoole: response.didChildrenGoToSchoole,
            numChildrenAttendedSchoole: response.numChildrenAttendedSchoole,
            isSubmitted: response.isSubmitted,
            isCardIssued: response.isCardIssued,
            photo: response.photo
          }, {onlySelf: true});

          for (const member of this.beneficiary.individuals) {
            const indForm: FormGroup =  this.newIndividual();
            console.log('name is >>>>>>>>> '+ member.name);
            indForm.patchValue({
              name: member.name,
              fName: member.fName,
              gender: member.gender,
              genderCode: member.genderCode,
              maritalStatus: member.maritalStatus,
              maritalStatusCode: member.maritalStatusCode,
              age: member.age,
              idType: member.idType,
              idTypeCode: member.idTypeCode,
              idNo: member.idNo,
              relationship: member.relationship,
              relationshipCode: member.relationshipCode,
              contactNumber: member.contactNumber,
              drName: member.drName,
              drFName: member.drFName,
            });
            (this.beneficiaryForm.get('individuals') as FormArray).push(indForm);
            // this.individualForm.get('name').pa
          }
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
          this.loadHostCountryProvinces(response.countryOfExile);
          this.loadHostCountryDistrict(response.beforReturnProvince);

          this.moneySources = this.createCheckboxListForView(this.initialLooupsData.moneySources);
          for (const source of this.beneficiary.moneySources) {
            for (const i in this.moneySources) {
              if (source.lookupCode === this.moneySources[i].lookupCode){
                this.moneySources[i].isSelected = true;
                this.moneySources[i].other = source.other;
              }
            }
          }
          this.broughtItems = this.createCheckboxListForView(this.initialLooupsData.broughtItems);
          for (const item of this.beneficiary.broughtItems) {
            for (const i in this.broughtItems) {
              if (item.lookupCode === this.broughtItems[i].lookupCode){
                this.broughtItems[i].isSelected = true;
                this.broughtItems[i].other = item.other;
              }
            }
          }

          this.transportations = this.createCheckboxListForView(this.initialLooupsData.transportations);
          for (const trans of this.beneficiary.transportations) {
            for (const i in this.transportations) {
              if (trans.lookupCode === this.transportations[i].lookupCode){
                this.transportations[i].isSelected = true;
                this.transportations[i].other = trans.other;
              }
            }
          }
          this.livelihoodEmpNeeds = this.createCheckboxListForView(this.initialLooupsData.obtainLivelihoodHelps);
          for (const need of this.beneficiary.livelihoodEmpNeeds) {
            for (const i in this.livelihoodEmpNeeds) {
              if (need.lookupCode === this.livelihoodEmpNeeds[i].lookupCode){
                this.livelihoodEmpNeeds[i].isSelected = true;
                this.livelihoodEmpNeeds[i].other = need.other;
              }
            }
          }
          this.needTools = this.createCheckboxListForView(this.initialLooupsData.tools);
          for (const tool of this.beneficiary.needTools) {
            for (const i in this.needTools) {
              if (tool.lookupCode === this.needTools[i].lookupCode){
                this.needTools[i].isSelected = true;
                this.needTools[i].other = tool.other;
              }
            }
          }
          this.mainConcerns = this.createCheckboxListForView(this.initialLooupsData.mainConcerns);
          for (const concern of this.beneficiary.mainConcerns) {
            for (const i in this.mainConcerns) {
              if (concern.lookupCode === this.mainConcerns[i].lookupCode){
                this.mainConcerns[i].isSelected = true;
                this.mainConcerns[i].other = concern.other;
              }
            }
          }
          console.log('schoools are >>>>>>>' + JSON.stringify(this.hostCountrySchools));

          this.hostCountrySchools = this.createCheckboxListForView(this.initialLooupsData.hostCountrySchools);
          for (const schoool of this.beneficiary.hostCountrySchools) {
            for (const i in this.hostCountrySchools) {
              if (schoool.lookupCode === this.hostCountrySchools[i].lookupCode){
                this.hostCountrySchools[i].isSelected = true;
              }
            }
          }
          if (this.beneficiary.haveFamilyBenefited && this.beneficiary.benefitedFromOrgs){
            console.log('benefica y benefited >>>>>>>>');
            if (this.beneficiary.benefitedFromOrgs[0] && this.beneficiary.benefitedFromOrgs[0].provinceCode){
                 this.getDistrictBenefitedIn(this.beneficiary.benefitedFromOrgs[0].provinceCode, 0);
            }
            if (this.beneficiary.benefitedFromOrgs[1] && this.beneficiary.benefitedFromOrgs[1].provinceCode){
               this.getDistrictBenefitedIn(this.beneficiary.benefitedFromOrgs[1].provinceCode, 1);
          }
          }
          console.log('org infor are >>>>>>>>>>> ' + JSON.stringify(this.beneficiaryForm.get('benefitedFromOrgs').value));
          // this.photoPath = "data:image/png;base64,"+ response.photo;

          this.beneficiary.psNs.forEach(beneficiaryPSN => {
            this.psns.controls.forEach(allPSN => {
              if (beneficiaryPSN.lookupCode === allPSN.get('lookupCode').value){
                allPSN.patchValue({
                  isSelected: true,
                  lookupCode: beneficiaryPSN.lookupCode,
                  other: beneficiaryPSN.other
                } );
              }
            });
           });
          this.beneficiary.returnReasons.forEach(beneficiryReason => {
            this.returnReasons.controls.forEach(allreason => {
              if (beneficiryReason.lookupCode === allreason.get('lookupCode').value){
                allreason.patchValue({
                  isSelected: true,
                  lookupCode: beneficiryReason.lookupCode,
                  other: beneficiryReason.other
                } );
              }
            });
           });
          this.beneficiary.postArrivalNeeds.forEach(beneficiaryNeed => {
          this.postArrivalNeeds.controls.forEach(allNeed => {
            if (beneficiaryNeed.lookupCode === allNeed.get('lookupCode').value){
              allNeed.patchValue({
                id: beneficiaryNeed.id,
                isProvided: beneficiaryNeed.isProvided,
                lookupCode: beneficiaryNeed.lookupCode,
                lookupName: beneficiaryNeed.lookupCode,
                providedDate: beneficiaryNeed.providedDate,
                comment: beneficiaryNeed.comment
              } );
            }
          });
         });
          this.beneficiary.determinations.forEach(beneficiaryDeter => {
          this.determinations.controls.forEach(allDeter => {
            if (beneficiaryDeter.lookupCode === allDeter.get('lookupCode').value){
              allDeter.patchValue({
                answerCode: beneficiaryDeter.answerCode,
                other: beneficiaryDeter.other
              } );
            }
          });
         });
          // console.log('photo is >>>>>>>>>>>' + response.photo);
          if (response.photo){
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
  setDeterminationForm() {
    const determinationsArray = this.beneficiaryForm.get('determinations') as FormArray;
    this.determinationsList.forEach((determination) => {
      determinationsArray.push(this.setDeterminationsFormArray(determination));
    });
  }
  setDeterminationsFormArray(determination: DeterminationForView){
    return this.fb.group({
      lookupName: [determination.lookupName],
      lookupCode: [determination.lookupCode],
      other: [determination.other],
      answerCode: [determination.answerCode]
    });
  }
  createDeterminationListForView(lookupList: Lookup[]): DeterminationForView[] {
    const createdList: DeterminationForView[] = [];
    for (const lookup of lookupList){
    let option: DeterminationForView;
    option = {
      lookupCode: lookup.lookupCode,
      lookupName: lookup.lookupName,
      other: null,
      answerCode: null
    };
    if (option.lookupName !== 'Other'){
     createdList.unshift(option);
   }else{
    createdList.push(option);
   }
  }
    return createdList;
  }

  setPostArrivalNeedsForm() {
    const needsArray = this.beneficiaryForm.get('postArrivalNeeds') as FormArray;
    this.postArrivalNeedsList.forEach((need) => {
      needsArray.push(this.setPostArrivalNeedsFormArray(need));
    });
  }
  setPSNForm() {
    const psnsArray = this.beneficiaryForm.get('psns') as FormArray;
    this.psnList.forEach((psn) => {
    psnsArray.push(this.setCheckboxOptionFormArray(psn));
    });
  }
  setReturnReasonForm() {
    const returnReasonArray = this.beneficiaryForm.get('returnReasons') as FormArray;
    this.returnReasonList.forEach((reason) => {
      returnReasonArray.push(this.setCheckboxOptionFormArray(reason));
    });
  }
  private setCheckboxOptionFormArray(option: CheckboxForView){
    return this.fb.group({
      isSelected: [option.isSelected],
      lookupName: [option.lookupName],
      lookupCode: [option.lookupCode],
      other: [option.other] ,
    });
  }
  private setPostArrivalNeedsFormArray(need: PostArrivalNeedForView){
    return this.fb.group({
      id: [need.id],
      lookupName: [need.lookupName],
      lookupCode: [need.lookupCode],
      isProvided: [need.isProvided],
      providedDate: [need.providedDate],
      comment: [need.comment],
    });
  }
  newBenefitedFromOrg(): FormGroup{
    return this.fb.group({
      id: [null],
      beneficiaryID: [null],
      date: [''],
      provinceCode: [null],
      districtID: [null],
      village: [null],
      orgCode: [null],
      assistanceProvided: [null]
    });
  }
  addBenefitedFromOrg(){
    this.benefitedFromOrgs.push(this.newBenefitedFromOrg());
  }
  get psns(): FormArray {
    return this.beneficiaryForm.get('psns') as FormArray;
  }
  get returnReasons(): FormArray {
    return this.beneficiaryForm.get('returnReasons') as FormArray;
  }
  get determinations(): FormArray {
    return this.beneficiaryForm.get('determinations') as FormArray;
  }
  get benefitedFromOrgs() {
    return this.beneficiaryForm.get('benefitedFromOrgs') as FormArray;
  }
  get postArrivalNeeds(): FormArray {
    return this.beneficiaryForm.get('postArrivalNeeds') as FormArray;
  }
  get individualsArray(): FormArray {
    return (this.beneficiaryForm.get('individuals') as FormArray);
  }
  getDistrictBenefitedIn(provinceCode: string, index: number){
    if (provinceCode){
      this.lookupService.getDistrictLookups(provinceCode).subscribe((response: Lookup[]) => {
        if (index === 0){
          this.benefitedFromOrgsInDistrict[0] = response;
        }
        else if (index === 1){
          this.benefitedFromOrgsInDistrict[1] = response;
        }

      }, (error) => {
        this.alertifyService.error('Can load district for benefited in orgs');
        return [];
      });
    }else{
      return [];
    }
  }
  // createDeterminationsForView(lookupList: Lookup[]): DeterminationForView[] {
  //   const createdList: DeterminationForView[] = [];
  //   for (const item of lookupList){
  //   let option: DeterminationForView;
  //   option = {
  //     lookupCode: item.lookupCode,
  //     lookupName: item.lookupName,
  //     other: null,
  //     answerCode: null
  //   };
  //   if (option.lookupName !== 'Other'){
  //    createdList.unshift(option);
  //  }else{
  //   createdList.push(option);
  //  }
  // }
  //   return createdList;
  // }
 createCheckboxListForView(lookupList: Lookup[]){
  const createdList: CheckboxForView[] = [];
  for (const item of lookupList){
    let option: CheckboxForView;
    option = {
      isSelected: false,
      lookupCode: item.lookupCode,
      lookupName: item.lookupName,
      other: null,
    };
    if (option.lookupName !== 'Other'){
     createdList.unshift(option);
   }else{
    createdList.push(option);
   }
  }
  return createdList;
}

createPostArrivalNeedsList(lookupList: Lookup[]){
  const createdList: PostArrivalNeedForView[] = [];
  for (const item of lookupList){
    let option: PostArrivalNeedForView;
    option = {
      id: 0,
      isProvided: false,
      lookupCode: item.lookupCode,
      lookupName: item.lookupName,
      providedDate: '',
      comment: ''
    };
    createdList.push(option);
  }
  return createdList;
}
  // get individuals() {
  //   return this.beneficiaryForm.get('individuals') as FormArray;
  // }
  originProvinceChanged(event: any){
    if (event.value){
      this.lookupService.getDistrictLookups(event.value).subscribe((response: Lookup[]) => {
        this.originDistricts = response;
      }, (error) => {
        console.log('erro is >>>>>>' + JSON.stringify(error));
        this.alertifyService.error('Unable to load origin districts.');
      });
    }
  }
  hostCountryProvinceChanged(event: any){
    if (event.value){
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
    if (country && (country == 'Iran' || country == 'Pakistan')){
      const ountryCode = country == 'Iran' ? 'IRN' : 'PAK';
      this.lookupService.getHostCountryProvinces(ountryCode).subscribe((response: HostCountryProvince[]) => {
      this.hostCountryProvinces = response;
    }, (error) => {
      console.log('erro is >>>>>>' + JSON.stringify(error));
      this.alertifyService.error('Unable to load country of exile provinces.');
    });
    }else{
      this.hostCountryProvinces = [];
      this.hostCountryDistricts = [];
    }
  }
  loadHostCountryDistrict(provinceID: number) {
    this.hostCountryDistricts = [];
    if (provinceID){
      this.lookupService.getHostCountryDistricts(provinceID).subscribe((response: HostCountryDistrict[]) => {
      this.hostCountryDistricts = response;
    }, (error) => {
      console.log('erro is >>>>>>' + JSON.stringify(error));
      this.alertifyService.error('Unable to load country of exile districts.');
    });
    }
  }
  hostCountryChanged(event: any){
    this.loadHostCountryProvinces(event.value);
  }
  returnProvinceChanged(event: any){
    if (event.value){
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
