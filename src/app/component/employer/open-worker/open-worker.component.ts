import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { ddlModel } from '../../agency/verifications/employer/employer.component';

@Component({
    selector: 'app-open-worker',
    templateUrl: './open-worker.component.html',
    styleUrls: ['./open-worker.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      PaginationComponent
    ]
})
export class OpenWorkerComponent {
  currentPage: number = 1;
  totalItems: number = 100;
  itemsPerPage: number = 10;
  statusList: ddlModel[] = [];
  industries: ddlModel[] = [];
  calenders: ddlModel[] = [];
    
  constructor(
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Open Worker', active: true }
    ]);     
  }

  ngOnInit() {
    // Initialize dropdown data
        this.loadDropdownData();
  }

  loadDropdownData() {
        // Add your API calls here to load dropdown data
        this.statusList = [
          { name: 'All Status', value:'All' },
          { name: 'Pending', value:'Pending' }, 
          { name: 'Approved', value:'Approved' }, 
          { name: 'Rejected', value:'Rejected' }
        ];
        this.industries = [
          { name: 'All Industry', value:'All' },
          { name: 'Technology', value:'Technology' }, 
          { name: 'Healthcare', value:'Healthcare' }
        ];
        this.calenders = [
          { name: 'Last 7 days', value:'Last 7 days' },
          { name: 'Last 30 days', value:'Last 30 days' }, 
          { name: 'Last 90 days', value:'Last 90 days' },
          { name: 'All Time', value:'All Time' },
          { name: 'Custom Range', value:'Custom Range' }
        ];
    }

  onChangePagination(page: number) {
    this.currentPage = page; 
  }

}
