import { AlertifyService } from './../_services/alertify.service';
import { AdminService } from './../_services/admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserManagementDataSource, UserManagementItem } from './user-management-datasource';
import { User } from '../models/User';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserManagementItem>;
  dataSource: UserManagementDataSource;

  users: User[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 constructor(private adminService: AdminService, private alertifyService: AlertifyService){}
  ngOnInit() {
    this.dataSource = new UserManagementDataSource();
    this.getUsersWithRoles();
  }
  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe((users: User[]) =>{
      this.users = users;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
}
