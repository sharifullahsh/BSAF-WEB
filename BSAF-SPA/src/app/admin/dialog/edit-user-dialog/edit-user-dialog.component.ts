import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public userService: UserService,
              public dialogRef: MatDialogRef<EditUserDialogComponent>
  ) { }
 
  ngOnInit(): void {
  }
  addUser(){
    // if(this.UserForm.invalid){
    //   return;
    // }
    this.dialogRef.close(1);
  }

}
