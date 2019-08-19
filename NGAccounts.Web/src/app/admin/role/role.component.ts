import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Role } from '../../shared/DomainModel/Role';
import { RoleService } from '../../shared/Services/role/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
    , providers: [RoleService, MessageService]
})

export class RoleComponent implements OnInit {

    displayDialog: boolean;
    role: Role = {};
    selectedRole: Role;
    newRole: boolean;
    roles: Role[];
    cols: any[];
    selectedColumns: any[];
    roleForm: FormGroup;
    submitted: boolean;
    filz: File;

    constructor(private fb: FormBuilder, private roleService: RoleService, private messageService: MessageService) { }

    async ngOnInit() {
        this.roleForm = this.fb.group({
            'id': new FormControl(''),
            'roleName': new FormControl('', Validators.required),
            'isActive': new FormControl('', Validators.required) 
        });

        await this.BindGrid();
        //dropdown binding

    }

    async BindGrid() {
        await this.roleService.GetAll().then(data => this.roles = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'roleName', header: 'RoleName' },
            { field: 'isActive', header: 'IsActive' } 
        ];

        this.selectedColumns = this.cols;
    }


 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newRole)
            await this.roleService.Insert(formData);
        else
            await this.roleService.Update(formData);
 
         //console.log(this.roleForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newRole = false; 
        //this.role=event.data;
        
        this.roleService.GetById(event.data.id)
            .then(data => this.role = data);
 
        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.roleService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newRole = true;
        this.role = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.roleForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newRole) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.roleForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.roleForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

