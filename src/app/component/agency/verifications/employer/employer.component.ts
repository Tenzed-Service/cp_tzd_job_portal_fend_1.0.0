import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { FiltersComponent } from '../../../../shared/component/filters/filters.component';
import {
  AdvancedFilterSortDirectionEnum,
  TableColumnsDataTypeEnum,
  TableFilterTypeEnum,
} from '../../../../core/enums/common.enum';
import { DropdownItemModel } from '../../../../core/models/common/common.models';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import {
  TableColumns,
  TableSchema,
} from '../../../../shared/ui/table/table.component.models';
import { ColumnFormateService } from '../../../../core/services/helper/column-formate.service';
import { FilterSchema } from '../../../../shared/component/filters/filters.component.models';
import { PaginationSchema } from '../../../../shared/ui/pagination/pagination.component.models';
import { ApproveUserComponent } from '../../../../shared/component/models/approve-user/approve-user.component';
import { ApproveModalSchema } from '../../../../shared/component/models/approve-user/approve-user.component.models';

export interface EmployerDetail {
  id: number;
  name: string;
  email: string;
  industry: string;
  submittedDate: string;
  status: string;
  documentCount: number;
  lastUpdated: string
}

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    TableComponent,
    PaginationComponent,
    ApproveUserComponent
  ],
})
export class EmployerComponent implements OnInit {
  statusList: DropdownItemModel[] = [];
  industries: DropdownItemModel[] = [];
  calenders: DropdownItemModel[] = [];
  employerList: EmployerDetail[] = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      industry: 'IT & Technology',
      submittedDate: 'Apr 10, 2025',
      status: 'Pending',
      documentCount: 5,
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      name: 'Memorial Healthcare',
      email: 'hr@memorialhc.org',
      industry: 'Healthcare',
      submittedDate: 'Apr 8, 2025',
      status: 'Approved',
      documentCount: 7,
      lastUpdated: '1 day ago',
    },
    {
      id: 3,
      name: 'BuildRight Construction',
      email: 'info@buildright.com',
      industry: 'Construction',
      submittedDate: 'Apr 7, 2025',
      status: 'Info Requested',
      documentCount: 4,
      lastUpdated: '2 days ago',
    },
    {
      id: 4,
      name: 'Global Education Institute',
      email: 'admin@globaledu.edu',
      industry: 'Education',
      submittedDate: 'Apr 5, 2025',
      status: 'Rejected',
      documentCount: 3,
      lastUpdated: '4 days ago',
    },
    {
      id: 5,
      name: 'Financial Services Group',
      email: 'contact@fsgroup.com',
      industry: 'Finance',
      submittedDate: 'Apr 4, 2025',
      status: 'Pending',
      documentCount: 6,
      lastUpdated: '5 days ago',
    },
    {
      id: 6,
      name: 'Advanced Manufacturing Ltd',
      email: 'info@advmfg.com',
      industry: 'Manufacturing',
      submittedDate: 'Apr 3, 2025',
      status: 'Approved',
      documentCount: 5,
      lastUpdated: '6 days ago',
    },
    {
      id: 7,
      name: 'BuildRight Construction',
      email: 'info@buildright.com',
      industry: 'Construction',
      submittedDate: 'Apr 7, 2025',
      status: 'Info Requested',
      documentCount: 4,
      lastUpdated: '2 days ago',
    },
    {
      id: 8,
      name: 'Global Education Institute',
      email: 'admin@globaledu.edu',
      industry: 'Education',
      submittedDate: 'Apr 5, 2025',
      status: 'Rejected',
      documentCount: 3,
      lastUpdated: '4 days ago',
    },
  ];
  filterSchema:FilterSchema<EmployerComponent,any> = {
    parentComponent: this,
    applyBtn: true,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent
  };
  tableSchema: TableSchema<EmployerComponent, EmployerDetail[]> = {
    parentComponent: this,
    data: this.employerList,
    showSerialNo: true,
    columns: [],
  };
  paginationSchema:PaginationSchema<EmployerComponent, EmployerDetail[]> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };
  approveModalSchema: ApproveModalSchema<EmployerComponent, EmployerDetail[]> = {
    parentComponent: this,
    title: 'Approve Employer',
    action: this.onApproveActionClick
  }
  approveModal:boolean = false;

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService
  ) {
    this.tableSchema.columns = [
      {
        title: 'Employer',
        dataPropertyName: 'name',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatAvatar,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Industry',
        dataPropertyName: 'industry',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Submitted Date',
        dataPropertyName: 'submittedDate',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Status',
        dataPropertyName: 'status',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatStatus,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Documents',
        dataPropertyName: 'documentCount',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.Int,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatFileCount,
        onSortChange: this.onSortChange,
      },
      // {
      //   title: 'Updated',
      //   dataPropertyName: 'lastUpdated',
      //   sorting: true,
      //   dataType: TableColumnsDataTypeEnum.String,
      //   sortDirection: AdvancedFilterSortDirectionEnum.None,
      //   onFormatChange: this.columnFormateService.formatString,
      //   onSortChange: this.onSortChange,
      // },
      {
        title: 'Actions',
        dataPropertyName: 'actions',
        actions: [
          {
            tooltip: 'View Details',
            actionType: 'view',
            class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
            iconClass: 'ri-file-search-line',
            onActionClick: this.onActionClick,
          },
          {
            tooltip: 'Approve',
            actionType: 'approve',
            class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
            iconClass: 'ri-check-line',
            onActionClick: this.onActionClick,
          },
          // {
          //   tooltip: 'Close',
          //   actionType: 'Close',
          //   class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
          //   iconClass: 'ri-close-line',
          //   onActionClick: this.onActionClick,
          // },
          // {
          //   tooltip: 'Question',
          //   actionType: 'Question',
          //   class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
          //   iconClass: 'ri-question-line',
          //   onActionClick: this.onActionClick,
          // },
          // {
          //   tooltip: 'History',
          //   actionType: 'History',
          //   class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
          //   iconClass: 'ri-history-line',
          //   onActionClick: this.onActionClick,
          // },
        ],
      },
    ]
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Verification' },
      { label: 'Employer', active: true },
    ]);
  }

  ngOnInit() {
    // Initialize dropdown data
    this.loadDropdownData();
    this.filterSchema.filterItemConfig = [
      {
        title: 'Search',
        prefixIcon: 'ri-search-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.TextBox,
        placeholder: 'Search',
        filterValue: '',
      },
      {
        title: 'Status',
        prefixIcon: 'ri-filter-3-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.statusList,
      },
      {
        title: 'Industries',
        prefixIcon: 'ri-building-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.industries,
      },      
      {
        title: 'Calenders',
        prefixIcon: 'ri-calendar-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All Time',
        filterOptions: this.calenders,
      },
    ];
  }

  loadDropdownData() {
    // Add your API calls here to load dropdown data
    this.statusList = [
      { label: 'All Status', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Rejected', value: 'Rejected' },
    ];
    this.industries = [
      { label: 'All Industry', value: 'All' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Healthcare', value: 'Healthcare' },
    ];
    this.calenders = [
      { label: 'Last 7 days', value: 'Last 7 days' },
      { label: 'Last 30 days', value: 'Last 30 days' },
      { label: 'Last 90 days', value: 'Last 90 days' },
      { label: 'All Time', value: 'All Time' },
      { label: 'Custom Range', value: 'Custom Range' },
    ];
  }

  onActionClick(
    tableSchema: TableSchema<EmployerComponent, EmployerDetail[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.openDetails(event.id);
    }
    if (actionType == 'approve') {
      tableSchema.parentComponent.approveModal = true;
    }
  }

  onApproveActionClick(
    tableSchema: ApproveModalSchema<EmployerComponent, EmployerDetail[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'close') {
      tableSchema.parentComponent.approveModal = false;
    }
    if (actionType == 'approve') {
    }
  }

  onSortChange(
    tableSchema: TableSchema<EmployerComponent, EmployerDetail[]>,
    columnSchema?: TableColumns<EmployerComponent, EmployerDetail[]>
  ) {
    if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.None) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Ascending;      
    } else if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.Ascending) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Descending;     
    } else if(columnSchema) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.None;      
    }
  }

  onChangePagination(
    paginationSchema: PaginationSchema<EmployerComponent, EmployerDetail[]>,
    pagination:{pageNumber: number,pageSize: number}
  ) {
    paginationSchema.pageNumber = pagination.pageNumber; 
    paginationSchema.pageSize = pagination.pageSize; 
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<EmployerComponent, EmployerDetail[]>,
    event?: any
  ) {
    console.log(filterSchema,event);
  }

  openDetails(id: number) {
    // Handle opening details for the given ID
    this.router.navigateByUrl(
      `/verification/employer/verification-details/${id}`
    );
  }
}
