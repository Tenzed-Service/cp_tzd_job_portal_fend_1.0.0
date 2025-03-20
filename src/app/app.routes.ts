import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from './shared/routes/routes';
import { FullComponent } from './shared/components/layout/full/full.component';
import { fullRoutes } from './shared/routes/full.routes';
import { Error404Component } from './errors/error404/error404.component';
import { UserSelectionComponent } from './shared/components/layout/user-selection/user-selection.component';
import { LoginGuard } from './core/guard/login.guard';
import { OptionsScreenGuard } from './core/guard/options-screen.guard';

export const routes: Routes = [
   {
    path: "",
    redirectTo: "user-type",
    pathMatch: "full",
  },

  {
    path: 'user-type',
    component: UserSelectionComponent,
    canActivate: [OptionsScreenGuard],
  },
  {
    path: "auth",
    loadChildren: () => import('./components/auth/auth.routes').then(m => m.auth),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivate: [AuthGuard],
  },
  {
    path: 'full',
    component: FullComponent,
    children: fullRoutes,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component
  }
];
