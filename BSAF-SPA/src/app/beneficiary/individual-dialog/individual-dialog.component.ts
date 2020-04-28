import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { LookupService } from 'src/app/_services/lookup.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-individual-dialog',
  templateUrl: './individual-dialog.component.html',
  styleUrls: ['./individual-dialog.component.css']
})
export class IndividualDialogComponent implements OnInit {
  individualForm = this.fb.group({
    name:''
  });
  constructor(private fb: FormBuilder, private lookupService: LookupService,
              public dialogRef: MatDialogRef<IndividualDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveIndividual(){
    console.log('save indi >>>>>>>>');
    this.dialogRef.close(this.data.animal);
  }
}
