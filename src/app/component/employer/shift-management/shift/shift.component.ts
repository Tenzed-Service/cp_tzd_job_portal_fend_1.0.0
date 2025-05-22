
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { CalendarComponent } from '../../../../shared/component/calendar/calendar.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { PaginationSchema } from '../../../../shared/ui/pagination/pagination.component.models';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { TableColumns, TableSchema } from '../../../../shared/ui/table/table.component.models';
import { ColumnFormateService } from '../../../../core/services/helper/column-formate.service';
import { AdvancedFilterSortDirectionEnum, TableColumnsDataTypeEnum, TableFilterTypeEnum } from '../../../../core/enums/common.enum';
import { FiltersComponent } from '../../../../shared/component/filters/filters.component';
import { FilterSchema } from '../../../../shared/component/filters/filters.component.models';
import { DeleteConfirmationComponent } from '../../../../shared/component/models/delete-confirmation/delete-confirmation.component';
import { DeleteModelSchema } from '../../../../shared/component/models/delete-confirmation/delete-confirmation.component.models';

@Component({
    selector: 'app-shift',
    templateUrl: './shift.component.html',
    styleUrls: ['./shift.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FiltersComponent,
      TableComponent,
      PaginationComponent,
      DeleteConfirmationComponent
    ]
})
export class ShiftComponent {

  shiftList:any[] = [
    {
      id: 1,
      shiftTitle: "Morning Shift - General Medicine",
      date: "2025-04-30 8:00 AM - 12:00 PM",
      location: "East Wing, Floor 2",
      staffAssigned: [{id:1,name:"Emily Johnson"}, {id:2,name:"Amir Patel"}],
      status: "Confirmed"
    },
    {
      id: 2,
      shiftTitle: "Morning Shift - Pediatrics",
      date: "2025-05-01 9:00 AM - 1:00 PM",
      location: "West Wing, Floor 3",
      staffAssigned: [{id:1,name:"Michael Chen"}, {id:2,name:"Rebecca Anderson"}],
      status: "Pending"
    },
    {
      id: 3,
      shiftTitle: "Night Shift - Emergency",
      date: "2025-05-02 7:00 PM - 7:00 AM",
      location: "Emergency Department",
      staffAssigned: [{id:1,name:"David Washington"}],
      status: "Confirmed"
    },
    {
      id: 4,
      shiftTitle: "Morning Shift - Dental Care",
      date: "2025-05-03 10:00 AM - 2:00 PM",
      location: "Dental Clinic, Floor 1",
      staffAssigned: [{id:1,name:"Sophia Martinez"}, {id:2,name:"Jennifer O'Connor"}],
      status: "Pending"
    },
    {
      id: 5,
      shiftTitle: "Morning Shift - General Medicine",
      date: "2025-04-30 8:00 AM - 12:00 PM",
      location: "East Wing, Floor 2",
      staffAssigned: [{id:1,name:"Emily Johnson"}, {id:2,name:"Amir Patel"}],
      status: "Confirmed"
    },
    {
      id: 6,
      shiftTitle: "Morning Shift - Pediatrics",
      date: "2025-05-01 9:00 AM - 1:00 PM",
      location: "West Wing, Floor 3",
      staffAssigned: [{id:1,name:"Michael Chen"}, {id:2,name:"Rebecca Anderson"}],
      status: "Pending"
    },
    {
      id: 7,
      shiftTitle: "Night Shift - Emergency",
      date: "2025-05-02 7:00 PM - 7:00 AM",
      location: "Emergency Department",
      staffAssigned: [{id:1,name:"David Washington"}],
      status: "Confirmed"
    },
    {
      id: 8,
      shiftTitle: "Morning Shift - Dental Care",
      date: "2025-05-03 10:00 AM - 2:00 PM",
      location: "Dental Clinic, Floor 1",
      staffAssigned: [{id:1,name:"Sophia Martinez"}, {id:2,name:"Jennifer O'Connor"}],
      status: "Pending"
    }
  ];

  filterSchema:FilterSchema<ShiftComponent,any[]> = {
    parentComponent: this,
    applyBtn: false,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent
  };

  tableSchema: TableSchema<ShiftComponent,any[]> = {
    parentComponent: this,
    data: this.shiftList,
    showSerialNo: true,
    columns: [],
  };

  paginationSchema:PaginationSchema<ShiftComponent,any[]> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };
  statusList: { label: string; value: string; }[] = [];
  department: { label: string; value: string; }[] = [];
  deleteModelSchema: DeleteModelSchema<ShiftComponent,any> = {
    parentComponent: this,
    title: 'Delete Shift',
    message: 'Are you sure you want to delete this shift? This action cannot be undone.',
    cancel: this.delete,
    confirm: this.delete,
  };
  deleteConfirmationModal: boolean = false;
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Shift Management' },
      { label: 'Shifts', active: true },
    ]);
    this.tableSchema.columns = [
      {
        title: 'Shift Title',
        dataPropertyName: 'shiftTitle',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatAvatarWithName,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Date & Time',
        dataPropertyName: 'date',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.DateTime,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Location',
        dataPropertyName: 'location',
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
        title: 'Actions',
        dataPropertyName: 'actions',
        actions: [
          {
            tooltip: 'Edit',
            actionType: 'edit',
            class: 'text-[#16c2d5] hover:text-[#16c2d5]/80',
            iconClass: 'ri-edit-line',
            onActionClick: this.onActionClick,
          },
          {
            tooltip: 'Delete',
            actionType: 'delete',
            class: 'text-red-500 hover:text-red-500/80',
            iconClass: 'ri-delete-bin-line',
            onActionClick: this.onActionClick,
          },
        ],
      },
    ]     
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
        title: 'Industries',
        prefixIcon: 'ri-building-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.department,
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
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'Rejected', value: 'Rejected' },
    ];
    this.department = [
      { label: 'All Department', value: 'All' },
      { label: 'General Medicine', value: 'General Medicine' },
      { label: 'Pediatrics', value: 'Pediatrics' },
      { label: 'Emergency', value: 'Emergency' },
      { label: 'Dental', value: 'Dental' },
    ];
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<ShiftComponent,any[]>,
    event?: any
  ) {
    console.log(filterSchema,event);
  }

  onChangePagination(
    paginationSchema: PaginationSchema<ShiftComponent, any[]>,
    pagination:{pageNumber: number,pageSize: number}
  ) {
    paginationSchema.pageNumber = pagination.pageNumber; 
    paginationSchema.pageSize = pagination.pageSize; 
  }

  onActionClick(
    tableSchema: TableSchema<ShiftComponent, any[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'edit') {
      tableSchema.parentComponent.createShift(`edit/${event.id}`);
    }
    if (actionType == 'delete') {
      tableSchema.parentComponent.deleteConfirmationModal = true
    }
  }

  delete(tableSchema: DeleteModelSchema<ShiftComponent, any[]>,actionType: string,){
    tableSchema.parentComponent.deleteConfirmationModal = false;
  }

  onSortChange(
    tableSchema: TableSchema<ShiftComponent, any[]>,
    columnSchema?: TableColumns<ShiftComponent, any[]>
  ) {
    if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.None) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Ascending;      
    } else if (columnSchema?.sortDirection == AdvancedFilterSortDirectionEnum.Ascending) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.Descending;     
    } else if(columnSchema) {
      columnSchema.sortDirection = AdvancedFilterSortDirectionEnum.None;      
    }
  }

  createShift(path:string){
    this.router.navigateByUrl(`/shift-management/shifts/${path}`);
  }
}
