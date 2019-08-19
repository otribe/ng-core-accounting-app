import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent {
  constructor(private router: Router) { }
  UserId: string;
  UserName:string;

  ngOnInit() {
    this.UserId = localStorage.getItem('UserId'); 
    this.UserName=localStorage.getItem('UserName');
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('myMenu');
    localStorage.removeItem('UserId'); 
    localStorage.removeItem('UserName');
    this.router.navigate(['/login']);
  }
}
