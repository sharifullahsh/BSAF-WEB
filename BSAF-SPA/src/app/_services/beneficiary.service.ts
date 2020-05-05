import { AlertifyService } from './alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getSearchedBeneficiary(searchCritria: any): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiary/listPartial', searchCritria, httpOptions);
  }
}
