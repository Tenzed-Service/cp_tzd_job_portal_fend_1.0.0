import { Routes } from "@angular/router";
import { WorkerComponent } from "./worker/worker.component";
import { EmployerComponent } from "./employer/employer.component";
import { VerificationDetailsScreenComponent } from "./verification-details/verification-details.component";

export const verificationRoutes: Routes = [
  {
    path: "employer",
    component: EmployerComponent,
  },
  {
    path: "employer/verification-details/:id",
    component: VerificationDetailsScreenComponent,
  },
  {
    path: "worker",
    component: WorkerComponent,
  },
  {
    path: "worker/verification-details/:id",
    component: VerificationDetailsScreenComponent,
  },
];