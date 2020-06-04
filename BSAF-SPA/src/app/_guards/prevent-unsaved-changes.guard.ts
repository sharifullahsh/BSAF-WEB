import { BeneficiaryFormComponent } from './../beneficiary/beneficiary-form/beneficiary-form.component';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<BeneficiaryFormComponent> {
  canDeactivate(component: BeneficiaryFormComponent) {
    if( component.beneficiaryForm.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes  will be lost');
    }
    return true;
  }
  
}
