import { Injectable } from '@angular/core';
import { Lookup } from '../models/Lookup';
import { PostArrivalNeedForView } from '../models/PostArrivalNeeds';
import { CheckboxForView } from '../models/CheckboxForView';
import { DeterminationForView } from '../models/Determination';

@Injectable({
  providedIn: 'root'
})
export class CreateBenefFormListsService {

  constructor() { }
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
}
