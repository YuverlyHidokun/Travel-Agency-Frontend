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
    path: 'usuarios/verificar/:token',
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
        children: [
          {
            path: '',
            loadComponent: () => import('./reservas/reservas.page').then(m => m.ReservasPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./reservas/reservas.page').then(m => m.ReservasPage),
          }
        ]
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
    path: 'tabs-admin',
    loadComponent: () => import('./tabs-admin/tabs-admin.page').then(m => m.TabsAdminPage),
    children: [
      {
        path: 'crear-paquete',
        loadComponent: () => import('./pages/admin/crear-paquete/crear-paquete.page').then(m => m.CrearPaquetePage),
      },
      {
        path: 'paquetes',
        loadComponent: () => import('./pages/admin/paquetes/paquetes.page').then(m => m.PaquetesPage),
      },
      {
        path: 'comentarios',
        loadComponent: () => import('./pages/admin/comentarios/comentarios.page').then(m => m.ComentariosPage),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/admin/usuarios/usuarios.page').then(m => m.UsuariosPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil.page').then(m => m.PerfilPage),
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('./pages/admin/estadisticas/estadisticas.page').then(m => m.EstadisticasPage),
      },
      {
        path: '',
        redirectTo: 'crear-paquete',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'detalle-paquete',
    loadComponent: () => import('./pages/detalle-paquete/detalle-paquete.page').then( m => m.DetallePaquetePage)
  },
  {
    path: 'recuperar-password',
    loadComponent: () => import('./pages/recuperar-password/recuperar-password.page').then(m => m.RecuperarPasswordPage)
  },
  {
    path: 'recuperar-password/:token',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage)
  },
];
