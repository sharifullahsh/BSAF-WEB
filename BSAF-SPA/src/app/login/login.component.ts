import { AlertifyService } from '../_services/alertify.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loading = false;
  submitted = false;
  returnUrl: string;
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertifyService: AlertifyService) {}

    login() {
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.authService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        next => {
        this.alertifyService.success('Logged in successfully');
        this.router.navigate([returnUrl]);
      },
       error => {
        this.loading = false;
        this.loginForm.reset();
        this.loginForm.setErrors({invalidLogin: true});
        this.alertifyService.error(error);
      });

  }
}
