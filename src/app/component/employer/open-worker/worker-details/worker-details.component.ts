import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { Router } from '@angular/router';
import { UserDetailsScreenComponent } from '../../../common/user-details/user-details.component';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss'],
  standalone: true,
  imports: [CommonModule,UserDetailsScreenComponent],
})
export class WorkerDetailsComponent implements OnInit {
  currentUrl: string[] = [];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {    
    // Initial URL parsing
    this.updateCurrentUrl();
  }
  ngOnInit(): void {}

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url
      .split('/')
      .filter((item) => item.trim() !== '');
    this.singletonStoreService.breadCrumbItems.next([
        { label: 'Open Worker', url: '/open-worker' },
        { label: 'Worker Details', active: true },
      ]);
  }

  close() {
    this.router.navigateByUrl('/open-worker');
  }

}
