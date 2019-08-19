import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CommonService } from '../common.service'; 

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private httpClient: HttpClient) { }
 
  async GetDashboard() { 
      return this.httpClient.get<any>(CommonService.baseURL + '/Home/Dashboard/')
      .toPromise()
      .then(data => { return data; }); 
  }

   

}
