import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { RoleUser } from '../../shared/DomainModel/RoleUser';
import { RoleUserService } from '../../shared/Services/role-user/role-user.service';

@Component({
    selector: 'app-role-user',
    templateUrl: './role-user.component.html',
    styleUrls: ['./role-user.component.css']
    , providers: [RoleUserService, MessageService]
})

export class RoleUserComponent implements OnInit {

    displayDialog: boolean;
    roleUser: RoleUser = {};
    selectedRoleUser: RoleUser;
    newRoleUser: boolean;
    roleUsers: RoleUser[];
    cols: any[];
    selectedColumns: any[];
    roleUserForm: FormGroup;
    submitted: boolean;
    filz: File;
    RoleList:any[];
    UserList:any[];

    constructor(private fb: FormBuilder, private roleUserService: RoleUserService, private messageService: MessageService) { }

    async ngOnInit() {
        this.roleUserForm = this.fb.group({
            'id': new FormControl(''),
            'roleId': new FormControl('', Validators.required),
            'userId': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding
        await this.BindDropDownRole();
        await this.BindDropDownUser();

    }

    async BindGrid() {
        await this.roleUserService.GetAll().then(data => this.roleUsers = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'roleId', header: 'RoleId' },
            { field: 'userId', header: 'UserId' },

        ];

        this.selectedColumns = this.cols;
    }

    async BindDropDownRole()
    {
        await this.roleUserService.GetAllRoleList().then(data => this.RoleList = data);
    }
    async BindDropDownUser()
    {
        await this.roleUserService.GetAllUserList().then(data => this.UserList = data);
    }

 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newRoleUser)
            await this.roleUserService.Insert(formData);
        else
            await this.roleUserService.Update(formData);
 
         //console.log(this.roleUserForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newRoleUser = false; 
        //this.roleUser=event.data;
        //console.log(this.roleUser);
        this.roleUserService.GetById(event.data.id)
            .then(data => this.roleUser = data);

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.roleUserService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newRoleUser = true;
        this.roleUser = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.roleUserForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newRoleUser) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.roleUserForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.roleUserForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

