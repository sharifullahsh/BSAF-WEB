import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userSubmitted = false;
  constructor(
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
    if(this.userService.editUserForm.invalid){
      return;
    }
    this.userService.editUser().subscribe((response: any) =>{
      this.alertifyService.success('User scuccessfully edited');
      this.userService.editUserForm.reset();
      this.dialogRef.close(1);

    }, (error: any) => {
      this.alertifyService.error('Unable to edit user');
    });
  }

}
