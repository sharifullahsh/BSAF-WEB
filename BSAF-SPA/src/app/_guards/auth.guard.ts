import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private alertifyService: AlertifyService, private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const roles = next?.data?.roles as Array<string>;
      if (roles){
        const match = this.authService.roleMatch(roles);
        if (match){
          return true;
        }else{
          this.router.navigate(['/dashboard']);
          this.alertifyService.error('You are not authorized!');
        }
      }
      if (this.authService.loggedIn()) {
        return true;
      }
      this.alertifyService.error('You are not authorized!');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
