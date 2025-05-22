import { Routes } from "@angular/router";
import { OpenWorkerComponent } from "./open-worker.component";
import { WorkerDetailsComponent } from "./worker-details/worker-details.component";


export const openWorkerRoutes: Routes = [
  {
    path: "",
    component: OpenWorkerComponent,
  },
  {
    path: "worker-details/:id",
    component: WorkerDetailsComponent,
  },
];