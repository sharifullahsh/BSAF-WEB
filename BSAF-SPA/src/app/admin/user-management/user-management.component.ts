import { UserService } from './../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AdminService } from '../../_services/admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../dialog/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
   //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: MatTableDataSource<User> ;

  searchKey: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'userName', 'displayName', 'stationCode', 'roles','actions'];
 constructor(private adminService: AdminService,
             private alertifyService: AlertifyService,
             public dialog: MatDialog,
             public userService: UserService){
 }
  ngOnInit() {
    this.getUsersWithRoles();
  }
  getUsersWithRoles(){
    this.userService.getUsersWithRoles().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, error => {
      this.alertifyService.error(error);
      console.log("error "+ JSON.stringify(error));
    });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
     }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearFilter(){
    this.searchKey = '';
    this.applyFilter();
  }
  DisableUser(userId: number){
     console.log("user is >>>>>>>>>>> "+ userId);
  }
  addUser(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '60%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1){
        this.getUsersWithRoles();
      }
    });
  }
}
