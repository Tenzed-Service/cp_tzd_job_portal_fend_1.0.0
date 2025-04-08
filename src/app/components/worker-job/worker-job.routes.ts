
import { Routes } from '@angular/router';
import { WorkerJobComponent } from './worker-job.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { ViewJobComponent } from './view-job/view-job.component';

export const workerJobRoutes: Routes = [
  {
    path: "",
    component: WorkerJobComponent,
  },
  {
    path: "apply/:jobId",
    component: ApplyJobComponent,
  },
  {
    path: "view/:id",
    component: ViewJobComponent,
  },
];
