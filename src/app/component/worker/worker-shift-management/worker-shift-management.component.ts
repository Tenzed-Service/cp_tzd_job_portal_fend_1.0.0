import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { FiltersComponent } from '../../../shared/component/filters/filters.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { PaginationSchema } from '../../../shared/ui/pagination/pagination.component.models';
import { DropdownItemModel } from '../../../core/models/common/common.models';
import { FilterSchema } from '../../../shared/component/filters/filters.component.models';
import { AdvancedFilterSortDirectionEnum, TableColumnsDataTypeEnum, TableFilterTypeEnum } from '../../../core/enums/common.enum';
import { TableColumns, TableSchema } from '../../../shared/ui/table/table.component.models';
import { ColumnFormateService } from '../../../core/services/helper/column-formate.service';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-worker-shift-management',
  templateUrl: './worker-shift-management.component.html',
  styleUrls: ['./worker-shift-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent, TableComponent, PaginationComponent],
})
export class WorkerShiftManagementComponent {
  statusList: DropdownItemModel[] = [];
  priorityFilterList: DropdownItemModel[] = [];
  filterSchema: FilterSchema<WorkerShiftManagementComponent, any> = {
    parentComponent: this,
    applyBtn: false,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent,
  };
  shiftData = [
    {
      "id": 1,
      "date": "May 6, 2025",
      "time": "7:00 AM - 3:00 PM",
      "location": "St. Mary's Hospital",
      "department": "ICU Department",
      "role": "Registered Nurse",
      "requiredStaff": 2,
      "status": "Pending"
    },
    {
      "id": 2,
      "date": "May 6, 2025",
      "time": "3:00 PM - 11:00 PM",
      "location": "Riverside Medical Center",
      "department": "Emergency Department",
      "role": "Physician Assistant",
      "requiredStaff": 1,
      "status": "Filled"
    },
    {
      "id": 3,
      "date": "May 6, 2025",
      "time": "11:00 PM - 7:00 AM",
      "location": "Oakwood Nursing Home",
      "department": "General Care",
      "role": "Licensed Practical Nurse",
      "requiredStaff": 3,
      "status": "Pending"
    },
    {
      "id": 4,
      "date": "May 7, 2025",
      "time": "7:00 AM - 3:00 PM",
      "location": "Sunshine Pediatric Clinic",
      "department": "Pediatric Ward",
      "role": "Medical Assistant",
      "requiredStaff": 2,
      "status": "In Progress"
    },
    {
      "id": 5,
      "date": "May 7, 2025",
      "time": "3:00 PM - 11:00 PM",
      "location": "St. Mary's Hospital",
      "department": "Cardiology Department",
      "role": "Registered Nurse",
      "requiredStaff": 2,
      "status": "Pending"
    }
  ];
  tableSchema: TableSchema<WorkerShiftManagementComponent, any> = {
    parentComponent: this,
    data: this.shiftData,
    showSerialNo: false,
    columns: [],
  };
  paginationSchema: PaginationSchema<WorkerShiftManagementComponent, any[]> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  }; 
  shiftDetailsPanel: boolean = false;

  constructor(
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService,
    private sanitizer: DomSanitizer
  ) {
    // Initialize dropdown data
    this.loadDropdownData();
    this.tableSchema.columns = [
      {
        title: 'Date & Time',
        dataPropertyName: 'date',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.formatDateTime,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Facility',
        dataPropertyName: 'location',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Position',
        dataPropertyName: 'role',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.Int,
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
        ],
      },
    ]
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Shift Management', active: true },
    ]);
  }

  ngOnInit() {    
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
        title: 'Range',
        prefixIcon: '',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Range,
        filterValue: '',
        filterValue1: '',
        filterOptions: [],
      },
      {
        title: 'Status',
        prefixIcon: 'ri-filter-3-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.statusList,
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
    this.priorityFilterList = [
      { label: 'All Priority', value: 'All' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
    ];
  }

  formatDateTime<T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) {
    return `
        <div class="whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${event[columnSchema.dataPropertyName]}</div>
          <div class="text-sm text-gray-500">${event?.time}</div>
        </div>`;
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<WorkerShiftManagementComponent, any[]>,
    event?: any
  ) {
    console.log(filterSchema, event);
  }

  onSortChange(
    tableSchema: TableSchema<WorkerShiftManagementComponent, any[]>,
    columnSchema?: TableColumns<WorkerShiftManagementComponent, any[]>
  ) {
    if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.None) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Ascending;      
    } else if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.Ascending) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Descending;     
    } else if(columnSchema) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.None;      
    }
  }

  onActionClick(
    tableSchema: TableSchema<WorkerShiftManagementComponent, any[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.shiftDetailsPanel = true;
    }
  }

  onChangePagination(
    paginationSchema: PaginationSchema<WorkerShiftManagementComponent, any[]>,
    pagination: { pageNumber: number; pageSize: number }
  ) {
    paginationSchema.pageNumber = pagination.pageNumber;
    paginationSchema.pageSize = pagination.pageSize;
  }
}
