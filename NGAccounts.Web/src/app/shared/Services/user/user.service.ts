import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../DomainModel/User';
import { CommonService } from '../common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataResponse } from '../../DomainModel/DataResponse';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetAll() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/User/GetUsers')
      .toPromise()
      .then(res => <User[]>res.data)
      .then(data => { return data; });
  }

  GetAllRoleList() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/User/GetDropDownRole')
      .toPromise()
      .then(data => { return data; });
  }


  Insert(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/User/PostUser', value
    ).subscribe(
      data => { 
        if (data.status == "success")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Saved' });
        else
          this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Warning ' + data.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' + error });
      }
    );
  }

  async GetById(id:number) { 
      return this.httpClient.get<any>(CommonService.baseURL + '/User/GetUser/'+id)
      .toPromise()
      .then(data => { return data; }); 
  }

  Update(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/User/PutUser?id=0', value
    ).subscribe(
      data => {
        if (data.status == "success")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
        else
          this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Warning ' + data.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' + error });
      }

    );
  }

  Delete(value: any) { 
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/User/DeleteUser?id=0', value
    ).subscribe(
      data => {
        if (data.status == "success")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
        else
          this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Warning ' + data.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' + error });
      }
    );
  }

}
