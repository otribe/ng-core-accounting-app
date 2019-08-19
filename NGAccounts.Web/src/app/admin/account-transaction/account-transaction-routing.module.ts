import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountTransactionComponent } from './account-transaction.component';

const routes: Routes = [{
  path: '',
  component: AccountTransactionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTransactionRoutingModule { }

