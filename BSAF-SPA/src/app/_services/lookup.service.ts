import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getInitialLookups(){
    return this.http.get(this.baseUrl + 'lookup/initialLookups');
  }
}
