import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { TabsPage } from './tabs/tabs.page';
import { DetallePaquetePage } from './pages/detalle-paquete/detalle-paquete.page'

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
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'travel/verificar/:token',
    loadComponent: () => import('./pages/verificacion/verificacion.page').then(m => m.VerificacionPage)
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terminos/terminos.page').then(m => m.TerminosPage)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'explorar',
        loadComponent: () => import('./explorar/explorar.page').then(m => m.ExplorarPage),
      },
      {
        path: 'planificador',
        loadComponent: () => import('./planificador/planificador.page').then(m => m.PlanificadorPage),
      },
      {
        path: 'reservas',
        loadComponent: () => import('./reservas/reservas.page').then(m => m.ReservasPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil.page').then(m => m.PerfilPage),
      },
      {
        path: 'paquete/:id',
        loadComponent: () => import('./pages/detalle-paquete/detalle-paquete.page').then(m => m.DetallePaquetePage)
      },
      {
        path: '',
        redirectTo: 'explorar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'detalle-paquete',
    loadComponent: () => import('./pages/detalle-paquete/detalle-paquete.page').then( m => m.DetallePaquetePage)
  }
];
