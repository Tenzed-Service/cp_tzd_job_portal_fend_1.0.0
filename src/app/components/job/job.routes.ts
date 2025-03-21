
import { Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';

export const jobRoutes: Routes = [
  {
    path: "",
    component: JobComponent,
  },
  {
    path: "create",
    component: CreateJobComponent,
  },
  {
    path: "edit/:id",
    component: EditJobComponent,
  },
  {
    path: "apply/:id",
    component: ApplyJobComponent,
  },
];
