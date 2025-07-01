import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'tabs',
    component: TabsPage
  }
];
