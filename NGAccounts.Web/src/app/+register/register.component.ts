import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonService } from '../shared/Services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  Loading:string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formModel.reset();
    this.Loading="";
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  onSubmit() {
    this.Loading="Loading... Please wait.";
    this.register().subscribe(
      (res: any) => {
        if (res.message=="Success") {
          this.formModel.reset();
          alert("New user created! Registration successful you may login now");
          this.Loading="Registration successful you may login now";
        }
        else
        {
          alert(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password
    };

    //console.log(body);

    return this.http.post(CommonService.baseURL + '/Auth/Register', body);
  }

}
