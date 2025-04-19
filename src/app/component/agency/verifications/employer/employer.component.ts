import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';

export interface ddlModel {
  name:string,
  value:string
}

export interface EmployerDetail {
  id: number;
  name: string;
  email: string;
  initials: string;
  initialsClass: string;
  industry: string;
  submittedDate: string;
  status: {
    name: string;
    class: string;
  };
  documents: {
    count: number;
    files: Array<{
      name: string;
      type: string;
      size: string;
    }>;
  };
  lastUpdated: string;
  actions: {
    canApprove: boolean;
    canReject: boolean;
    canRequestInfo: boolean;
    canViewHistory: boolean;
  };
}

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent
  ]
})
export class EmployerComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 200;
  statusList: ddlModel[] = [];
  industries: ddlModel[] = [];
  calenders: ddlModel[] = [];
  employerList: EmployerDetail[] = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      initials: 'TC',
      initialsClass: 'bg-blue-100 text-blue-600',
      industry: 'IT & Technology',
      submittedDate: 'Apr 10, 2025',
      status: {
        name: 'Pending',
        class: 'bg-[#89dee2]/20 text-[#2e4450]'
      },
      documents: {
        count: 5,
        files: [
          { name: 'Business_Registration.pdf', type: 'PDF', size: '2.3 MB' },
          // ... other files
        ]
      },
      lastUpdated: '2 hours ago',
      actions: {
        canApprove: true,
        canReject: true,
        canRequestInfo: true,
        canViewHistory: false
      }
    },
    {
      id: 2,
      name: 'Memorial Healthcare',
      email: 'hr@memorialhc.org',
      initials: 'MH',
      initialsClass: 'bg-green-100 text-green-600',
      industry: 'Healthcare',
      submittedDate: 'Apr 8, 2025',
      status: {
        name: 'Approved',
        class: 'bg-[#16c2d5]/20 text-[#10217d]'
      },
      documents: {
        count: 7,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '1 day ago',
      actions: {
        canApprove: false,
        canReject: false,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
    {
      id: 3,
      name: 'BuildRight Construction',
      email: 'info@buildright.com',
      initials: 'BC',
      initialsClass: 'bg-orange-100 text-orange-600',
      industry: 'Construction',
      submittedDate: 'Apr 7, 2025',
      status: {
        name: 'Info Requested',
        class: 'bg-[#d7baad]/30 text-[#527c88]'
      },
      documents: {
        count: 4,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '2 days ago',
      actions: {
        canApprove: true,
        canReject: true,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
    {
      id: 4,
      name: 'Global Education Institute',
      email: 'admin@globaledu.edu',
      initials: 'GE',
      initialsClass: 'bg-purple-100 text-purple-600',
      industry: 'Education',
      submittedDate: 'Apr 5, 2025',
      status: {
        name: 'Rejected',
        class: 'bg-[#d7baad]/50 text-[#2e4450]'
      },
      documents: {
        count: 3,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '4 days ago',
      actions: {
        canApprove: false,
        canReject: false,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
    {
      id: 5,
      name: 'Financial Services Group',
      email: 'contact@fsgroup.com',
      initials: 'FS',
      initialsClass: 'bg-indigo-100 text-indigo-600',
      industry: 'Finance',
      submittedDate: 'Apr 4, 2025',
      status: {
        name: 'Pending',
        class: 'bg-[#89dee2]/20 text-[#2e4450]'
      },
      documents: {
        count: 6,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '5 days ago',
      actions: {
        canApprove: true,
        canReject: true,
        canRequestInfo: true,
        canViewHistory: false
      }
    },
    {
      id: 6,
      name: 'Advanced Manufacturing Ltd',
      email: 'info@advmfg.com',
      initials: 'AM',
      initialsClass: 'bg-red-100 text-red-600',
      industry: 'Manufacturing',
      submittedDate: 'Apr 3, 2025',
      status: {
        name: 'Approved',
        class: 'bg-[#16c2d5]/20 text-[#10217d]'
      },
      documents: {
        count: 5,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '6 days ago',
      actions: {
        canApprove: false,
        canReject: false,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
    {
      id: 7,
      name: 'BuildRight Construction',
      email: 'info@buildright.com',
      initials: 'BC',
      initialsClass: 'bg-orange-100 text-orange-600',
      industry: 'Construction',
      submittedDate: 'Apr 7, 2025',
      status: {
        name: 'Info Requested',
        class: 'bg-[#d7baad]/30 text-[#527c88]'
      },
      documents: {
        count: 4,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '2 days ago',
      actions: {
        canApprove: true,
        canReject: true,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
    {
      id: 8,
      name: 'Global Education Institute',
      email: 'admin@globaledu.edu',
      initials: 'GE',
      initialsClass: 'bg-purple-100 text-purple-600',
      industry: 'Education',
      submittedDate: 'Apr 5, 2025',
      status: {
        name: 'Rejected',
        class: 'bg-[#d7baad]/50 text-[#2e4450]'
      },
      documents: {
        count: 3,
        files: [
          // Add actual files if needed
        ]
      },
      lastUpdated: '4 days ago',
      actions: {
        canApprove: false,
        canReject: false,
        canRequestInfo: false,
        canViewHistory: true
      }
    },
  ];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Verification' },
      { label: 'Employer', active: true },
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

  openDetails(id: number) {
    // Handle opening details for the given ID
    this.router.navigateByUrl(`/verification/employer/verification-details/${id}`);
  }

  
}
