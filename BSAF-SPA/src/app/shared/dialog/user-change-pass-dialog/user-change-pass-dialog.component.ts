import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MustMatch } from '../../validator/fieldMatchValidator';

@Component({
  selector: 'app-user-change-pass-dialog',
  templateUrl: './user-change-pass-dialog.component.html',
  styleUrls: ['./user-change-pass-dialog.component.css']
})
export class UserChangePassDialogComponent implements OnInit {
  userSubmitted = false;
  constructor(
              public alertifyService: AlertifyService,
              public userService: UserService,
              public dialogRef: MatDialogRef<UserChangePassDialogComponent>,
  ) { }
  
 get f(){
  return this.userService.userChangePasswordForm.controls;
 }

  ngOnInit(): void {
  }
  cancelClick(){
    this.userService.userChangePasswordForm.reset();
    this.dialogRef.close();
  }
  changePassword(){
    this.userSubmitted = true;
    if ( this.userService.userChangePasswordForm.invalid){
      return;
    }
    this.userService.userChangePassword().subscribe((response: any) => {
      this.alertifyService.success('Password changed successfully');
      this.userService.userChangePasswordForm.reset();
      this.dialogRef.close(1);
    }, error => {
      this.alertifyService.error('Unable to change password');
    });
  }


}
