import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { User } from '../models/User';
import { MatDialog } from '@angular/material/dialog';
import { UserChangePassDialogComponent } from '../shared/dialog/user-change-pass-dialog/user-change-pass-dialog.component';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit{
  title = 'BSAF';
  currentUser: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private userService: UserService,
              public dialog: MatDialog) {}
  ngOnInit(): void{
     this.currentUser = this.authService.loggedInUser();
  }
 logout(){
  this.authService.logout();
 }

changePassword(){
  if (!this.currentUser){
    return;
  }
  this.userService.userChangePasswordForm.patchValue({
    id: this.currentUser.id
  });
  const dialogRef = this.dialog.open(UserChangePassDialogComponent, {
    width: '40%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1){
    }
  });
}
}
