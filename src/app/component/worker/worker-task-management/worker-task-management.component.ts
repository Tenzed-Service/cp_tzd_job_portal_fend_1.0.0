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
  selector: 'app-worker-task-management',
  templateUrl: './worker-task-management.component.html',
  styleUrls: ['./worker-task-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent, TableComponent, PaginationComponent],
})
export class WorkerTaskManagementComponent {
  statusList: DropdownItemModel[] = [];
  priorityFilterList: DropdownItemModel[] = [];
  filterSchema: FilterSchema<WorkerTaskManagementComponent, any> = {
    parentComponent: this,
    applyBtn: true,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent,
  };
  taskData = [
    {
      id: 1, title: "Update patient medication charts",
      description: "Review and update medication charts for all ICU patients",
      category: "Patient Care", 
      dueDate: "2025-05-15", 
      priority: "High",
      assignedTo: "Emily Johnson", 
      status: "In Progress"
    },
    {
      id: 2, title: "Schedule staff meetings",
      description: "Coordinate monthly staff meetings for all departments",
      category: "Administrative", 
      dueDate: "2025-05-20", 
      priority: "Medium",
      assignedTo: "Sarah Williams", 
      status: "Open"
    },
    {
      id: 3, title: "Complete infection control training",
      description: "Finish online infection control certification course",
      category: "Training", 
      dueDate: "2025-05-10", 
      priority: "High",
      assignedTo: "Michael Chen", 
      status: "Completed"
    },
    {
      id: 4, title: "Order medical supplies",
      description: "Restock essential medical supplies for emergency department",
      category: "Administrative", 
      dueDate: "2025-05-12", 
      priority: "High",
      assignedTo: "Robert Taylor", 
      status: "Overdue"
    },
    {
      id: 5, title: "Prepare patient discharge summaries",
      description: "Complete discharge paperwork for patients leaving tomorrow",
      category: "Patient Care", 
      dueDate: "2025-05-14", 
      priority: "Medium",
      assignedTo: "Emily Johnson", 
      status: "In Progress"
    },
    {
      id: 6, title: "Conduct equipment maintenance check",
      description: "Verify all medical equipment is functioning properly",
      category: "Maintenance", 
      dueDate: "2025-05-18", 
      priority: "Low",
      assignedTo: "John Technician", 
      status: "Open"
    },
    {
      id: 7, title: "Update staff rotation schedule",
      description: "Finalize next month's staff rotation for all departments",
      category: "Administrative", 
      dueDate: "2025-05-08", 
      priority: "Medium",
      assignedTo: "Sarah Williams", 
      status: "Completed"
    }
  ];
  tableSchema: TableSchema<WorkerTaskManagementComponent, any> = {
    parentComponent: this,
    data: this.taskData,
    showSerialNo: false,
    columns: [],
  };
  paginationSchema: PaginationSchema<WorkerTaskManagementComponent, any[]> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };
  taskDetailsModal: boolean = false;
  editTaskModal: boolean = false;
  deleteConfirmationModal: boolean = false;
  createTaskModal: boolean = false;

  constructor(
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService,
    private sanitizer: DomSanitizer
  ) {
    // Initialize dropdown data
    this.loadDropdownData();
    this.tableSchema.columns = [
      {
        title: 'Task',
        dataPropertyName: 'title',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatNameDescription,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Category',
        dataPropertyName: 'category',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Due Date',
        dataPropertyName: 'dueDate',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.Date,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Priority',
        dataPropertyName: 'priority',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Assigned To',
        dataPropertyName: 'assignedTo',
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
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Task Management', active: true },
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
        title: 'Status',
        prefixIcon: 'ri-filter-3-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.statusList,
      },
      {
        title: 'Priority',
        prefixIcon: 'ri-flag-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All',
        filterOptions: this.priorityFilterList,
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

  onFilterChangeEvent(
    filterSchema: FilterSchema<WorkerTaskManagementComponent, any[]>,
    event?: any
  ) {
    console.log(filterSchema, event);
  }

  onSortChange(
    tableSchema: TableSchema<WorkerTaskManagementComponent, any[]>,
    columnSchema?: TableColumns<WorkerTaskManagementComponent, any[]>
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
    tableSchema: TableSchema<WorkerTaskManagementComponent, any[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.taskDetailsModal = true;
    }
    if (actionType == 'edit') {
      tableSchema.parentComponent.editTaskModal = true;
    }
    if (actionType == 'delete') {
      tableSchema.parentComponent.deleteConfirmationModal = true;
    }
  }

  onChangePagination(
    paginationSchema: PaginationSchema<WorkerTaskManagementComponent, any[]>,
    pagination: { pageNumber: number; pageSize: number }
  ) {
    paginationSchema.pageNumber = pagination.pageNumber;
    paginationSchema.pageSize = pagination.pageSize;
  }
}
