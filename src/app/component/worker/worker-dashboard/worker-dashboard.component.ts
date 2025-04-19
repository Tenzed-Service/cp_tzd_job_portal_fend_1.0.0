import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-worker-dashboard',
    templateUrl: './worker-dashboard.component.html',
    styleUrls: ['./worker-dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class WorkerDashboardComponent {
    
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
