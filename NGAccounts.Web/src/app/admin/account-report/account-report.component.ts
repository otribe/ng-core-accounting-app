import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountTransaction } from '../../shared/DomainModel/AccountTransaction';
import { AccountTransactionService } from '../../shared/Services/account-transaction/account-transaction.service';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-account-report',
    templateUrl: './account-report.component.html',
    styleUrls: ['./account-report.component.css']
    , providers: [AccountTransactionService, MessageService]
})

export class AccountReportComponent implements OnInit {

    displayDialog: boolean;
    accountTransaction: AccountTransaction = {};
    selectedAccountTransaction: AccountTransaction;
    newAccountTransaction: boolean;
    accountTransactions: AccountTransaction[];
    cols: any[];
    selectedColumns: any[];
    accountTransactionForm: FormGroup;
    submitted: boolean;
    filz: File;
    LedgerAccountList: any[];

    constructor(private fb: FormBuilder, private accountTransactionService: AccountTransactionService, private messageService: MessageService) { }

    async ngOnInit() {
        this.accountTransactionForm = this.fb.group({
            'id': new FormControl(''),
            'debitLedgerAccountId': new FormControl('', Validators.required),
            'creditLedgerAccountId': new FormControl('', Validators.required),
            'amount': new FormControl('', Validators.required),
            'remarks': new FormControl(''),
            'transactionDate': new FormControl('', Validators.required),
            'dateAdded': new FormControl(''),
            'modifiedBy': new FormControl(''),
            'dateModied': new FormControl(''),
            'addedBy': new FormControl(''),
            'isActive': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding
        await this.BindDropDownLedgerAccountFilter();

    }

    async BindGrid() {
        await this.accountTransactionService.GetAll().then(data => this.accountTransactions = data);

        this.cols = [
            { field: 'debitLedgerAccountId', header: 'Debit Account' },
            { field: 'creditLedgerAccountId', header: 'Credit Account' },
            { field: 'amount', header: 'Amount' },
            { field: 'remarks', header: 'Remarks' },
            { field: 'transactionDate', header: 'Date' }
        ];

        this.selectedColumns = this.cols;
    }


    async BindDropDownLedgerAccountFilter() {
        await this.accountTransactionService.GetAllLedgerAccountListFilter().then(data => this.LedgerAccountList = data);
    }

    print() {
        let pchead,pcbody, popupWin;
        pchead = document.getElementsByTagName('thead')[0].innerHTML;
        pcbody = document.getElementsByTagName('tbody')[0].innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()"><table> ${pchead}${pcbody}</table></body>
      </html>`
        );
        popupWin.document.close();
        popupWin.document.print();

    }

}

