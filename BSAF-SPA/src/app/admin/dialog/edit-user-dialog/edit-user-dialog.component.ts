import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userSubmitted = false;
  constructor(private fb: FormBuilder,
              public userService: UserService,
              private alertifyService: AlertifyService,
              public dialogRef: MatDialogRef<EditUserDialogComponent>
  ) { }
  get f(){
    return this.userService.editUserForm.controls;
   }  
  ngOnInit(): void {
  }
  cancelClick(){
    this.userService.editUserForm.reset();
    this.dialogRef.close();
  }
  editUser(){
    this.userSubmitted = true;
    console.log("is form valid "+ this.userService.editUserForm.valid);
    console.log("form data is  "+JSON.stringify(this.userService.editUserForm.getRawValue()));
    if(this.userService.editUserForm.invalid){
      return;
    }
    this.userService.editUser().subscribe((response: any) =>{
      this.alertifyService.success('User scuccessfully edited');
      this.dialogRef.close(1);

    }, (error: any) => {
      this.alertifyService.error('Unable to edit user');
    });
  }

}
