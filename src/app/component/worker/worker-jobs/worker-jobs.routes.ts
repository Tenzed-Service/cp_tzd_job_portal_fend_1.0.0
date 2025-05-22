import { Routes } from "@angular/router";
import { WorkerJobsComponent } from "./worker-jobs.component";
import { ViewJobDetailsComponent } from "./view-job-details/view-job-details.component";

export const workerJobsRoutes: Routes = [
  {
    path: "",
    component: WorkerJobsComponent,
  },
  {
    path: "job-details/:id",
    component: ViewJobDetailsComponent,
  },
];