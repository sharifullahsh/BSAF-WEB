import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-individual-delete-dialog',
  templateUrl: './individual-delete-dialog.component.html',
  styleUrls: ['./individual-delete-dialog.component.css']
})
export class IndividualDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IndividualDeleteDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
