import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: "auth",
    loadChildren: () => import('./component/auth/auth.routes').then(m => m.auth),
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
