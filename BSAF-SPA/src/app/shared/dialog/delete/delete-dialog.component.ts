import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  title: string;
  description: string;
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
title: string;
description: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
