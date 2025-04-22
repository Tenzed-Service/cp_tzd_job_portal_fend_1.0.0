import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { WorkerViewComponent } from '../../common/worker-view/worker-view.component';
import { GridViewType, TableColumnsDataTypeEnum, TableFilterTypeEnum } from '../../../core/enums/common.enum';
import { DropdownItemModel } from '../../../core/models/common/common.models';
import { FilterSchema } from '../../../shared/component/filters/filters.component.models';
import { PaginationSchema } from '../../../shared/ui/pagination/pagination.component.models';

@Component({
    selector: 'app-open-worker',
    templateUrl: './open-worker.component.html',
    styleUrls: ['./open-worker.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      WorkerViewComponent
    ]
})
export class OpenWorkerComponent {
  gridViewType = GridViewType;  
  workerList: any[] = [
    {
      id: 1,
      name: "Emily Johnson",
      jobTitle: "General Physician",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20female%20with%20short%20brown%20hair%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=1&orientation=squarish",
      status: "Available",
      statusClass: "status-available",
      skills: ["Patient diagnosis", "Medical documentation", "Clinical decision-making"],
      createdAt: "Apr 2, 2025",
      workerId: "WRK-2025-0042",
    },
    {
      id: 2,
      name: "Michael Chen",
      jobTitle: "Medical Assistant",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20male%20with%20glasses%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=2&orientation=squarish",
      status: "Assigned",
      statusClass: "status-assigned",
      skills: ["Patient assessment", "Medical documentation", "Clinical support"],
      createdAt: "May 6, 2025",
      workerId: "WRK-2025-0038",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      jobTitle: "Dental Nurse",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20latina%20woman%20with%20long%20dark%20hair%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=3&orientation=squarish",
      status: "Off-duty",
      statusClass: "status-offduty",
      skills: ["Chairside assistance", "Infection control", "Sterilization"],
      createdAt: "Apr 9, 2025",
      workerId: "WRK-2025-0051",
    },
    {
      id: 4,
      name: "David Washington",
      jobTitle: "Physiotherapist",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20african%20american%20male%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=4&orientation=squarish",
      status: "Available",
      statusClass: "status-available",
      skills: ["Rehab exercises", "Patient assessment", "Pain management"],
      createdAt: "Apr 12, 2025",
      workerId: "WRK-2025-0067",
    },
    {
      id: 5,
      name: "Rebecca Anderson",
      jobTitle: "Healthcare Assistant",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20blonde%20woman%20with%20medium%20length%20hair%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=5&orientation=squarish",
      status: "Available",
      statusClass: "status-available",
      skills: ["Patient care", "Vital signs", "Medical assistance"],
      createdAt: "Jun 2, 2025",
      workerId: "WRK-2025-0073",
    },
    {
      id: 6,
      name: "Amir Patel",
      jobTitle: "General Physician",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20eastern%20man%20with%20dark%20hair%20and%20beard%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=6&orientation=squarish",
      status: "Assigned",
      statusClass: "status-assigned",
      skills: ["Patient diagnosis", "Clinical assessment", "Treatment planning"],
      createdAt: "Apr 3, 2025",
      workerId: "WRK-2025-0089",
    },
    {
      id: 7,
      name: "Jennifer O'Connor",
      jobTitle: "Dental Nurse",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20woman%20with%20red%20hair%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=7&orientation=squarish",
      status: "Available",
      statusClass: "status-available",
      skills: ["Chairside assistance", "Sterilization", "Infection control"],
      createdAt: "Jan 4, 2025",
      workerId: "WRK-2025-0095",
    },
    {
      id: 8,
      name: "Michelle Kim",
      jobTitle: "Physiotherapist",
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20woman%20with%20black%20hair%2C%20smiling%2C%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=8&orientation=squarish",
      status: "Off-duty",
      statusClass: "status-offduty",
      skills: ["Rehab exercises", "Pain management", "Patient assessment"],
      createdAt: "Apr 10, 2025",
      workerId: "WRK-2025-0102",
    }
  ];
  actions=[
    { icon: "ri-eye-line", function: "view", title: "View Details" },
    { icon: "ri-user-settings-line", function: "edit", title: "Edit Profile" }
  ];
  statusList: DropdownItemModel[] = [];
  industries: DropdownItemModel[] = [];
  calenders: DropdownItemModel[] = [];
  filterSchema:FilterSchema<OpenWorkerComponent,any> = {
    parentComponent: this,
    applyBtn: true,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent
  };
  paginationSchema:PaginationSchema<OpenWorkerComponent,any> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };
    
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
    this.filterSchema.filterItemConfig = [
      {
        title:"Search",
        prefixIcon:"ri-search-line",
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.TextBox,
        placeholder:"Search", 
        filterValue:'',
      },
      {
        title:"Status",
        prefixIcon:"ri-filter-3-line",
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue:'All',
        filterOptions: this.statusList,
      },
      {
        title:"Industries",
        prefixIcon:"ri-building-line",
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue:'All',
        filterOptions: this.industries,
      },
      {
        title:"Calenders",
        prefixIcon:"ri-calendar-line",
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue:'All Time',
        filterOptions: this.calenders,
      },
    ]
  }

  loadDropdownData() {
        // Add your API calls here to load dropdown data
        this.statusList = [
          { label: 'All Status', value:'All' },
          { label: 'Pending', value:'Pending' }, 
          { label: 'Approved', value:'Approved' }, 
          { label: 'Rejected', value:'Rejected' }
        ];
        this.industries = [
          { label: 'All Industry', value:'All' },
          { label: 'Technology', value:'Technology' }, 
          { label: 'Healthcare', value:'Healthcare' }
        ];
        this.calenders = [
          { label: 'Last 7 days', value:'Last 7 days' },
          { label: 'Last 30 days', value:'Last 30 days' }, 
          { label: 'Last 90 days', value:'Last 90 days' },
          { label: 'All Time', value:'All Time' },
          { label: 'Custom Range', value:'Custom Range' }
        ];
    }

    onChangePagination(
      paginationSchema: PaginationSchema<OpenWorkerComponent, Worker[]>,
      pagination:{pageNumber: number,pageSize: number}
    ) {
      paginationSchema.pageNumber = pagination.pageNumber; 
      paginationSchema.pageSize = pagination.pageSize; 
    }

  onActionEvent(action: any) {
    console.log(action); 
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<OpenWorkerComponent, Worker[]>,
    event?: any
  ) {
    console.log(filterSchema,event);
  }
}
