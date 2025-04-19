import { Routes } from "@angular/router";
import { ApplicantComponent } from "./applicant.component";
import { ApplicantDetailsComponent } from "./applicant-details/applicant-details.component";

export const applicantRoutes: Routes = [
  {
    path: "",
    component: ApplicantComponent,
  },
  {
    path: "applicant-details/:id",
    component: ApplicantDetailsComponent,
  },
];