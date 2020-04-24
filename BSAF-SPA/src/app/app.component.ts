import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
constructor(private authService: AuthService, private router: Router) {}
ngOnInit(): void {
  this.isLoggedIn = this.authService.loggedIn();
  if (!this.isLoggedIn){
    this.router.navigate(['/login']);
  }
}

}