import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { TabsPage } from './tabs/tabs.page';
import { RegisterPage } from './pages/register/register.page';
import { VerificacionPage } from './pages/verificacion/verificacion.page';

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
    path: 'register', 
    component: RegisterPage 
  },
  {
    path: 'travel/verificar/:token',
    component: VerificacionPage
  },
  {
    path: 'tabs',
    component: TabsPage
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terminos/terminos.page').then( m => m.TerminosPage)
  },
  {
    path: 'verificacion',
    loadComponent: () => import('./pages/verificacion/verificacion.page').then( m => m.VerificacionPage)
  }
];
