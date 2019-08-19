import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppSetting } from '../../shared/DomainModel/AppSetting';
import { AppSettingService } from '../../shared/Services/app-setting/app-setting.service';

@Component({
    selector: 'app-app-setting',
    templateUrl: './app-setting.component.html',
    styleUrls: ['./app-setting.component.css']
    , providers: [AppSettingService, MessageService]
})

export class AppSettingComponent implements OnInit {

    displayDialog: boolean;
    appSetting: AppSetting = {};
    selectedAppSetting: AppSetting;
    newAppSetting: boolean;
    appSettings: AppSetting[];
    cols: any[];
    selectedColumns: any[];
    appSettingForm: FormGroup;
    submitted: boolean;
    filz: File;

    constructor(private fb: FormBuilder, private appSettingService: AppSettingService, private messageService: MessageService) { }

    async ngOnInit() {
        this.appSettingForm = this.fb.group({
            'id': new FormControl(''),
            'appName': new FormControl('', Validators.required),
            'appShortName': new FormControl(''),
            'appVersion': new FormControl(''),
            'isToggleSidebar': new FormControl('', Validators.required),
            'isBoxedLayout': new FormControl('', Validators.required),
            'isFixedLayout': new FormControl('', Validators.required),
            'isToggleRightSidebar': new FormControl('', Validators.required),
            'skin': new FormControl(''),
            'footerText': new FormControl(''),
            'logo': new FormControl('', Validators.required),

        });

        await this.BindGrid();
        //dropdown binding

    }

    async BindGrid() {
        await this.appSettingService.GetAll().then(data => this.appSettings = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'appName', header: 'AppName' },
            { field: 'appShortName', header: 'AppShortName' },
            { field: 'appVersion', header: 'AppVersion' },
            { field: 'isToggleSidebar', header: 'IsToggleSidebar' },
            { field: 'isBoxedLayout', header: 'IsBoxedLayout' },
            { field: 'isFixedLayout', header: 'IsFixedLayout' },
            { field: 'isToggleRightSidebar', header: 'IsToggleRightSidebar' },
            { field: 'skin', header: 'Skin' },
            { field: 'footerText', header: 'FooterText' },
            { field: 'logo', header: 'Logo' },

        ];

        this.selectedColumns = this.cols;
    }


 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newAppSetting)
            await this.appSettingService.Insert(formData);
        else
            await this.appSettingService.Update(formData);
 
         //console.log(this.appSettingForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newAppSetting = false; 
        //this.appSetting=event.data;
        //console.log(this.appSetting);
        this.appSettingService.GetById(event.data.id)
            .then(data => this.appSetting = data);

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.appSettingService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newAppSetting = true;
        this.appSetting = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.appSettingForm.value).forEach(k => {
            if (k == "logo") {//use this if some fileUpload field.
                if (this.filz != null)
                    formData.append('logo', this.filz, this.filz.name);
            }
            else {
                if (this.newAppSetting) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.appSettingForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.appSettingForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

