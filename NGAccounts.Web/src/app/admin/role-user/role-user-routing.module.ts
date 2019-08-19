import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleUserComponent } from './role-user.component';

const routes: Routes = [{
  path: '',
  component: RoleUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleUserRoutingModule { }

