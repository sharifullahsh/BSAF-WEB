import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  getSearchLookups() {
    return this.http.get(this.baseUrl + 'lookup/searchLookups');
  }
  getInitialLookups(){
    return this.http.get(this.baseUrl + 'lookup/initialLookups');
  }
}
