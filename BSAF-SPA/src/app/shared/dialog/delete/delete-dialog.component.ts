import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
