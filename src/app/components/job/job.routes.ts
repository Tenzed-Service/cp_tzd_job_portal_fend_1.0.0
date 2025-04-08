
import { Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobApplyListComponent } from './job-apply-list/job-apply-list.component';
import { ApplyJobComponent } from '../worker-job/apply-job/apply-job.component';

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
    path: "job-apply-workers/:id",
    component: JobApplyListComponent,
  },
  {
    path: "apply-confirmation/:jobId/:jobApplyId",
    component: ApplyJobComponent,
  },
];
