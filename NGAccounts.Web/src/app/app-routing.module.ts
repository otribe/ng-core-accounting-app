import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Get Started'
    }, 
    children: [
      {
        path: '',
        component: HomeComponent,canActivate:[AuthGuard]
      },{
        path: 'role',
        loadChildren: './admin/role/role.module#RoleModule',
        data: {
          title: 'Role'
        },canActivate:[AuthGuard]
      },{
        path: 'user',
        loadChildren: './admin/user/user.module#UserModule',
        data: {
          title: 'User'
        },canActivate:[AuthGuard]
      },{
        path: 'role-user',
        loadChildren: './admin/role-user/role-user.module#RoleUserModule',
        data: {
          title: 'RoleUser'
        },canActivate:[AuthGuard]
      },{
        path: 'menu',
        loadChildren: './admin/menu/menu.module#MenuModule',
        data: {
          title: 'Menu'
        },canActivate:[AuthGuard]
      },{
        path: 'menu-permission',
        loadChildren: './admin/menu-permission/menu-permission.module#MenuPermissionModule',
        data: {
          title: 'MenuPermission'
        },canActivate:[AuthGuard]
      },{
        path: 'app-setting',
        loadChildren: './admin/app-setting/app-setting.module#AppSettingModule',
        data: {
          title: 'AppSetting'
        },canActivate:[AuthGuard]
      },{
        path: 'general-setting',
        loadChildren: './admin/general-setting/general-setting.module#GeneralSettingModule',
        data: {
          title: 'GeneralSetting'
        },canActivate:[AuthGuard]
      },{
        path: 'ledger-account',
        loadChildren: './admin/ledger-account/ledger-account.module#LedgerAccountModule',
        data: {
          title: 'LedgerAccount'
        },canActivate:[AuthGuard]
      },{
        path: 'account-transaction',
        loadChildren: './admin/account-transaction/account-transaction.module#AccountTransactionModule',
        data: {
          title: 'AccountTransaction'
        },canActivate:[AuthGuard]
      },{
        path: 'account-report',
        loadChildren: './admin/account-report/account-report.module#AccountReportModule',
        data: {
          title: 'Account Debit Credit Report'
        },canActivate:[AuthGuard]
      }
    ]
},
{
  path: 'login',
  loadChildren: './+login/login.module#LoginModule',
  data: {
    customLayout: true
  }
}, {
  path: 'register',
  loadChildren: './+register/register.module#RegisterModule',
  data: {
    customLayout: true
  }
} 

];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }




