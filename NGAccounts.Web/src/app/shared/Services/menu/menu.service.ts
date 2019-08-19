import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../../DomainModel/Menu';
import { CommonService } from '../common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataResponse } from '../../DomainModel/DataResponse';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetAll() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/Menu/GetMenus')
      .toPromise()
      .then(res => <Menu[]>res.data)
      .then(data => { return data; });
  }

  GetAllMenuList() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/Menu/GetDropDownMenu')
      .toPromise()
      .then(data => { return data; });
  }


  Insert(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/Menu/PostMenu', value
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
      return this.httpClient.get<any>(CommonService.baseURL + '/Menu/GetMenu/'+id)
      .toPromise()
      .then(data => { return data; }); 
  }

  Update(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/Menu/PutMenu?id=0', value
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
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/Menu/DeleteMenu?id=0', value
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
