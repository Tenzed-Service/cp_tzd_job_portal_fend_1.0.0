import { UserType } from '../../../core/enums/common.enum';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { AgencyDashboardComponent } from '../../agency/agency-dashboard/agency-dashboard.component';
import { EmployerDashboardComponent } from '../../employer/employer-dashboard/employer-dashboard.component';
import { WorkerDashboardComponent } from '../../worker/worker-dashboard/worker-dashboard.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      AgencyDashboardComponent,
      EmployerDashboardComponent,
      WorkerDashboardComponent
    ]
})
export class DashboardComponent {
  userType = UserType;
  currentUser:string = '';
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Dashboard', active: true },
    ]);     
    this.singletonStoreService.selectedUserType.subscribe((user:string) => {
      this.currentUser = user;
    });
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
