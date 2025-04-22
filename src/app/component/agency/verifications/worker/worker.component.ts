import { PaginationSchema } from './../../../../shared/ui/pagination/pagination.component.models';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { WorkerViewComponent } from '../../../common/worker-view/worker-view.component';
import { AdvancedFilterSortDirectionEnum, GridViewType, TableColumnsDataTypeEnum, TableFilterTypeEnum } from '../../../../core/enums/common.enum';
import { DropdownItemModel } from '../../../../core/models/common/common.models';
import { TableColumns, TableSchema } from '../../../../shared/ui/table/table.component.models';
import { ColumnFormateService } from '../../../../core/services/helper/column-formate.service';
import { FilterSchema } from '../../../../shared/component/filters/filters.component.models';

export interface Worker {
  id: number;
  name: string;
  email: string;
  contact: string;
  country: string;
  status: string;
  lastUpdated: string
}

@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      WorkerViewComponent
    ]
})
export class WorkerComponent {
  workerList: Worker[] = [
    {
      id: 1,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      contact: "+1 (415) 555-7890",
      country: "USA",
      status: "Pending",
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      email: "sarah.mitchell@example.com",
      contact: "+1 (212) 555-3456",
      country: "USA",
      status: "Approved",
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: "Daniel Thompson",
      email: "daniel.thompson@example.com",
      contact: "+1 (312) 555-9876",
      country: "USA",
      status: "Info Requested",
      lastUpdated: '2 days ago'
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      contact: "+1 (617) 555-2345",
      country: "USA",
      status: "Rejected",
      lastUpdated: '4 days ago'
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      contact: "+1 (214) 555-6789",
      country: "USA",
      status: "Pending",
      lastUpdated: '5 days ago'
    },
    {
      id: 6,
      name: "Jennifer Anderson",
      email: "jennifer.anderson@example.com",
      contact: "+1 (206) 555-4321",
      country: "USA",
      status: "Approved",
      lastUpdated: '6 days ago'
    },
    {
      id: 7,
      name: "Daniel Thompson",
      email: "daniel.thompson@example.com",
      contact: "+1 (312) 555-9876",
      country: "USA",
      status: "Info Requested",
      lastUpdated: '2 days ago'
    },
    {
      id: 8,
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      contact: "+1 (617) 555-2345",
      country: "USA",
      status: "Rejected",
      lastUpdated: '4 days ago'
    },
    {
      id: 9,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      contact: "+1 (214) 555-6789",
      country: "USA",
      status: "Pending",
      lastUpdated: '4 days ago'
    },
    {
      id: 10,
      name: "Jennifer Anderson",
      email: "jennifer.anderson@example.com",
      contact: "+1 (206) 555-4321",
      country: "USA",
      status: "Approved",
      lastUpdated: '5 days ago'
    },
  ];
  gridViewType = GridViewType;
  tableSchema: TableSchema<WorkerComponent, Worker[]> = {
    parentComponent: this,
    data: this.workerList,
    showSerialNo: true,
    columns: [],
  };
  filterSchema:FilterSchema<WorkerComponent,any> = {
    parentComponent: this,
    applyBtn: true,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent
  };
  paginationSchema:PaginationSchema<WorkerComponent,any> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };
  statusList: DropdownItemModel[] = [];
  industries: DropdownItemModel[] = [];
  calenders: DropdownItemModel[] = [];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService
  ) { 
    this.tableSchema.columns = [
      {
        title: 'Name',
        dataPropertyName: 'name',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatAvatar,
        onSortChange: this.onSortChange,
      },
      // {
      //   title: 'Email',
      //   dataPropertyName: 'email',
      //   sorting: true,
      //   dataType: TableColumnsDataTypeEnum.String,
      //   sortDirection: AdvancedFilterSortDirectionEnum.None,
      //   onFormatChange: this.columnFormateService.formatString,
      //   onSortChange: this.onSortChange,
      // },
      {
        title: 'Contact Number',
        dataPropertyName: 'contact',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Country',
        dataPropertyName: 'country',
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
        dataType: TableColumnsDataTypeEnum.Int,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatStatus,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Updated',
        dataPropertyName: 'lastUpdated',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Actions',
        dataPropertyName: 'actions',
        actions: [
          {
            tooltip: 'View',
            actionType: 'view',
            class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
            iconClass: 'ri-eye-line',
            onActionClick: this.onActionClick,
          },
          {
            tooltip: 'File',
            actionType: 'file',
            class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
            iconClass: 'ri-file-list-line',
            onActionClick: this.onActionClick,
          },
        ],
      },
    ]
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Verification' },
      { label: 'Worker', active: true },
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
    paginationSchema: PaginationSchema<WorkerComponent, Worker[]>,
    pagination:{pageNumber: number,pageSize: number}
  ) {
    paginationSchema.pageNumber = pagination.pageNumber; 
    paginationSchema.pageSize = pagination.pageSize; 
  }

  onActionClick(
    tableSchema: TableSchema<WorkerComponent, Worker[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.openDetails(event.id);
    }
  }

  onSortChange(
    tableSchema: TableSchema<WorkerComponent, Worker[]>,
    columnSchema?: TableColumns<WorkerComponent, Worker[]>
  ) {
    if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.None) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Ascending;      
    } else if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.Ascending) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Descending;     
    } else if(columnSchema) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.None;      
    }
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<WorkerComponent, Worker[]>,
    event?: any
  ) {
    console.log(filterSchema,event);
  }

  openDetails(id: number) {
    // Handle opening details for the given ID
    this.router.navigateByUrl(`/verification/worker/verification-details/${id}`);
  }
}
