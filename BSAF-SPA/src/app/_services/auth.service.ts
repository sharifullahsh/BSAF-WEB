import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { map, repeat } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl + 'login/';
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
constructor(private http: HttpClient,
            private router: Router, private alertifyService: AlertifyService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((respons: any) => {
        const user = respons;
        if (user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          return respons;
        }
      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.decodedToken = null;
    this.currentUser = null;
    this.alertifyService.success('Logged out');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    if (token){
      this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
    return !!token;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles && userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
  loggedInUser(): User {
    if (this.currentUser) {
      return this.currentUser;
    }
    console.log(JSON.parse(localStorage.getItem('user')));
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser;
  }
  loggedInUserRole(){
    let roles  = [] as Array<string>;
    if (this.decodedToken) {
      roles =  this.decodedToken.role as Array<string>;
    }
    if (localStorage.getItem('token')) {
     roles =  this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('token'))).role;
    }
    return roles;
  }
}
