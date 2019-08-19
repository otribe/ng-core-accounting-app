import { Component, OnInit } from '@angular/core'; 
import { HomeService } from '../shared/Services/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }


  // ngAfterViewInit() {
  //   Prism.highlightAll();
  // }

  users: number;
  roles: number;
  menus: number;
  accounts: number;

  data: any;
  datadp: any;


  ngOnInit() {
    //console.log(localStorage.getItem('myMenu'));
    this.BindDropDownRole();
  
    this.datadp = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

  }

  async BindDropDownRole() {
    await this.homeService.GetDashboard().then((data) => {
      this.users = data.widget.users;
      this.roles = data.widget.roles;
      this.menus = data.widget.menus;
      this.accounts = data.widget.accounts;
      this.data= data.chart[0];
      //console.log(JSON.stringify(data.chart[0]));
    });
  }


}
