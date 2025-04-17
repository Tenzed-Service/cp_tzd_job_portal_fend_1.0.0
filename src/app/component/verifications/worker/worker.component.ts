import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ddlModel } from '../employer/employer.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

export interface Worker {
  id: number;
  name: string;
  initials: string;
  initialsStyle: {
    background: string;
    textColor: string;
  };
  email: string;
  contact: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  status: {
    name: string;
    style: {
      background: string;
      textColor: string;
    }
  };
}

@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      PaginationComponent
    ]
})
export class WorkerComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 200;
  statusList: ddlModel[] = [];
  industries: ddlModel[] = [];
  calenders: ddlModel[] = [];
  workersList: Worker[] = [
    {
      id: 1,
      name: "Robert Johnson",
      initials: "RJ",
      initialsStyle: {
        background: "bg-blue-100",
        textColor: "text-blue-600"
      },
      email: "robert.johnson@example.com",
      contact: "+1 (415) 555-7890",
      location: {
        country: "USA",
        state: "California",
        city: "San Francisco"
      },
      status: {
        name: "Pending",
        style: {
          background: "bg-[#89dee2]/20",
          textColor: "text-[#2e4450]"
        }
      }
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      initials: "SM",
      initialsStyle: {
        background: "bg-green-100",
        textColor: "text-green-600"
      },
      email: "sarah.mitchell@example.com",
      contact: "+1 (212) 555-3456",
      location: {
        country: "USA",
        state: "New York",
        city: "New York City"
      },
      status: {
        name: "Approved",
        style: {
          background: "bg-[#16c2d5]/20",
          textColor: "text-[#10217d]"
        }
      }
    },
    {
      id: 3,
      name: "Daniel Thompson",
      initials: "DT",
      initialsStyle: {
        background: "bg-orange-100",
        textColor: "text-orange-600"
      },
      email: "daniel.thompson@example.com",
      contact: "+1 (312) 555-9876",
      location: {
        country: "USA",
        state: "Illinois",
        city: "Chicago"
      },
      status: {
        name: "Info Requested",
        style: {
          background: "bg-[#d7baad]/30",
          textColor: "text-[#527c88]"
        }
      }
    },
    {
      id: 4,
      name: "Emily Wilson",
      initials: "EW",
      initialsStyle: {
        background: "bg-purple-100",
        textColor: "text-purple-600"
      },
      email: "emily.wilson@example.com",
      contact: "+1 (617) 555-2345",
      location: {
        country: "USA",
        state: "Massachusetts",
        city: "Boston"
      },
      status: {
        name: "Rejected",
        style: {
          background: "bg-[#d7baad]/50",
          textColor: "text-[#2e4450]"
        }
      }
    },
    {
      id: 5,
      name: "Michael Brown",
      initials: "MB",
      initialsStyle: {
        background: "bg-indigo-100",
        textColor: "text-indigo-600"
      },
      email: "michael.brown@example.com",
      contact: "+1 (214) 555-6789",
      location: {
        country: "USA",
        state: "Texas",
        city: "Dallas"
      },
      status: {
        name: "Pending",
        style: {
          background: "bg-[#89dee2]/20",
          textColor: "text-[#2e4450]"
        }
      }
    },
    {
      id: 6,
      name: "Jennifer Anderson",
      initials: "JA",
      initialsStyle: {
        background: "bg-red-100",
        textColor: "text-red-600"
      },
      email: "jennifer.anderson@example.com",
      contact: "+1 (206) 555-4321",
      location: {
        country: "USA",
        state: "Washington",
        city: "Seattle"
      },
      status: {
        name: "Approved",
        style: {
          background: "bg-[#16c2d5]/20",
          textColor: "text-[#10217d]"
        }
      }
    },
    {
      id: 7,
      name: "Daniel Thompson",
      initials: "DT",
      initialsStyle: {
        background: "bg-orange-100",
        textColor: "text-orange-600"
      },
      email: "daniel.thompson@example.com",
      contact: "+1 (312) 555-9876",
      location: {
        country: "USA",
        state: "Illinois",
        city: "Chicago"
      },
      status: {
        name: "Info Requested",
        style: {
          background: "bg-[#d7baad]/30",
          textColor: "text-[#527c88]"
        }
      }
    },
    {
      id: 8,
      name: "Emily Wilson",
      initials: "EW",
      initialsStyle: {
        background: "bg-purple-100",
        textColor: "text-purple-600"
      },
      email: "emily.wilson@example.com",
      contact: "+1 (617) 555-2345",
      location: {
        country: "USA",
        state: "Massachusetts",
        city: "Boston"
      },
      status: {
        name: "Rejected",
        style: {
          background: "bg-[#d7baad]/50",
          textColor: "text-[#2e4450]"
        }
      }
    },
    {
      id: 9,
      name: "Michael Brown",
      initials: "MB",
      initialsStyle: {
        background: "bg-indigo-100",
        textColor: "text-indigo-600"
      },
      email: "michael.brown@example.com",
      contact: "+1 (214) 555-6789",
      location: {
        country: "USA",
        state: "Texas",
        city: "Dallas"
      },
      status: {
        name: "Pending",
        style: {
          background: "bg-[#89dee2]/20",
          textColor: "text-[#2e4450]"
        }
      }
    },
    {
      id: 10,
      name: "Jennifer Anderson",
      initials: "JA",
      initialsStyle: {
        background: "bg-red-100",
        textColor: "text-red-600"
      },
      email: "jennifer.anderson@example.com",
      contact: "+1 (206) 555-4321",
      location: {
        country: "USA",
        state: "Washington",
        city: "Seattle"
      },
      status: {
        name: "Approved",
        style: {
          background: "bg-[#16c2d5]/20",
          textColor: "text-[#10217d]"
        }
      }
    },
  ];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Verification' },
      { label: 'Worker', active: true },
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
    this.router.navigateByUrl(`/verification/worker/verification-details/${id}`);
  }
}
