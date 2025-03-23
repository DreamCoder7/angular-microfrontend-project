import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'app1',
    loadChildren: () => import('mfe-app1/Module').then((m) => m.App1Routes),
  },
  {
    path: 'app2',
    loadChildren: () => import('mfe-app2/Module').then((m) => m.App2Routes),
  },
  { path: '**', redirectTo: '/login' },
];
