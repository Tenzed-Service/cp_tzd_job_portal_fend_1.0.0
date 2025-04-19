import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-employer-dashboard',
    templateUrl: './employer-dashboard.component.html',
    styleUrls: ['./employer-dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class EmployerDashboardComponent {
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Dashboard', active: true },
    ]);     
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
