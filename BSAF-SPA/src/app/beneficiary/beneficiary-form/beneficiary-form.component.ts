import { BenefitedFromOrg } from './../../models/BenefitedFromOrg';
import { Individual } from './../../models/Individual';
import { PostArrivalNeedForView } from './../../models/PostArrivalNeeds';
import { DeterminationForView, DeterminationLookup } from './../../models/Determination';
import { CheckboxForView } from '../../models/CheckboxForView';
import { AlertifyService } from './../../_services/alertify.service';
import { Lookup, HostCountryProvince, HostCountryDistrict } from './../../models/Lookup';
import { Beneficiary } from './../../models/Beneficiary';
import { BeneficiaryService } from './../../_services/beneficiary.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LookupService } from '../../_services/lookup.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { InitialLookups } from 'src/app/models/InitialLookups';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'src/app/models/image';
import { IndividualFormDialogComponent } from '../dialog/individual-form/individual-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { chkOtherValidator, determinationOtherValidator, postArrivalNeedPDateValidator } from 'src/app/shared/validator/customValidation';
import { CreateBenefFormListsService } from 'src/app/_services/create-benef-form-lists.service';
import { DeleteDialogComponent } from 'src/app/shared/dialog/delete/delete-dialog.component';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.css'],
  providers: []
})
export class BeneficiaryFormComponent implements OnInit {
  postArrivalNeedTbleColumns: string[] = ['NeedAssistance', 'IsProvided', 'ProvidedDate', 'Comments'];
  individualsTbleColumns: string[] = ['name', 'fName', 'gender', 'maritalStatus', 'age', 'idType', 'idNo', 'relationship', 'contactNumber', 'drFName', 'drName', 'action'];
  @ViewChild(MatTable) individualTable: MatTable<any>;
  selectedTab = new FormControl(0);
  beneficiary: Beneficiary;
  originDistricts: Lookup[];
  returnDistricts: Lookup[];
  psnList: CheckboxForView[] = [];
  returnReasonList: CheckboxForView[] = [];
  initialLooupsData: InitialLookups;
  photoPath: any;
  hostCountryProvinces: HostCountryProvince[];
  hostCountryDistricts: HostCountryDistrict[];
  determinationsList: DeterminationForView[] = [];
  moneySourcesList: CheckboxForView[] = [];
  broughtItemsList: CheckboxForView[] = [];
  transportationsList: CheckboxForView[] = [];
  livelihoodEmpNeedsList: CheckboxForView[] = [];
  needToolsList: CheckboxForView[] = [];
  postArrivalNeedsList: PostArrivalNeedForView[] = [];
  mainConcernsList: CheckboxForView[] = [];
  hostCountrySchoolsList: CheckboxForView[] = [];
  benefitedIndistrictList1: Lookup[] = [];
  benefitedIndistrictList2: Lookup[] = [];
  benefitedFromOrgsInDistrict = {
    0: this.benefitedIndistrictList1,
    1: this.benefitedIndistrictList2,
  };
  orgList1: Lookup[] = [];
  orgList2: Lookup[] = [];
  organizationList = {
    0: this.orgList1,
    1: this.orgList2,
  };
  leavingReasonFirstList: Lookup[] = [];
  leavingReasonSecondList: Lookup[] = [];
  leavingReasonThirdList: Lookup[] = [];

  topNeed1List: Lookup[] = [];
  topNeed2List: Lookup[] = [];
  topNeed3List: Lookup[] = [];

