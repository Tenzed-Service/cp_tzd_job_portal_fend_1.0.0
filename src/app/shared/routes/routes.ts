import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../component/common/user-profile/user-profile.component';
import { DashboardComponent } from '../../component/common/dashboard/dashboard.component';
import { OpenWorkerComponent } from '../../component/employer/open-worker/open-worker.component';
import { ChatComponent } from '../../component/common/chat/chat.component';

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
    loadChildren: () => import('../../component/employer/jobs/jobs.routes').then(m => m.jobsRoutes),
  },
  {
    path: "applicants",
    loadChildren: () => import('../../component/employer/applicant/applicant.routes').then(m => m.applicantRoutes),
  },
  {
    path: "verification",
    loadChildren: () => import('../../component/agency/verifications/verification.routes').then(m => m.verificationRoutes),
  },
  {
    path: "job-grid",
    loadChildren: () => import('../../component/agency/worker-jobs/worker-jobs.routes').then(m => m.jobGridRoutes),
  },

  {
    path: "shift-management",
    loadChildren: () => import('../../component/employer/shift-management/shift-management.routes').then(m => m.shiftManagementRoutes),
  },

  {
    path: "chat",
    component: ChatComponent
  },

  {
    path: "reports",
    loadChildren: () => import('../../component/employer/reports/reports.routes').then(m => m.reportsRoutes),
  },

  {
    path: "worker-jobs",
    loadChildren: () => import('../../component/worker/worker-jobs/worker-jobs.routes').then(m => m.workerJobsRoutes),
  },
];
