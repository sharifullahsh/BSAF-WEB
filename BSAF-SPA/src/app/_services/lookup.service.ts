import { InitialLookups } from './../models/InitialLookups';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  getSearchLookups() {
    return this.http.get(this.baseUrl + 'lookup/beneficiarySearchLookups');
  }
  getDistrictLookups(provinceCode: string) {
    return this.http.get(this.baseUrl + 'lookup/districtLookups/' + provinceCode);
  }
  getHostCountryProvinces(countryCode: string) {
    return this.http.get(this.baseUrl + 'lookup/hostCountryProvinces/' + countryCode);
  }
  getHostCountryDistricts(provinceID: number) {
    return this.http.get(this.baseUrl + 'lookup/hostCountryDistricts/' + provinceID);
  }
  getInitialLookups(): Observable<InitialLookups>{
    return this.http.get<InitialLookups>(this.baseUrl + 'lookup/initialLookups').pipe(map(response=>{
      return response;
  }));

}
}
