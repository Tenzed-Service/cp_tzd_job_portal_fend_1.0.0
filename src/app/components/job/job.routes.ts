
import { Routes } from '@angular/router';
import { PermissionGuard } from '../../core/guard/permission.guard';
import { JobComponent } from './job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';

export const jobRoutes: Routes = [
  {
    path: "",
    component: JobComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'user.index'
    }
  },
  {
    path: "create",
    component: CreateJobComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['user.index', 'user.create']
    }
  },
  {
    path: "edit/:id",
    component: EditJobComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['user.index', 'user.edit']
    }
  }
];
