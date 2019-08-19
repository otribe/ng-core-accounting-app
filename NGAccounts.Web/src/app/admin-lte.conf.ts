export const adminLteConf = {
  skin: 'red',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu:JSON.parse(localStorage.getItem('myMenu'))
  //[
    // { label: 'MAIN NAVIGATION', separator: true },
    // { label: 'Dashboard', route: '/', iconClasses: 'fa fa-road', pullRights: [{ text: 'New', classes: 'label pull-right bg-green' }] },
    // //{ label: 'Prime Grid', route: 'prime-grid', iconClasses: 'fa fa-table' },
    // { label: 'User', route: 'user', iconClasses: 'fa fa-users' },
    // { label: 'role', route: 'role', iconClasses: 'fa fa-users' },
    // { label: 'role-user', route: 'role-user', iconClasses: 'fa fa-users' },
    // { label: 'menu', route: 'menu', iconClasses: 'fa fa-users' },
    // { label: 'menu-permission', route: 'menu-permission', iconClasses: 'fa fa-users' },
    // { label: 'app-setting', route: 'app-setting', iconClasses: 'fa fa-users' },
    // { label: 'general-setting', route: 'general-setting', iconClasses: 'fa fa-users' },
    // { label: 'ledger-account', route: 'ledger-account', iconClasses: 'fa fa-users' },
    // { label: 'account-transaction', route: 'account-transaction', iconClasses: 'fa fa-users' },
      
    // // {
    // //   label: 'Layout', iconClasses: 'fa fa-th-list', children: [
    // //     { label: 'Configuration', route: 'layout/configuration' },
    // //     { label: 'Custom', route: 'layout/custom' },
    // //     { label: 'Header', route: 'layout/header' },
    // //     { label: 'Sidebar Left', route: 'layout/sidebar-left' },
    // //     { label: 'Sidebar Right', route: 'layout/sidebar-right' },
    // //     { label: 'Content', route: 'layout/content' }
    // //   ]
    // // }, 
  //]
};
