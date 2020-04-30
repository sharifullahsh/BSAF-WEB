import { InitialLookups } from '../../models/InitialLookups';
import { LookupService } from '../../_services/lookup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.css']
})
export class BeneficiaryFormComponent implements OnInit {
  selectedTab = new FormControl(0);
  beneficiaryForm = this.fb.group({
    ScreeningDate: null,
    ProvinceBCP: null,
    BorderPoint: null,
    BeneficiaryType: [null],
    ReturnStatus: [null],
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  initialLooupsData: InitialLookups;
  constructor(private fb: FormBuilder, private lookupService: LookupService) {}
  ngOnInit(): void {
    this.lookupService.getInitialLookups().subscribe((data: InitialLookups) =>
      {
      this.initialLooupsData = data;
      console.log("data is >>>>>>> "+ JSON.stringify(this.initialLooupsData));
    });
  }
  nextTab(){
    let p = this.selectedTab.value;
    console.log("index is >>>>>>>>>>>"+p);
  }
  onSubmit() {
    alert('Thanks!');
  }
}
