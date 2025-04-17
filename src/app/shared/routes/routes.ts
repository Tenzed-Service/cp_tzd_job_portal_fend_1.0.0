import { applicantRoutes } from './../../component/applicant/applicant.routes';
import { jobsRoutes } from './../../component/jobs/jobs.routes';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { UserProfileComponent } from '../../component/user-profile/user-profile.component';
import { OpenWorkerComponent } from '../../component/open-worker/open-worker.component';
import { JobsComponent } from '../../component/jobs/jobs.component';

export const content: Routes = [
  // {
  //   path: "",
  //   loadChildren: () => import('../../component/welcome-screen/welcome-screen.routes').then(m => m.welcomeScreenRoutes),
  // },
  {
    path: "profile",
    component: UserProfileComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "open-worker",
    component: OpenWorkerComponent,
  },
  {
    path: "jobs",
    loadChildren: () => import('../../component/jobs/jobs.routes').then(m => m.jobsRoutes),
  },
  {
    path: "applicants",
    loadChildren: () => import('../../component/applicant/applicant.routes').then(m => m.applicantRoutes),
  },
  {
    path: "verification",
    loadChildren: () => import('../../component/verifications/verification.routes').then(m => m.verificationRoutes),
  },
  {
    path: "reports",
    loadChildren: () => import('../../component/reports/reports.routes').then(m => m.reportsRoutes),
  },
];
