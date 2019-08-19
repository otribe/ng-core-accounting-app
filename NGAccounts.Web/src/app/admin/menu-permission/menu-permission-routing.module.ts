import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPermissionComponent } from './menu-permission.component';

const routes: Routes = [{
  path: '',
  component: MenuPermissionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPermissionRoutingModule { }

