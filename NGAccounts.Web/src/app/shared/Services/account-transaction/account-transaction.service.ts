import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountTransaction } from '../../DomainModel/AccountTransaction';
import { CommonService } from '../common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataResponse } from '../../DomainModel/DataResponse';

@Injectable({
  providedIn: 'root'
})

export class AccountTransactionService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetAll() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/AccountTransaction/GetAccountTransactions')
      .toPromise()
      .then(res => <AccountTransaction[]>res.data)
      .then(data => { return data; });
  }

  GetAllLedgerAccountList() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/AccountTransaction/GetDropDownLedgerAccount')
      .toPromise()
      .then(data => { return data; });
  }

  GetAllLedgerAccountListFilter() { 
    return this.httpClient.get<any>(CommonService.baseURL + '/AccountTransaction/GetDropDownLedgerAccountFilter')
      .toPromise()
      .then(data => { return data; });
  }
    

  Insert(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/AccountTransaction/PostAccountTransaction', value
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
      return this.httpClient.get<any>(CommonService.baseURL + '/AccountTransaction/GetAccountTransaction/'+id)
      .toPromise()
      .then(data => { return data; }); 
  }

  Update(value: any) {
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/AccountTransaction/PutAccountTransaction?id=0', value
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
    this.httpClient.post<DataResponse>(CommonService.baseURL + '/AccountTransaction/DeleteAccountTransaction?id=0', value
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
