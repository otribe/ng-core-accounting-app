import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuPermission } from '../../shared/DomainModel/MenuPermission';
import { MenuPermissionService } from '../../shared/Services/menu-permission/menu-permission.service';

@Component({
    selector: 'app-menu-permission',
    templateUrl: './menu-permission.component.html',
    styleUrls: ['./menu-permission.component.css']
    , providers: [MenuPermissionService, MessageService]
})

export class MenuPermissionComponent implements OnInit {

    displayDialog: boolean;
    menuPermission: MenuPermission = {};
    selectedMenuPermission: MenuPermission;
    newMenuPermission: boolean;
    menuPermissions: MenuPermission[];
    cols: any[];
    selectedColumns: any[];
    menuPermissionForm: FormGroup;
    submitted: boolean;
    filz: File;
    MenuList:any[];
    RoleList:any[];
    UserList:any[];

    constructor(private fb: FormBuilder, private menuPermissionService: MenuPermissionService, private messageService: MessageService) { }

    async ngOnInit() {
        this.menuPermissionForm = this.fb.group({
            'id': new FormControl(''),
            'menuId': new FormControl(''),
            'roleId': new FormControl('', Validators.required),
            'userId': new FormControl(''),
            'sortOrder': new FormControl(''),
            'isCreate': new FormControl('', Validators.required),
            'isRead': new FormControl('', Validators.required),
            'isUpdate': new FormControl('', Validators.required),
            'isDelete': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding
        //await this.BindDropDownMenu();
        //await this.BindDropDownRole();
        //await this.BindDropDownUser();
        await this.BindDropDowns();
    }

    async BindGrid() {
        await this.menuPermissionService.GetAll().then(data => this.menuPermissions = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'menuId', header: 'MenuId' },
            { field: 'roleId', header: 'RoleId' },
            { field: 'userId', header: 'UserId' },
            { field: 'sortOrder', header: 'SortOrder' },
            { field: 'isCreate', header: 'IsCreate' },
            { field: 'isRead', header: 'IsRead' },
            { field: 'isUpdate', header: 'IsUpdate' },
            { field: 'isDelete', header: 'IsDelete' },

        ];

        this.selectedColumns = this.cols;
    }

    
    async BindDropDowns()//bulk dropdowns
    {
        await this.menuPermissionService.GetAllDropDownList()
        .then((data) => { 
            this.MenuList = data.menu;
            this.RoleList = data.role;
            this.UserList = data.user;
          }); 
    }
 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newMenuPermission)
            await this.menuPermissionService.Insert(formData);
        else
            await this.menuPermissionService.Update(formData);
 
         //console.log(this.menuPermissionForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newMenuPermission = false; 
        //this.menuPermission=event.data;
        //console.log(this.menuPermission);
        this.menuPermissionService.GetById(event.data.id)
            .then(data => this.menuPermission = data);

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.menuPermissionService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newMenuPermission = true;
        this.menuPermission = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.menuPermissionForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newMenuPermission) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.menuPermissionForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.menuPermissionForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

