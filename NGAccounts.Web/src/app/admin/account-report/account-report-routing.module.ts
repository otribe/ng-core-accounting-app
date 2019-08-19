import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountReportComponent } from './account-report.component';

const routes: Routes = [{
  path: '',
  component: AccountReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportRoutingModule { }

