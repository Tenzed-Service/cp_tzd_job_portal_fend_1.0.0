import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { JobModel } from '../../../core/models/api/job.model';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule, PaginationComponent],
})
export class JobsComponent {
  currentPage: number = 1;
  totalItems: number = 100;
  itemsPerPage: number = 10;
  activeTab: number = 1;
  statusList = [
    { name: 'All Status', value: 'All' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Approved', value: 'Approved' },
    { name: 'Rejected', value: 'Rejected' },
  ];
  jobList: JobModel[] = [
    {
      id: 1,
      title: 'General Physician',
      status: 'Active',
      statusColor: 'green-500',
      department: 'Clinic Department',
      location: 'San Francisco, CA',
      icon: 'ri-heart-pulse-line',
      tags: [
        {
          label: '$120K - $150K',
          icon: 'ri-money-dollar-circle-line',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        // {
        //   label: 'Full-time',
        //   icon: 'ri-time-line',
        //   bgColor: 'bg-purple-50',
        //   textColor: 'text-purple-700',
        // },
        {
          label: 'Senior Level',
          icon: 'ri-medal-line',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      details: {
        startDate: 'Immediate',
        experience: '5+ years',
        applicants: '24 candidates',
        timeLeft: '27 days',
      },
      applicationProgress: {
        current: 24,
        total: 50,
        percentage: 48,
      },
      applicants: [
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20asian%20woman%20smiling%20at%20camera&width=32&height=32&seq=1&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20aged%20caucasian%20man%20with%20glasses&width=32&height=32&seq=2&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20african%20american%20woman&width=32&height=32&seq=3&orientation=squarish',
        },
        {
          additional: '+21',
        },
      ],
    },
    {
      id: 2,
      title: 'Medical Assistant',
      status: 'Active',
      statusColor: 'green-500',
      department: 'Clinic Department',
      location: 'New York, NY',
      icon: 'ri-nurse-line',
      tags: [
        {
          label: '$90K - $120K',
          icon: 'ri-money-dollar-circle-line',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        // {
        //   label: 'Full-time',
        //   icon: 'ri-time-line',
        //   bgColor: 'bg-purple-50',
        //   textColor: 'text-purple-700',
        // },
        {
          label: 'Mid Level',
          icon: 'ri-medal-line',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      details: {
        startDate: 'May 2025',
        experience: '3+ years',
        applicants: '18 candidates',
        timeLeft: '24 days',
      },
      applicationProgress: {
        current: 18,
        total: 50,
        percentage: 36,
      },
      applicants: [
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20woman%20with%20confident%20smile&width=32&height=32&seq=4&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20aged%20man%20in%20business%20attire&width=32&height=32&seq=5&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20hispanic%20woman%20in%20office%20setting&width=32&height=32&seq=6&orientation=squarish',
        },
        {
          additional: '+15',
        },
      ],
    },
    {
      id: 3,
      title: 'Dental Nurse',
      status: 'Closed',
      statusColor: 'red-500',
      department: 'Dental Department',
      location: 'Boston, MA',
      icon: 'ri-mental-health-line',
      tags: [
        {
          label: '$130K - $160K',
          icon: 'ri-money-dollar-circle-line',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        // {
        //   label: 'Full-time',
        //   icon: 'ri-time-line',
        //   bgColor: 'bg-purple-50',
        //   textColor: 'text-purple-700',
        // },
        {
          label: 'Senior Level',
          icon: 'ri-medal-line',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      details: {
        startDate: 'June 2025',
        experience: '7+ years',
        applicants: '32 candidates',
        status: 'Position filled',
      },
      applicationProgress: {
        current: 32,
        total: 50,
        percentage: 64,
      },
      applicants: [
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20asian%20man%20in%20tech%20industry&width=32&height=32&seq=7&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20aged%20woman%20with%20glasses&width=32&height=32&seq=8&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20professional%20in%20data%20science&width=32&height=32&seq=9&orientation=squarish',
        },
        {
          additional: '+29',
        },
      ],
    },
    {
      id: 4,
      title: 'Healthcare Assistant',
      status: 'Active',
      statusColor: 'green-500',
      department: 'Pharmacy Department',
      location: 'Los Angeles, CA',
      icon: 'ri-medicine-bottle-line',
      tags: [
        {
          label: '$85K - $110K',
          icon: 'ri-money-dollar-circle-line',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        // {
        //   label: 'Full-time',
        //   icon: 'ri-time-line',
        //   bgColor: 'bg-purple-50',
        //   textColor: 'text-purple-700',
        // },
        {
          label: 'Mid-Senior Level',
          icon: 'ri-medal-line',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      details: {
        startDate: 'Immediate',
        experience: '4+ years',
        applicants: '15 candidates',
        timeLeft: '29 days',
      },
      applicationProgress: {
        current: 15,
        total: 50,
        percentage: 30,
      },
      applicants: [
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20creative%20designer%20in%20modern%20office&width=32&height=32&seq=10&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20UX%20designer%20with%20artistic%20background&width=32&height=32&seq=11&orientation=squarish',
        },
        {
          avatar:
            'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20UI%20designer%20in%20tech%20company&width=32&height=32&seq=12&orientation=squarish',
        },
        {
          additional: '+12',
        },
      ],
    },
  ];
  allJobList: JobModel[] = [...this.jobList];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Jobs', active: true },
    ]);
  }

  switchTab(tabId: number) {
    switch (tabId) {
      case 1:
        this.jobList = [...this.allJobList];
        break;
      case 2:
        this.jobList = this.allJobList.filter((job) => job.status === 'Active');
        break;
      case 3:
        this.jobList = this.allJobList.filter((job) => job.status === 'Closed');
        break;
      default:
        this.jobList = [...this.allJobList];
        break;
    }
    
    this.activeTab = tabId;
  }

  onChangePagination(page: number) {
    this.currentPage = page;
  }

  openForm(route: string) {
    this.router.navigateByUrl(route);
  }
}
