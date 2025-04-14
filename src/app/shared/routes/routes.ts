import { Routes } from '@angular/router';
import { DashboardScreenComponent } from '../../component/dashboard/dashboard.component';

export const content: Routes = [
  {
    path: "verification",
    loadChildren: () => import('../../component/welcome-screen/welcome-screen.routes').then(m => m.welcomeScreenRoutes),
  },
  {
    path: "dashboard",
    component: DashboardScreenComponent,
  }
];
