import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'explorar',
        loadComponent: () =>
          import('../explorar/explorar.page').then((m) => m.ExplorarPage),
      },
      {
        path: 'planificador',
        loadComponent: () =>
          import('../planificador/planificador.page').then((m) => m.PlanificadorPage),
      },
      {
        path: 'reservas',
        loadComponent: () =>
          import('../reservas/reservas.page').then((m) => m.ReservasPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: '/tabs/explorar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/explorar',
    pathMatch: 'full',
  },
];