import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  {
    path: "",
    loadChildren: () => import('./component/welcome-screen/welcome-screen.routes').then(m => m.welcomeScreenRoutes),
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
