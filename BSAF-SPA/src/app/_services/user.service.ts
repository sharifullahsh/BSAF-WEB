import { UniqueUserNameValidator } from './../shared/validator/uniqueUserNameValidator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Injectable, OnInit } from '@angular/core';
import { MustMatch } from '../shared/validator/fieldMatchValidator';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

// const ALTER_EGOS = ['Eric'];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  availableRoles: any[] = [
    'Admin',
     'DataEntry'
   ];

   addUserForm: FormGroup = this.fb.group({
    userName: [null,
    {
      validators: [Validators.required],
      asyncValidators: [this.uniqueUserNameValidator.validate.bind(this.uniqueUserNameValidator)],
      updateOn: 'blur'
    }],
    displayName: [null, Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
    roles: [null, Validators.required]
  }, {validator : MustMatch('password', 'confirmPassword')});

  editUserForm: FormGroup = this.fb.group({
    id: [null],
    userName: [{value: null, disabled: true}],
    displayName: [null, Validators.required],
    roles: [null, Validators.required]
  });
  adminChangePasswordForm: FormGroup = this.fb.group({
    id: [null],
    password: [null, Validators.required],
    currentPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
    confirmNewPassword: [null, Validators.required],
  }, {validator : MustMatch('newPassword', 'confirmNewPassword')});
  userChangePasswordForm: FormGroup = this.fb.group({
    id: [null],
    currentPassword: [null, Validators.required],
    newPassword: [null, [Validators.required, Validators.minLength(4)]],
    confirmNewPassword: [null, Validators.required],
  }, {validator : MustMatch('newPassword', 'confirmNewPassword')});
constructor(public fb: FormBuilder,
            private http: HttpClient,
            public uniqueUserNameValidator: UniqueUserNameValidator) { }
getAllUserWithRoles(){
    return this.http.get(this.baseUrl + 'admin/allUserWithRoles');
  }
getUserWithRoles(){
    return this.http.get(this.baseUrl + 'admin/userWithRoles');
  }
  addUser(){
    return this.http.post(this.baseUrl + 'admin/register', this.addUserForm.value);
  }
  editUser(){
    return this.http.post(this.baseUrl + 'admin/editUser/' + this.editUserForm.getRawValue().userName, this.editUserForm.getRawValue());
  }
  deleteUser(userId: string) {
    return this.http.delete(this.baseUrl + 'admin/deleteUser/' + userId);
  }
  adminChangePassword() {
    const formData = this.adminChangePasswordForm.value;
    return this.http.post(this.baseUrl + 'admin/adminChangeUserPassword/' +
    formData.id, formData);
  }
  userChangePassword() {
    const formData = this.userChangePasswordForm.value;
    return this.http.post(this.baseUrl + 'admin/userChangePassword', formData);
  }
}
