import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { FiltersComponent } from '../../../shared/component/filters/filters.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { PaginationSchema } from '../../../shared/ui/pagination/pagination.component.models';
import { DropdownItemModel } from '../../../core/models/common/common.models';
import { FilterSchema } from '../../../shared/component/filters/filters.component.models';
import { AdvancedFilterSortDirectionEnum, TableColumnsDataTypeEnum, TableFilterTypeEnum, UserType } from '../../../core/enums/common.enum';
import { TableColumns, TableSchema } from '../../../shared/ui/table/table.component.models';
import { ColumnFormateService } from '../../../core/services/helper/column-formate.service';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../shared/ui/table/table.component';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent, TableComponent, PaginationComponent],
})
export class TimeSheetComponent {
  statusList: DropdownItemModel[] = [];
  workerList: DropdownItemModel[] = [];
  filterSchema: FilterSchema<TimeSheetComponent, any> = {
    parentComponent: this,
    applyBtn: false,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent,
  };
  timeSheetData = [
    {
      "date": "May 15, 2025",
      "time": "9:00 AM - 12:00 PM",
      "staffName": "James Wilson",
      "regularHours": 3.0,
      "overtimeHours": 0.0,
      "totalHours": 3.0,
      "status": "Submitted"
    },
    {
      "date": "May 15, 2025",
      "time": "1:00 PM - 3:00 PM",
      "staffName": "Dr. Emily Johnson",
      "regularHours": 2.0,
      "overtimeHours": 0.0,
      "totalHours": 2.0,
      "status": "Submitted"
    },
    {
      "date": "May 14, 2025",
      "time": "10:00 AM - 12:00 PM",
      "staffName": "Dr. Michael Chen",
      "regularHours": 2.0,
      "overtimeHours": 0.0,
      "totalHours": 2.0,
      "status": "Approved"
    },
    {
      "date": "May 14, 2025",
      "time": "1:00 PM - 3:00 PM",
      "staffName": "Sarah Williams",
      "regularHours": 2.0,
      "overtimeHours": 0.0,
      "totalHours": 2.0,
      "status": "Approved"
    },
    {
      "date": "May 13, 2025",
      "time": "9:00 AM - 12:00 PM",
      "staffName": "Dr. Amir Patel",
      "regularHours": 3.0,
      "overtimeHours": 0.0,
      "totalHours": 3.0,
      "status": "Approved"
    }
  ];
  tableSchema: TableSchema<TimeSheetComponent, any> = {
    parentComponent: this,
    data: this.timeSheetData,
    showSerialNo: false,
    columns: [],
  };
  paginationSchema: PaginationSchema<TimeSheetComponent, any[]> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  }; 
  timeEntryDetailsModal: boolean = false;
  currentUser:string = '';

  constructor(
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService,
  ) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Time Sheet', active: true },
    ]);
    this.singletonStoreService.selectedUserType.subscribe((user:string) => {
      this.currentUser = user;
    });
    // Initialize dropdown data
    this.loadDropdownData();
    this.tableSchema.columns = [
      {
        title: 'Date',
        dataPropertyName: 'date',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange:  this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Time',
        dataPropertyName: 'time',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange:  this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      
    ];
    if(this.currentUser == UserType.EMPLOYER) {
      this.tableSchema.columns.push(
        {
          title: 'Staff Name',
          dataPropertyName: 'staffName',
          sorting: true,
          dataType: TableColumnsDataTypeEnum.String,
          sortDirection: AdvancedFilterSortDirectionEnum.None,
          onFormatChange: this.columnFormateService.formatString,
          onSortChange: this.onSortChange,
        },
        {
          title: 'Regular Hours',
          dataPropertyName: 'regularHours',
          sorting: true,
          dataType: TableColumnsDataTypeEnum.Decimal,
          sortDirection: AdvancedFilterSortDirectionEnum.None,
          onFormatChange: this.columnFormateService.formatString,
          onSortChange: this.onSortChange,
        },
        {
          title: 'Overtime Hours',
          dataPropertyName: 'overtimeHours',
          sorting: true,
          dataType: TableColumnsDataTypeEnum.String,
          sortDirection: AdvancedFilterSortDirectionEnum.None,
          onFormatChange: this.columnFormateService.formatString,
          onSortChange: this.onSortChange,
        },
        {
          title: 'Total Hours',
          dataPropertyName: 'totalHours',
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
      );
    }
    if(this.currentUser == UserType.EMPLOYEE) {
      this.tableSchema.columns.push(
        {
          title: 'Regular Hours',
          dataPropertyName: 'regularHours',
          sorting: true,
          dataType: TableColumnsDataTypeEnum.Decimal,
          sortDirection: AdvancedFilterSortDirectionEnum.None,
          onFormatChange: this.columnFormateService.formatString,
          onSortChange: this.onSortChange,
        },
        {
          title: 'Overtime Hours',
          dataPropertyName: 'overtimeHours',
          sorting: true,
          dataType: TableColumnsDataTypeEnum.String,
          sortDirection: AdvancedFilterSortDirectionEnum.None,
          onFormatChange: this.columnFormateService.formatString,
          onSortChange: this.onSortChange,
        },
        {
          title: 'Total Hours',
          dataPropertyName: 'totalHours',
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
      );
    }
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
    if(this.currentUser == UserType.EMPLOYER) {
      this.filterSchema.filterItemConfig.push(
        {
          title: 'Workers',
          prefixIcon: 'ri-team-line',
          dataType: TableColumnsDataTypeEnum.String,
          filterType: TableFilterTypeEnum.Dropdown,
          filterValue: 'All',
          filterOptions: this.workerList,
        },
      );
    }
  }

  loadDropdownData() {
    // Add your API calls here to load dropdown data
    this.statusList = [
      { label: 'All Status', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Rejected', value: 'Rejected' },
    ];
    this.workerList = [
      { label: 'All Worker', value: 'All' },
      { label: 'Dr. Emily Johnson', value: 'Dr. Emily Johnson' },
      { label: 'Dr. Michael Chen', value: 'Dr. Michael Chen' },
      { label: 'Sarah Williams', value: 'Sarah Williams' },
      { label: 'Dr. Amir Patel', value: 'r. Amir Patel' },
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
    filterSchema: FilterSchema<TimeSheetComponent, any[]>,
    event?: any
  ) {
    console.log(filterSchema, event);
  }

  onSortChange(
    tableSchema: TableSchema<TimeSheetComponent, any[]>,
    columnSchema?: TableColumns<TimeSheetComponent, any[]>
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
    tableSchema: TableSchema<TimeSheetComponent, any[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.timeEntryDetailsModal = true;
    }
  }

  onChangePagination(
    paginationSchema: PaginationSchema<TimeSheetComponent, any[]>,
    pagination: { pageNumber: number; pageSize: number }
  ) {
    paginationSchema.pageNumber = pagination.pageNumber;
    paginationSchema.pageSize = pagination.pageSize;
  }
}
