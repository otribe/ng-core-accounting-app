import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Menu } from '../../shared/DomainModel/Menu';
import { MenuService } from '../../shared/Services/menu/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
    , providers: [MenuService, MessageService]
})

export class MenuComponent implements OnInit {

    displayDialog: boolean;
    menu: Menu = {};
    selectedMenu: Menu;
    newMenu: boolean;
    menus: Menu[];
    cols: any[];
    selectedColumns: any[];
    menuForm: FormGroup;
    submitted: boolean;
    filz: File;
    MenuList:any[];

    constructor(private fb: FormBuilder, private menuService: MenuService, private messageService: MessageService) { }

    async ngOnInit() {
        this.menuForm = this.fb.group({
            'id': new FormControl(''),
            'menuText': new FormControl('', Validators.required),
            'menuURL': new FormControl('', Validators.required),
            'parentId': new FormControl(''),
            'sortOrder': new FormControl(''),
            'menuIcon': new FormControl(''),

        });

        await this.BindGrid();
        //dropdown binding
        await this.BindDropDownMenu();

    }

    async BindGrid() {
        await this.menuService.GetAll().then(data => this.menus = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'menuText', header: 'MenuText' },
            { field: 'menuURL', header: 'MenuURL' },
            { field: 'parentId', header: 'ParentId' },
            { field: 'sortOrder', header: 'SortOrder' },
            { field: 'menuIcon', header: 'MenuIcon' },

        ];

        this.selectedColumns = this.cols;
    }

    async BindDropDownMenu()
    {
        await this.menuService.GetAllMenuList().then(data => this.MenuList = data);
    }

 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newMenu)
            await this.menuService.Insert(formData);
        else
            await this.menuService.Update(formData);
 
         //console.log(this.menuForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newMenu = false; 
        //this.menu=event.data;
        //console.log(this.menu);
        this.menuService.GetById(event.data.id)
            .then((data) =>{
                this.menu=data;
            });

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.menuService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newMenu = true;
        this.menu = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.menuForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newMenu) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.menuForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.menuForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

