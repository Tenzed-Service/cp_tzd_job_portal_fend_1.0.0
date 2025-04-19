import { Routes } from "@angular/router";
import { JobsComponent } from "./jobs.component";
import { JobFormComponent } from "./job-form/job-form.component";

export const jobsRoutes: Routes = [
  {
    path: "",
    component: JobsComponent,
  },
  {
    path: "create-job",
    component: JobFormComponent,
  },
  {
    path: "edit-job/:id",
    component: JobFormComponent,
  },
];