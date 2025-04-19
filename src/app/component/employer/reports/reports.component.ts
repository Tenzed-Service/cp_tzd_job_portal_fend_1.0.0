import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ReportsComponent {
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Reports', active: true },
    ]);     
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
