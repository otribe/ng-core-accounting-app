import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountTransaction } from '../../shared/DomainModel/AccountTransaction';
import { AccountTransactionService } from '../../shared/Services/account-transaction/account-transaction.service';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-account-transaction',
    templateUrl: './account-transaction.component.html',
    styleUrls: ['./account-transaction.component.css']
    , providers: [AccountTransactionService, MessageService]
})

export class AccountTransactionComponent implements OnInit {

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
    LedgerAccountList:any[]; 

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
        await this.BindDropDownLedgerAccount(); 

    }

    async BindGrid() {
        await this.accountTransactionService.GetAll().then(data => this.accountTransactions = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'debitLedgerAccountId', header: 'Debit Account' },
            { field: 'creditLedgerAccountId', header: 'Credit Account' },
            { field: 'amount', header: 'Amount' },
            { field: 'remarks', header: 'Remarks' },
            { field: 'transactionDate', header: 'Transaction Date' },
            { field: 'dateAdded', header: 'Date Added' }, 
            { field: 'isActive', header: 'IsActive' } 
        ];

        this.selectedColumns = this.cols;
    }

    async BindDropDownLedgerAccount()
    {
        await this.accountTransactionService.GetAllLedgerAccountList().then(data => this.LedgerAccountList = data);
    }
     
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newAccountTransaction)
            await this.accountTransactionService.Insert(formData);
        else
            await this.accountTransactionService.Update(formData);
 
         //console.log(this.accountTransactionForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newAccountTransaction = false; 
        //this.accountTransaction=event.data;
        //console.log(this.accountTransaction);
        this.accountTransactionService.GetById(event.data.id) 
            .then((data) => {
                this.accountTransaction = data;
                this.accountTransactionForm.controls['modifiedBy'].setValue(localStorage.getItem('UserId'));
                this.accountTransactionForm.controls['dateModied'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
            });
        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.accountTransactionService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newAccountTransaction = true;
        this.accountTransaction = {};
        this.displayDialog = true;
        
        this.accountTransactionForm.controls['addedBy'].setValue(localStorage.getItem('UserId'));
        this.accountTransactionForm.controls['dateAdded'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
        this.accountTransactionForm.controls['modifiedBy'].setValue(localStorage.getItem('UserId'));
        this.accountTransactionForm.controls['dateModied'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.accountTransactionForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newAccountTransaction) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.accountTransactionForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.accountTransactionForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

