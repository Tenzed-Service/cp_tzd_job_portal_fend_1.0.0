import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { FilterSchema } from '../../../shared/component/filters/filters.component.models';
import { TableColumns, TableSchema } from '../../../shared/ui/table/table.component.models';
import { PaginationSchema } from '../../../shared/ui/pagination/pagination.component.models';
import { AdvancedFilterSortDirectionEnum, TableColumnsDataTypeEnum, TableFilterTypeEnum } from '../../../core/enums/common.enum';
import { ColumnFormateService } from '../../../core/services/helper/column-formate.service';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { FiltersComponent } from '../../../shared/component/filters/filters.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { DropdownItemModel } from '../../../core/models/common/common.models';

@Component({
  selector: 'app-job-grid',
  templateUrl: './job-grid.component.html',
  styleUrls: ['./job-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    TableComponent,
    PaginationComponent
  ],
})
export class JobGridComponent {
  statusList: DropdownItemModel[] = [];
  categoryList: DropdownItemModel[] = [];
  locationList: DropdownItemModel[] = [];
  jobList = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      department: "Hospital",
      location: "San Francisco, CA",
      status: "Active",
      postedDate: "Apr 15, 2025",
      applicants: 12,
    },
    {
      id: 2,
      title: "Marketing Specialist",
      company: "Global Creatives",
      department: "Clinic",
      location: "Remote",
      status: "Expiring Soon",
      postedDate: "Apr 5, 2025",
      applicants: 8,
    },
    {
      id: 3,
      title: "Registered Nurse",
      company: "MediCare Hospital",
      department: "Hospital",
      location: "Chicago, IL",
      status: "Active",
      postedDate: "Apr 10, 2025",
      applicants: 15,
    },
    {
      id: 4,
      title: "Project Manager",
      company: "Construction Solutions",
      department: "Dental",
      location: "Boston, MA",
      status: "Draft",
      postedDate: "-",
      applicants: 0,
    },
    {
      id: 5,
      title: "Financial Analyst",
      company: "Global Finance",
      department: "Pharmacy",
      location: "New York, NY",
      status: "Active",
      postedDate: "Apr 18, 2025",
      applicants: 7,
    },
    {
      id: 6,
      title: "Elementary Teacher",
      company: "Bright Start Academy",
      department: "Long Term Care",
      location: "Austin, TX",
      status: "Closed",
      postedDate: "Mar 25, 2025",
      applicants: 21,
    }
  ];
  filterSchema:FilterSchema<JobGridComponent,any> = {
    parentComponent: this,
    applyBtn: true,
    resetBtn: true,
    filterItemConfig: [],
    onFilterChange: this.onFilterChangeEvent
  };
  tableSchema: TableSchema<JobGridComponent, any> = {
    parentComponent: this,
    data: this.jobList,
    showSerialNo: true,
    columns: [],
  };
  paginationSchema:PaginationSchema<JobGridComponent, any> = {
    parentComponent: this,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 100,
    maxVisiblePages: 5,
    onPaginationChange: this.onChangePagination,
  };

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService
  ) {
    this.tableSchema.columns = [
      {
        title: 'Job',
        dataPropertyName: 'title',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatAvatarWithNameSubName,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Department',
        dataPropertyName: 'department',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
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
        title: 'Posted Date',
        dataPropertyName: 'postedDate',
        sorting: true,
        dataType: TableColumnsDataTypeEnum.String,
        sortDirection: AdvancedFilterSortDirectionEnum.None,
        onFormatChange: this.columnFormateService.formatString,
        onSortChange: this.onSortChange,
      },
      {
        title: 'Applicants',
        dataPropertyName: 'applicants',
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
      { label: 'Jobs', active: true },
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
        title: 'Category',
        prefixIcon: 'ri-menu-search-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All Categories',
        filterOptions: this.categoryList,
      },      
      {
        title: 'Location',
        prefixIcon: 'ri-map-pin-line',
        dataType: TableColumnsDataTypeEnum.String,
        filterType: TableFilterTypeEnum.Dropdown,
        filterValue: 'All Locations',
        filterOptions: this.locationList,
      },
    ];
  }

  loadDropdownData() {
    // Add your API calls here to load dropdown data
    this.statusList = [
      { label: 'All Status', value: 'All' },
      { label: 'Active', value: 'Active' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Closed', value: 'Closed' },
      { label: 'Expired', value: 'Expired' },
    ];
    this.categoryList = [
      { label: 'All Categories', value: 'All Categories' },
      { label: 'Healthcare', value: 'Healthcare' },
      { label: 'IT & Technology', value: 'IT & Technology' },
      { label: 'Construction', value: 'Construction' },
      { label: 'Education', value: 'Education' },
      { label: 'Finance', value: 'Finance' },
      { label: 'Manufacturing', value: 'Manufacturing' },
    ];
    this.locationList = [
      { label: 'All Locations', value: 'All Locations' },
      { label: 'New York', value: 'New York' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'Chicago', value: 'Chicago' },
      { label: 'Houston', value: 'Houston' },
      { label: 'Philadelphia', value: 'Philadelphia' }, 
    ]
  }

  onActionClick(
    tableSchema: TableSchema<JobGridComponent, any[]>,
    actionType: string,
    event?: any
  ) {    
    if (actionType == 'view') {
      tableSchema.parentComponent.jobDetails(event.id);
    }
  }

  onSortChange(
    tableSchema: TableSchema<JobGridComponent, any[]>,
    columnSchema?: TableColumns<JobGridComponent, any[]>
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
    paginationSchema: PaginationSchema<JobGridComponent, any[]>,
    pagination:{pageNumber: number,pageSize: number}
  ) {
    paginationSchema.pageNumber = pagination.pageNumber; 
    paginationSchema.pageSize = pagination.pageSize; 
  }

  onFilterChangeEvent(
    filterSchema: FilterSchema<JobGridComponent, any[]>,
    event?: any
  ) {
    console.log(filterSchema,event);
  }

  jobDetails(id: number) {
    this.router.navigateByUrl(`job-grid/job-details/${id}`);
  }
}
