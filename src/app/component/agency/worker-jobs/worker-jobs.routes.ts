import { Routes } from "@angular/router";
import { JobGridComponent } from "./job-grid.component";
import { ViewJobDetailsComponent } from "./view-job-details/view-job-details.component";

export const jobGridRoutes: Routes = [
  {
    path: "",
    component: JobGridComponent,
  },
  {
    path: "job-details/:id",
    component: ViewJobDetailsComponent,
  },
];