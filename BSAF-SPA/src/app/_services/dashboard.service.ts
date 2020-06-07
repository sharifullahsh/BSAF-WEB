import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getTileData(){
    return this.http.get(this.baseUrl + 'dashboard/getTileData');
  }
  getChartsData(formData:any){
    return this.http.post(this.baseUrl + 'dashboard/getChartsData', formData);
  }
}
