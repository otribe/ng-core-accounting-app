import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/Services/user/user.service';
import { CommonService } from '../shared/Services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  Loading: string; 
  // ,private userService: UserService
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/');
 
  }

  onSubmit(form: NgForm) {
    this.Loading = "Loading...";
    this.login(form.value).subscribe(
      (res: any) => {
        //console.log(res.myMenu);
        const myMenu = JSON.stringify(res.myMenu);
        //console.log(myMenu);
        localStorage.setItem('token', res.token);
        localStorage.setItem('UserId', res.id);
        localStorage.setItem('UserName', res.userName);
        localStorage.setItem('myMenu', myMenu);
        this.router.navigateByUrl('/');
      },
      err => {
        if (err.status == 400)
          alert('Incorrect username or password.');
        else
          console.log(err);
      }
    );
  }

  login(formData) {
    return this.httpClient.post(CommonService.baseURL + '/Auth/Login', formData);
  }

}
