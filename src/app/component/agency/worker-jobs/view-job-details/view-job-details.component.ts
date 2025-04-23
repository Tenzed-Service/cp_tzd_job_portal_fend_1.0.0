import { routes } from './../../../../app.routes';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-view-job-details',
    templateUrl: './view-job-details.component.html',
    styleUrls: ['./view-job-details.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ViewJobDetailsComponent {
  jobId: number = 0;
  openApplyModel: boolean = false;
    
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Jobs', url: 'job-grid' },
      { label: 'Job Details', active: true },
    ]);     
  }

  action(routes: string) {
    this.router.navigateByUrl(routes);
  }
}
