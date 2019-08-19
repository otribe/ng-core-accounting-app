import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { LedgerAccount } from '../../shared/DomainModel/LedgerAccount';
import { LedgerAccountService } from '../../shared/Services/ledger-account/ledger-account.service';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-ledger-account',
    templateUrl: './ledger-account.component.html',
    styleUrls: ['./ledger-account.component.css']
    , providers: [LedgerAccountService, MessageService]
})

export class LedgerAccountComponent implements OnInit {

    displayDialog: boolean;
    ledgerAccount: LedgerAccount = {};
    selectedLedgerAccount: LedgerAccount;
    newLedgerAccount: boolean;
    ledgerAccounts: LedgerAccount[];
    cols: any[];
    selectedColumns: any[];
    ledgerAccountForm: FormGroup;
    submitted: boolean;
    filz: File;
    LedgerAccountList:any[];

    constructor(private fb: FormBuilder, private ledgerAccountService: LedgerAccountService, private messageService: MessageService) { }

    async ngOnInit() {
        this.ledgerAccountForm = this.fb.group({
            'id': new FormControl(''),
            'name': new FormControl('', Validators.required),
            'parentId': new FormControl(''),
            'dateAdded': new FormControl(''),
            'addedBy': new FormControl(''),
            'isActive': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding
        await this.BindDropDownLedgerAccount();

    }

    async BindGrid() {
        await this.ledgerAccountService.GetAll().then(data => this.ledgerAccounts = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'parentId', header: 'ParentId' },
            { field: 'dateAdded', header: 'DateAdded' },
            { field: 'addedBy', header: 'AddedBy' },
            { field: 'isActive', header: 'IsActive' },

        ];

        this.selectedColumns = this.cols;
    }

    async BindDropDownLedgerAccount()
    {
        await this.ledgerAccountService.GetAllLedgerAccountList().then(data => this.LedgerAccountList = data);
    }

 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newLedgerAccount)
            await this.ledgerAccountService.Insert(formData);
        else
            await this.ledgerAccountService.Update(formData);
 
         //console.log(this.ledgerAccountForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newLedgerAccount = false; 
         
        //console.log(this.ledgerAccount);
        this.ledgerAccountService.GetById(event.data.id)
            .then(data => this.ledgerAccount = data);
        // this.ledgerAccountService.GetById(event.data.id)
        //     .then(data => this.ledgerAccountForm.setValue(data));
             
        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.ledgerAccountService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newLedgerAccount = true;
        this.ledgerAccount = {};
        this.displayDialog = true;
        this.ledgerAccountForm.controls['addedBy'].setValue(localStorage.getItem('UserId'));
        this.ledgerAccountForm.controls['dateAdded'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
        
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.ledgerAccountForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newLedgerAccount) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.ledgerAccountForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.ledgerAccountForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

