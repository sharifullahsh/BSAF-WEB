import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-change-pass-dialog',
  templateUrl: './admin-change-pass-dialog.component.html',
  styleUrls: ['./admin-change-pass-dialog.component.css']
})
export class AdminChangePassDialogComponent implements OnInit {
  userSubmitted = false;
  constructor(
              public alertifyService: AlertifyService,
              public userService: UserService,
              public dialogRef: MatDialogRef<AdminChangePassDialogComponent>
  ) { }

 get f(){
  return this.userService.adminChangePasswordForm.controls;
 }

  ngOnInit(): void {
  }
  cancelClick(){
    this.userService.adminChangePasswordForm.reset();
    this.dialogRef.close();
  }
  changePassword(){
    this.userSubmitted = true;
    if( this.userService.adminChangePasswordForm.invalid){
      return;
    }
    this.userService.adminChangePassword().subscribe((response: any) => {
      this.alertifyService.success('User password changed successfully');
      this.userService.adminChangePasswordForm.reset();
      this.dialogRef.close(1);
    }, error => {
      this.alertifyService.error('Unable to change user password');
    });
  }


}
