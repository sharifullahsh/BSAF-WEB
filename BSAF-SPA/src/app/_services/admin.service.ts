import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getUsersWithRoles(){
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }
}
