import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { content } from './shared/routes/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: "",
    component: LayoutComponent,
    children: content
  },
  
  {
    path: "auth",
    loadChildren: () => import('./component/common/auth/auth.routes').then(m => m.auth),
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth/login'
  // }
];