  benefSubmitted = false;
  indSubmitted = false;

constructor(private fb: FormBuilder, private lookupService: LookupService,
            private route: ActivatedRoute, public beneficiaryService: BeneficiaryService,
            private alertifyService: AlertifyService,
            private _sanitizer: DomSanitizer,
            public dialog: MatDialog,
            public createListService: CreateBenefFormListsService,
            public router: Router) {}
beneficiaryForm: FormGroup = this.beneficiaryService.beneficiaryForm;

ngOnInit(): void {
  this.beneficiaryService.resetBeneficiaryForm();
  this.beneficiaryService.resetIndividualForm();
  this.benefitedFromOrgs.clear();
  this.individualsArray.clear();
  this.route.data.subscribe((data: {initialLookups: InitialLookups}) => {
      this.initialLooupsData = data.initialLookups;
      // for using in anywhere
      this.beneficiaryService.initialLooupsData = this.initialLooupsData;
      this.leavingReasonFirstList = this.initialLooupsData.leavingReasons;
      this.topNeed1List = this.initialLooupsData.topNeeds;
      this.organizationList[0] = this.initialLooupsData.organizations;
      console.log('data is >>>>>>> ' + JSON.stringify(this.initialLooupsData));
      this.postArrivalNeedsList = this.createListService.createPostArrivalNeedsList(this.initialLooupsData.postArrivalNeeds);
      this.setPostArrivalNeedsForm();
      this.psnList = this.createListService.createCheckboxListForView(this.initialLooupsData.psns);
      this.setPSNForm();
      this.returnReasonList = this.createListService.createCheckboxListForView(this.initialLooupsData.returnReasons);
      this.setReturnReasonForm();
      this.determinationsList = this.createListService.createDeterminationListForView(this.initialLooupsData.determinations);
      this.setDeterminationForm();
      this.moneySourcesList = this.createListService.createCheckboxListForView(this.initialLooupsData.moneySources);
      this.setMoneySourceForm();
      this.broughtItemsList = this.createListService.createCheckboxListForView(this.initialLooupsData.broughtItems);
      this.setBroughtItemsForm();
      this.transportationsList = this.createListService.createCheckboxListForView(this.initialLooupsData.transportations);
      this.setTransportationForm();
      this.livelihoodEmpNeedsList = this.createListService.createCheckboxListForView(this.initialLooupsData.obtainLivelihoodHelps);
      this.setLivelihoodEmpNeedsForm();
      this.needToolsList = this.createListService.createCheckboxListForView(this.initialLooupsData.tools);
      this.setNeedToolsForm();
      this.mainConcernsList = this.createListService.createCheckboxListForView(this.initialLooupsData.mainConcerns);
      this.setMainConcernsForm();
      this.hostCountrySchoolsList = this.createListService.createCheckboxListForView(this.initialLooupsData.hostCountrySchools);
      this.setHostCountrySchoolsForm();
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
          // this.individuals = response.individuals;
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
            photo: response.photo,
            benefitedFromOrgs: response.benefitedFromOrgs
          });
          this.leavingReasonSecondList = this.initialLooupsData.leavingReasons.filter(l =>
            l.lookupCode !== this.benef.leavingReason1.value);
          this.leavingReasonThirdList = this.leavingReasonSecondList.filter(l =>
              l.lookupCode !== this.benef.leavingReason2.value);
          let topNeed2Filter = '';
          if (this.benef.topNeed1 && this.benef.topNeed1?.value){
            topNeed2Filter = this.benef.topNeed1?.value !== 'TNOther' ? this.benef.topNeed1?.value : '';
            this.topNeed2List = this.initialLooupsData.topNeeds.filter(l => l.lookupCode !== topNeed2Filter);
          }
          if (this.benef.topNeed2 && this.benef.topNeed2?.value){
            const topNeed3Filter = this.benef.topNeed2?.value !== 'TNOther' ? this.benef.topNeed2?.value : '';
            this.topNeed3List = this.initialLooupsData.topNeeds.filter(l =>
              l.lookupCode !== topNeed2Filter && l.lookupCode !== topNeed3Filter);
          }
          for (const individual of this.beneficiary.individuals) {
            const indForm: FormGroup =  this.beneficiaryService.newIndividualForm();
            indForm.patchValue({
             ...individual
            });
            (this.beneficiaryForm.get('individuals') as FormArray).push(indForm);
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

          if (this.beneficiary.haveFamilyBenefited && this.beneficiary.benefitedFromOrgs){
            if (this.beneficiary.benefitedFromOrgs[0] && this.beneficiary.benefitedFromOrgs[0].provinceCode){
                 this.getDistrictBenefitedIn(this.beneficiary.benefitedFromOrgs[0].provinceCode, 0);
            }
            if (this.beneficiary.benefitedFromOrgs[1] && this.beneficiary.benefitedFromOrgs[1].provinceCode){
               this.getDistrictBenefitedIn(this.beneficiary.benefitedFromOrgs[1].provinceCode, 1);
          }
          }
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
          this.beneficiary.moneySources.forEach(beneficiarySource => {
          this.moneySources.controls.forEach(allSource => {
            if (beneficiarySource.lookupCode === allSource.get('lookupCode').value){
              allSource.patchValue({
                isSelected: true,
                lookupCode: beneficiarySource.lookupCode,
                other: beneficiarySource.other
              } );
            }
          });
         });
          this.beneficiary.broughtItems.forEach(beneficiaryItem => {
          this.broughtItems.controls.forEach(allItem => {
            if (beneficiaryItem.lookupCode === allItem.get('lookupCode').value){
              allItem.patchValue({
                isSelected: true,
                lookupCode: beneficiaryItem.lookupCode,
                other: beneficiaryItem.other
              } );
            }
          });
         });
          this.beneficiary.transportations.forEach(beneficiaryTrans => {
          this.transportations.controls.forEach(allTrans => {
            if (beneficiaryTrans.lookupCode === allTrans.get('lookupCode').value){
              allTrans.patchValue({
                isSelected: true,
                lookupCode: beneficiaryTrans.lookupCode,
                other: beneficiaryTrans.other
              } );
            }
          });
         });
          this.filterBenefitedFromOgr2List();
          this.beneficiary.livelihoodEmpNeeds.forEach(beneficiaryNeed => {
          this.livelihoodEmpNeeds.controls.forEach(allNeed => {
            if (beneficiaryNeed.lookupCode === allNeed.get('lookupCode').value){
              allNeed.patchValue({
                isSelected: true,
                lookupCode: beneficiaryNeed.lookupCode
              } );
            }
          });
         });
          this.beneficiary.needTools.forEach(beneficiaryTool => {
          this.needTools.controls.forEach(allTool => {
            if (beneficiaryTool.lookupCode === allTool.get('lookupCode').value){
              allTool.patchValue({
                isSelected: true,
                lookupCode: beneficiaryTool.lookupCode,
                other: beneficiaryTool.other
              } );
            }
          });
         });
          this.beneficiary.mainConcerns.forEach(beneficiaryConcern => {
          this.mainConcerns.controls.forEach(allConcern => {
            if (beneficiaryConcern.lookupCode === allConcern.get('lookupCode').value){
              allConcern.patchValue({
                isSelected: true,
                lookupCode: beneficiaryConcern.lookupCode,
                other: beneficiaryConcern.other
              } );
            }
          });
         });
          this.beneficiary.hostCountrySchools.forEach(beneficiarySchool => {
          this.hostCountrySchools.controls.forEach(allSchool => {
            if (beneficiarySchool.lookupCode === allSchool.get('lookupCode').value){
              allSchool.patchValue({
                isSelected: true,
                lookupCode: beneficiarySchool.lookupCode,
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
setHostCountrySchoolsForm() {
    const hostCountrySchoolsArray = this.beneficiaryForm.get('hostCountrySchools') as FormArray;
    hostCountrySchoolsArray.clear();
    this.hostCountrySchoolsList.forEach((school) => {
      hostCountrySchoolsArray.push(this.setCheckboxOptionFormArray(school));
    });
  }
setMainConcernsForm() {
    const mainConcernsArray = this.beneficiaryForm.get('mainConcerns') as FormArray;
    mainConcernsArray.clear();
    this.mainConcernsList.forEach((concern) => {
      mainConcernsArray.push(this.setCheckboxOptionFormArray(concern));
    });
  }
setNeedToolsForm() {
    const needToolsArray = this.beneficiaryForm.get('needTools') as FormArray;
    needToolsArray.clear();
    this.needToolsList.forEach((tool) => {
      needToolsArray.push(this.setCheckboxOptionFormArray(tool));
    });
  }
setLivelihoodEmpNeedsForm() {
    const livelihoodEmpNeedsArray = this.beneficiaryForm.get('livelihoodEmpNeeds') as FormArray;
    livelihoodEmpNeedsArray.clear();
    this.livelihoodEmpNeedsList.forEach((need) => {
      livelihoodEmpNeedsArray.push(this.setCheckboxOptionFormArray(need));
    });
  }
setTransportationForm() {
    const transportationArray = this.beneficiaryForm.get('transportations') as FormArray;
    transportationArray.clear();
    this.transportationsList.forEach((item) => {
      transportationArray.push(this.setCheckboxOptionFormArray(item));
    });
  }
setBroughtItemsForm() {
    const broughtItemseArray = this.beneficiaryForm.get('broughtItems') as FormArray;
    broughtItemseArray.clear();
    this.broughtItemsList.forEach((item) => {
      broughtItemseArray.push(this.setCheckboxOptionFormArray(item));
    });
  }
setMoneySourceForm() {
    const moneySourceArray = this.beneficiaryForm.get('moneySources') as FormArray;
    moneySourceArray.clear();
    this.moneySourcesList.forEach((reason) => {
      moneySourceArray.push(this.setCheckboxOptionFormArray(reason));
    });
  }
setDeterminationForm() {
    const determinationsArray = this.beneficiaryForm.get('determinations') as FormArray;
    determinationsArray.clear();
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
    }, {validators : determinationOtherValidator});
  }

setPostArrivalNeedsForm() {
    const needsArray = this.beneficiaryForm.get('postArrivalNeeds') as FormArray;
    needsArray.clear();
    this.postArrivalNeedsList.forEach((need) => {
      needsArray.push(this.setPostArrivalNeedsFormArray(need));
    });
  }
setPSNForm() {
    const psnsArray = this.beneficiaryForm.get('psns') as FormArray;
    psnsArray.clear();
    this.psnList.forEach((psn) => {
    psnsArray.push(this.setCheckboxOptionFormArray(psn));
    });
  }
setReturnReasonForm() {
    const returnReasonArray = this.beneficiaryForm.get('returnReasons') as FormArray;
    returnReasonArray.clear();
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
    }, {validators : chkOtherValidator});
  }

  private setPostArrivalNeedsFormArray(need: PostArrivalNeedForView){
    return this.fb.group({
      id: [need.id],
      lookupName: [need.lookupName],
      lookupCode: [need.lookupCode],
      isProvided: [need.isProvided],
      providedDate: [need.providedDate],
      comment: [need.comment],
    }, { validators : postArrivalNeedPDateValidator});
  }

addBenefitedFromOrg(){
    this.benefitedFromOrgs.push(this.beneficiaryService.newBenefitedFromOrg());
    this.filterBenefitedFromOgr2List();
  }
filterBenefitedFromOgr2List(){
    const orgs = (this.benef.benefitedFromOrgs as FormArray).value as BenefitedFromOrg[];
    if (orgs.length && orgs[0] && orgs[0].orgCode){
      this.organizationList[1] = this.initialLooupsData.organizations.filter(o => o.lookupCode !== orgs[0].orgCode);
    }
}
get benef() { return this.beneficiaryForm.controls; }

get psns(): FormArray {
    return this.beneficiaryForm.get('psns') as FormArray;
  }
get returnReasons(): FormArray {
    return this.beneficiaryForm.get('returnReasons') as FormArray;
  }
get determinations(): FormArray {
    return this.beneficiaryForm.get('determinations') as FormArray;
  }
get moneySources(): FormArray {
    return this.beneficiaryForm.get('moneySources') as FormArray;
  }
get broughtItems(): FormArray {
    return this.beneficiaryForm.get('broughtItems') as FormArray;
  }
get transportations(): FormArray {
    return this.beneficiaryForm.get('transportations') as FormArray;
  }
get livelihoodEmpNeeds(): FormArray {
    return this.beneficiaryForm.get('livelihoodEmpNeeds') as FormArray;
  }
get benefitedFromOrgs() {
    return this.beneficiaryForm.get('benefitedFromOrgs') as FormArray;
  }
get postArrivalNeeds(): FormArray {
    return this.beneficiaryForm.get('postArrivalNeeds') as FormArray;
  }
get needTools(): FormArray {
    return this.beneficiaryForm.get('needTools') as FormArray;
  }
get mainConcerns(): FormArray {
    return this.beneficiaryForm.get('mainConcerns') as FormArray;
  }
get hostCountrySchools(): FormArray {
    return this.beneficiaryForm.get('hostCountrySchools') as FormArray;
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

originProvinceChanged(event: any){
    if (event.value){
      this.lookupService.getDistrictLookups(event.value).subscribe((response: Lookup[]) => {
        this.originDistricts = response;
        this.benef.originDistrict.setValue(null);
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
    if (country && (country === 'Iran' || country === 'Pakistan')){
      this.benef.countryOfExilOther.setValue(null);
      const ountryCode = country === 'Iran' ? 'IRN' : 'PAK';
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
  this.benef.beforReturnProvince.setValue(null);
  this.benef.beforReturnDistrictID.setValue(null);
    this.loadHostCountryProvinces(event.value);
  }
returnProvinceChanged(event: any){
    if (event.value){
      this.lookupService.getDistrictLookups(event.value).subscribe((response: Lookup[]) => {
        this.returnDistricts = response;
        this.benef.returnDistrict.setValue(null);
      }, (error) => {
        console.log('erro is >>>>>>' + JSON.stringify(error));
        this.alertifyService.error('Unable to load origin districts.');
      });
    }
  }
whereWillYouLiveChanged(envet: any){
if(envet.value === 'RH'){
  this.benef.rentPayForAccom.setValue(null);
  this.benef.rentPayCurrency.setValue(null);
  this.setMoneySourceForm();
}
  }

  helpObtainlivelihoodOpt(event: any){
    if (event.source && !event.checked && event.source.value === 'POT'){
       this.livelihoodEmpNeeds.clear();
    }
  }

editIndividual(i: number){
 this.beneficiaryService.individualForm.patchValue({
   ...this.individualsArray.controls[i].value
 });
 const dialogRef = this.dialog.open(IndividualFormDialogComponent, {
  width: '60%',
  data: {}
});

 dialogRef.afterClosed().subscribe(result => {
  if (result === 1){
    const indFormValue =  this.beneficiaryService.individualForm.value;
    const selectedIndividual = this.individualsArray.controls[i] as FormControl;
    this.individualsArray.controls[i].patchValue({...indFormValue});
    if (indFormValue.genderCode){
    const gender = this.initialLooupsData.gender.find(l => l.lookupCode === indFormValue.genderCode).lookupName;
    selectedIndividual.patchValue({gender});
  }
    if (indFormValue.maritalStatusCode){
  const maritalStatus = this.initialLooupsData.maritalStatus.find(l => l.lookupCode === indFormValue.maritalStatusCode).lookupName;
  selectedIndividual.patchValue({maritalStatus});
  }
    if (indFormValue.idTypeCode){
  const idType = this.initialLooupsData.idTypes.find(l => l.lookupCode === indFormValue.idTypeCode).lookupName;
  selectedIndividual.patchValue({idType});
}
    if (indFormValue.relationshipCode){
  const relationship = this.initialLooupsData.relationships.find(l => l.lookupCode === indFormValue.relationshipCode).lookupName;
  selectedIndividual.patchValue({relationship});
}
    this.beneficiaryService.resetIndividualForm();
    this.individualTable.renderRows();
  }
});
}
deleteIndividual(i: number){
  // window.alert(i);
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '300px',
    // data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result){
      this.individualsArray.removeAt(i);
      this.individualTable.renderRows();
    }
  });
}

benefitedFromOrgsChange(event: any){
  if (event.value){
  this.benefitedFromOrgs.push(this.beneficiaryService.newBenefitedFromOrg());
}else{
  this.benefitedFromOrgs.clear();
}
}

leavingReasonFirstChanged(event: any){
  if (event.value){
    this.leavingReasonSecondList = this.leavingReasonFirstList.filter(l => l.lookupCode !== event.value);
    this.leavingReasonThirdList = [];
    this.benef.leavingReason2.setValue(null);
    this.benef.leavingReason3.setValue(null);

    this.benef.leavingReason1Other.setValue(null);
    this.benef.leavingReason2Other.setValue(null);
    this.benef.leavingReason3Other.setValue(null);
  }
}
leavingReasonSecondChanged(event: any){
  if(event.value){
    this.leavingReasonThirdList = this.leavingReasonSecondList.filter(l => l.lookupCode !== event.value);
    this.benef.leavingReason3.setValue(null);

    this.benef.leavingReason2Other.setValue(null);
    this.benef.leavingReason3Other.setValue(null);
  }
}
topNeedFirstChanged(event: any){
  if (event.value){
    const topNeedSecondFilter = event.value !== 'TNOther' ? event.value : '';
    this.topNeed2List = this.topNeed1List.filter(l => l.lookupCode !== topNeedSecondFilter);
    this.topNeed3List = [];
    
    this.benef.topNeed2.setValue(null);
    this.benef.topNeed3.setValue(null);

    this.benef.topNeed1Other.setValue(null);
    this.benef.topNeed2Other.setValue(null);
    this.benef.topNeed3Other.setValue(null);

  }
}
topNeedSecondChanged(event: any){
  if (event.value){
    const topNeedThirdFilter = event.value !== 'TNOther' ? event.value : '';
    this.topNeed3List = this.topNeed2List.filter(l => l.lookupCode !== topNeedThirdFilter);
    this.benef.topNeed3.setValue(null);

    this.benef.topNeed2Other.setValue(null);
    this.benef.topNeed3Other.setValue(null);

  }
}
intendToDoChanged(event: any){
  if (event.value && event.value !== 'RTH'){
    this.benef.intendToReturnToHostReason.setValue(null);
  }
}
professionChanged(event: any){
  if (event.value && event.value !== 'ProfOther'){
    this.benef.professionInHostCountryOther.setValue(null);
  }
}
nextTab(){

}
addIndividual(){
  if (this.individualsArray.length === 0 ){
    if (this.benef.beneficiaryType.value === 'Family'){
      this.beneficiaryService.individualForm.patchValue({relationshipCode: 'HH'});
    }else if (this.benef.beneficiaryType.value === 'Individual'){
      this.beneficiaryService.individualForm.patchValue({relationshipCode: 'HSelf'});
    }
    console.log(this.beneficiaryService.individualForm.value);
  }
  const dialogRef = this.dialog.open(IndividualFormDialogComponent, {
    width: '60%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1){
      const indFormValue =  this.beneficiaryService.individualForm.value;
      const newIndividualForm = this.beneficiaryService.newIndividualForm();
      newIndividualForm.patchValue({
        ...indFormValue
      });
      const newIndividual: Individual = {
      ...indFormValue
    };
      if (indFormValue.genderCode){
    const gender = this.initialLooupsData.gender.find(l => l.lookupCode === indFormValue.genderCode).lookupName;
    newIndividualForm.patchValue({
      gender
    });
    }
      if (indFormValue.maritalStatusCode){
    const maritalStatus = this.initialLooupsData.maritalStatus.find(l => l.lookupCode === indFormValue.maritalStatusCode).lookupName;
    newIndividualForm.patchValue({
      maritalStatus
    });
    }
      if (indFormValue.idTypeCode){
    const idType = this.initialLooupsData.idTypes.find(l => l.lookupCode === indFormValue.idTypeCode).lookupName;
    newIndividualForm.patchValue({
      idType
    });
  }
      if (indFormValue.relationshipCode){
    const relationship = this.initialLooupsData.relationships.find(l => l.lookupCode === indFormValue.relationshipCode).lookupName;
    newIndividualForm.patchValue({
      relationship
    });
  }
      this.individualsArray.push(newIndividualForm);
      this.beneficiaryService.resetIndividualForm();
      this.individualTable.renderRows();
    }
  });
}
onSubmit() {
  this.benefSubmitted = true;
  if (this.beneficiaryForm.invalid){
    return;
  }
  if(this.beneficiaryForm.value.beneficiaryID){
    this.beneficiaryService.updateBeneficiary().subscribe((response: any)=>{
      this.alertifyService.success('Successfull updated beneficiary');
      this.router.navigate(['/beneficiarySearch']);
    },(error)=>{
      this.alertifyService.error('Unable to update beneficiary');
    })
  }else{
    this.beneficiaryService.addBeneficiary().subscribe((response: any) =>{
      this.alertifyService.success('Successfull added beneficiary');
      this.router.navigate(['/beneficiarySearch']);
    },(error) =>{
      this.alertifyService.error('Unable to add beneficiary');
    })
  }
  
  alert('Success!!!');
}
deleteBeneficiary(){
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '500px',
    // data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && this.benef.beneficiaryID.value){
      this.beneficiaryService.deleteBeneficiary(this.benef.beneficiaryID.value)
      .subscribe((response: any)=>{
        this.alertifyService.success('Beneficiary Successfuly deleted.');
      },(error: any ) =>{
        this.alertifyService.error('Un able to delete beneficiary.')
      })
    }
  });
}
ngAfterViewInit(): void {

  }
}
