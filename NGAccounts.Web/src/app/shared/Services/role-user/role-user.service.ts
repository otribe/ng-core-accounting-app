import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleUser } from '../../DomainModel/RoleUser';
import { CommonService } from '../common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataResponse } from '../../DomainModel/DataResponse';

@Injectable({
  providedIn: 'root'
})

export class RoleUserService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetAll() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/RoleUser/GetRoleUsers')
      .toPromise()
      .then(res => <RoleUser[]>res.data)
      .then(data => { return data; });
  }

  GetAllRoleList() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/RoleUser/GetDropDownRole')
      .toPromise()
      .then(data => { return data; });
  }
  GetAllUserList() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/RoleUser/GetDropDownUser')
      .toPromise()
      .then(data => { return data; });
  }


  Insert(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/RoleUser/PostRoleUser', value
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
      return this.httpClient.get<any>(CommonService.baseURL + '/RoleUser/GetRoleUser/'+id)
      .toPromise()
      .then(data => { return data; }); 
  }

  Update(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/RoleUser/PutRoleUser?id=0', value
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
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/RoleUser/DeleteRoleUser?id=0', value
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
