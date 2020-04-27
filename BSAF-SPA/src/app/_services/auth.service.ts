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
          this.setUserDetails();
          return respons;
        }
      })
    );
  }
  setUserDetails() {
    if (localStorage.getItem('token')) {
      this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.currentUser = {
        id : this.decodedToken?.nameid,
        userName: this.decodedToken?.unique_name,
        roles: this.decodedToken?.role
      };
    }
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.currentUser = undefined;
    this.alertifyService.success('Logged out');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    if (!token){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    this.setUserDetails();
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
    if (localStorage.getItem('token')) {
      this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.currentUser = {
        id : this.decodedToken?.nameid,
        userName: this.decodedToken?.unique_name,
        roles: this.decodedToken?.role
      };
      return this.currentUser;
    }
    this.logout();
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
