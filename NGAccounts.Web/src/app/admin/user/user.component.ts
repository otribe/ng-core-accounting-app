import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { User } from '../../shared/DomainModel/User';
import { UserService } from '../../shared/Services/user/user.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
    , providers: [UserService, MessageService]
})

export class UserComponent implements OnInit {

    displayDialog: boolean;
    user: User = {};
    selectedUser: User;
    newUser: boolean;
    users: User[];
    cols: any[];
    selectedColumns: any[];
    userForm: FormGroup;
    submitted: boolean;
    filz: File;
    RoleList: any[];

    constructor(private fb: FormBuilder, private userService: UserService, private messageService: MessageService) { }

    async ngOnInit() {
        this.userForm = this.fb.group({
            'id': new FormControl(''),
            'userName': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
            'firstName': new FormControl('', Validators.required),
            'lastName': new FormControl(''),
            'dateOfBirth': new FormControl(''),
            'profilePicture7': new FormControl(''),
            'profilePicture': new FormControl(''),
            'email': new FormControl('', Validators.required),
            'contactNumber': new FormControl(''),
            'address': new FormControl(''),
            'emailConfirmed': new FormControl(''),
            'about': new FormControl(''),
            'lastLogoutTime': new FormControl(''),
            'addedBy': new FormControl(''),
            'dateAdded': new FormControl(''),
            'modifiedBy': new FormControl(''),
            'dateModied': new FormControl(''),
            'changePasswordCode': new FormControl(''),
            'roleId': new FormControl('', Validators.required),
            'isActive': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding
        await this.BindDropDownRole();

    }

    async BindGrid() {
        await this.userService.GetAll().then(data => this.users = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'userName', header: 'UserName' }, 
            { field: 'firstName', header: 'FirstName' }, 
            { field: 'email', header: 'Email' },
            { field: 'contactNumber', header: 'ContactNumber' }, 
            { field: 'dateAdded', header: 'DateAdded' }, 
            { field: 'isActive', header: 'IsActive' } 

        ];

        this.selectedColumns = this.cols;
    }

    async BindDropDownRole() {
        await this.userService.GetAllRoleList().then(data => this.RoleList = data);
    }


    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newUser)
            await this.userService.Insert(formData);
        else
            await this.userService.Update(formData);

        //console.log(this.userForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });

    }

    onRowSelect(event) {

        this.newUser = false;
        //this.user=event.data;
        //console.log(this.user);
        this.userService.GetById(event.data.id)
            .then((data) => {
                this.user = data;
                this.userForm.controls['modifiedBy'].setValue(localStorage.getItem('UserId'));
                this.userForm.controls['dateModied'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
            });

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.userService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newUser = true;
        this.user = {};
        this.displayDialog = true;
        this.userForm.controls['addedBy'].setValue(localStorage.getItem('UserId'));
        this.userForm.controls['dateAdded'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
        this.userForm.controls['modifiedBy'].setValue(localStorage.getItem('UserId'));
        this.userForm.controls['dateModied'].setValue(formatDate(new Date(), 'yyyy/MM/dd', 'en'));
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.userForm.value).forEach(k => {
            if (k == "profilePicture") {//use this if some fileUpload field.
                if (this.filz != null)
                    formData.append('profilePicture', this.filz, this.filz.name);
            }
            else {
                if (this.newUser) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.userForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.userForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods

}

