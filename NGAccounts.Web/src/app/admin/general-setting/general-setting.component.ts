import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { GeneralSetting } from '../../shared/DomainModel/GeneralSetting';
import { GeneralSettingService } from '../../shared/Services/general-setting/general-setting.service';

@Component({
    selector: 'app-general-setting',
    templateUrl: './general-setting.component.html',
    styleUrls: ['./general-setting.component.css']
    , providers: [GeneralSettingService, MessageService]
})

export class GeneralSettingComponent implements OnInit {

    displayDialog: boolean;
    generalSetting: GeneralSetting = {};
    selectedGeneralSetting: GeneralSetting;
    newGeneralSetting: boolean;
    generalSettings: GeneralSetting[];
    cols: any[];
    selectedColumns: any[];
    generalSettingForm: FormGroup;
    submitted: boolean;
    filz: File;

    constructor(private fb: FormBuilder, private generalSettingService: GeneralSettingService, private messageService: MessageService) { }

    async ngOnInit() {
        this.generalSettingForm = this.fb.group({
            'id': new FormControl(''),
            'settingKey': new FormControl('', Validators.required),
            'settingValue': new FormControl('', Validators.required),
            'description': new FormControl(''),
            'settingGroup': new FormControl(''),

        });

        await this.BindGrid();
        //dropdown binding

    }

    async BindGrid() {
        await this.generalSettingService.GetAll().then(data => this.generalSettings = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'settingKey', header: 'SettingKey' },
            { field: 'settingValue', header: 'SettingValue' },
            { field: 'description', header: 'Description' },
            { field: 'settingGroup', header: 'SettingGroup' },

        ];

        this.selectedColumns = this.cols;
    }


 
    async onSubmit(value: string) {
        this.submitted = true;

        const formData = new FormData();
        this.BindFormDataFields(formData);

        if (this.newGeneralSetting)
            await this.generalSettingService.Insert(formData);
        else
            await this.generalSettingService.Update(formData);
 
         //console.log(this.generalSettingForm.value);

        this.displayDialog = false;

        this.delay(2000).then(any => {
            this.BindGrid();
        });
 
    }

    onRowSelect(event) {
        this.newGeneralSetting = false; 
        //this.generalSetting=event.data;
        //console.log(this.generalSetting);
        this.generalSettingService.GetById(event.data.id)
            .then(data => this.generalSetting = data);

        this.displayDialog = true;
    }

    async Delete(value: any) {
        var confirmAns = confirm("Do you want to delete?");
        if (confirmAns) {
            this.generalSettingService.Delete(value);
            this.displayDialog = false;

            this.delay(1500).then(any => {
                this.BindGrid();
            });
        }
    }

    //below are private or related methods
    showDialogToAdd() {
        this.newGeneralSetting = true;
        this.generalSetting = {};
        this.displayDialog = true;
    }

    //use with fileUploader
    uploadFile(files) {
        this.filz = <File>files[0];
    }

    private BindFormDataFields(formData: FormData) {
        Object.keys(this.generalSettingForm.value).forEach(k => {
            if (k == "profilePic") {//use this if some fileUpload field.
                //if (this.filz != null)
                    //formData.append('profilePic', this.filz, this.filz.name);
            }
            else {
                if (this.newGeneralSetting) { //check if recored going to create
                    if (k !== "id") //not take id field while create new
                        formData.append(k, this.generalSettingForm.value[k]);
                }
                else//rus while recore update ,because there we need id field
                    formData.append(k, this.generalSettingForm.value[k]);
            }
        });
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    //end private or related methods
 
}

