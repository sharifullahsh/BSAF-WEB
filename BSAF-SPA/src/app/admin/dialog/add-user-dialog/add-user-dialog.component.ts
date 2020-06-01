import { AlertifyService } from './../../../_services/alertify.service';
import { UniqueUserNameValidator } from './../../../shared/validator/uniqueUserNameValidator';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  userSubmitted = false;
  constructor(public uniqueUserNameValidator: UniqueUserNameValidator,
              public alertifyService: AlertifyService,
              public fb: FormBuilder,
              public userService: UserService,
              public dialogRef: MatDialogRef<AddUserDialogComponent>
  ) { }

 get f(){
  return this.userService.addUserForm.controls;
 }

  ngOnInit(): void {
  }
  cancelClick(){
    this.userService.addUserForm.reset();
    this.dialogRef.close();
  }
  addUser(){
    this.userSubmitted = true;
    if( this.userService.addUserForm.invalid){
      return;
    }
    this.userService.addUser().subscribe((response: any) => {
      this.alertifyService.success('User created successfully');
      this.userService.addUserForm.reset();
      this.dialogRef.close(1);
    }, error => {
      this.alertifyService.error('Unable to create user');
    });
  }

}
