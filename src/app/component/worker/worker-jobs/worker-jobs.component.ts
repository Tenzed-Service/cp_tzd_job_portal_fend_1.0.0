import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { TabsComponent } from '../../../shared/component/tabs/tabs.component';

@Component({
    selector: 'app-worker-jobs',
    templateUrl: './worker-jobs.component.html',
    styleUrls: ['./worker-jobs.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      TabsComponent      
    ]
})
export class WorkerJobsComponent {
  
  activeTab: number = 1;
  tabList: any[] = [
    {
      id: 1,
      name: 'All',
      count: 168,
      icon: 'ri-apps-line',
    },
    {
      id: 2,
      name: 'Applied',
      count: 42,
      icon: 'ri-file-list-line',
    },
    {
      id: 3,
      name: 'Rejected',
      count: 32,
      icon: 'ri-close-line',
    },
    {
      id: 4,
      name: 'Interview Invitation',
      count: 56,
      icon: 'ri-eye-line',
    },
    {
      id: 5,
      name: 'Interview Scheduled',
      count: 38,
      icon: 'ri-discuss-line',
    },
    {
      id: 6,
      name: 'Approved',
      count: 28,
      icon: 'ri-check-double-line',
    },
    
  ];
  jobList = [
    {
      id: 1,
      status: "Applied",
      title: "Registered Nurse",
      department: "St. Mary's Hospital",
      location: "Los Angeles, CA",
      icon: "ri-hospital-line",
      iconBgColor: "bg-primary/5",
      iconTextColor: "text-primary",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$120k-$150k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Applied", bgColor: "bg-emerald-50", textColor: "text-emerald-600" }
      ],
      details: {
        applicants: "25-50 Applicants",
        posted: "Posted 2 days ago"
      },
      bookmark: {
        icon: "ri-bookmark-fill",
        isBookmarked: true,
        textColor: "text-primary",
        hoverTextColor: "text-primary/80"
      },
    },
    {
      id: 2,
      status: "Interview Invitation",
      title: "Physiotherapist",
      department: "Wellness Physio Clinic",
      location: "San Francisco, CA",
      icon: "ri-mental-health-line",
      iconBgColor: "bg-blue-50",
      iconTextColor: "text-blue-500",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$90k-$120k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Interview Invitation", bgColor: "bg-amber-50", textColor: "text-amber-600" }
      ],
      details: {
        applicants: "10-20 Applicants",
        posted: "Posted 5 days ago"
      },
      bookmark: {
        icon: "ri-bookmark-line",
        isBookmarked: false,
        textColor: "text-gray-400",
        hoverTextColor: "text-primary"
      },
    },
    {
      id: 3,
      status: "Rejected",
      title: "General Physician",
      department: "Sunrise Medical Center",
      location: "San Diego, CA",
      icon: "ri-stethoscope-line",
      iconBgColor: "bg-gray-100",
      iconTextColor: "text-gray-900",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$140k-$180k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Rejected", bgColor: "bg-red-50", textColor: "text-red-600" }
      ],
      details: {
        applicants: "15-30 Applicants",
        posted: "Posted 3 days ago"
      },
      bookmark: {
        icon: "ri-bookmark-line",
        isBookmarked: false,
        textColor: "text-gray-400",
        hoverTextColor: "text-primary"
      },
    },
    {
      id: 4,
      status: "Approved",
      title: "Clinical Pharmacist",
      department: "HealthCare Pharmacy",
      location: "Portland, OR",
      icon: "ri-capsule-line",
      iconBgColor: "bg-orange-50",
      iconTextColor: "text-orange-500",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$130k-$160k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Approved", bgColor: "bg-emerald-50", textColor: "text-emerald-600" }
      ],
      details: {
        applicants: "30-45 Applicants",
        posted: "Posted 1 week ago"
      },
      bookmark: {
        icon: "ri-bookmark-line",
        isBookmarked: false,
        textColor: "text-gray-400",
        hoverTextColor: "text-primary"
      },
    },
    {
      id: 5,
      status: "Interview Scheduled",
      title: "Dental Assistant",
      department: "Bright Smile Dental Clinic",
      location: "Denver, CO",
      icon: "ri-nurse-line",
      iconBgColor: "bg-red-50",
      iconTextColor: "text-red-600",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$150k-$200k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Interview Scheduled", bgColor: "bg-amber-50", textColor: "text-amber-600" }
      ],
      details: {
        applicants: "20-35 Applicants",
        posted: "Posted 4 days ago"
      },
      bookmark: {
        icon: "ri-bookmark-line",
        isBookmarked: false,
        textColor: "text-gray-400",
        hoverTextColor: "text-primary"
      },
    },
    {
      id: 6,
      status: "Rejected",
      title: "Long-term Care Nurse",
      department: "Golden Years Care Home",
      location: "Phoenix, AZ",
      icon: "ri-home-heart-line",
      iconBgColor: "bg-blue-50",
      iconTextColor: "text-blue-600",
      tags: [
        { label: "Full Time", icon: "ri-time-line", bgColor: "bg-primary/5", textColor: "text-primary" },
        { label: "$160k-$220k", icon: "ri-money-dollar-circle-line", bgColor: "bg-blue-50", textColor: "text-blue-600" },
        { label: "Rejected", bgColor: "bg-red-50", textColor: "text-red-600" }
      ],
      details: {
        applicants: "40-60 Applicants",
        posted: "Posted 6 days ago"
      },
      bookmark: {
        icon: "ri-bookmark-line",
        isBookmarked: false,
        textColor: "text-gray-400",
        hoverTextColor: "text-primary"
      },
    }
  ];
  allJobList = [...this.jobList];
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Jobs', active: true },
    ]);     
  }

  switchTab(tabId: any) {
    switch (tabId) {
      case 1:
        this.jobList = [...this.allJobList];
        break;
      case 2:
        this.jobList = this.allJobList.filter((job) => job.status === 'Applied');
        break;
      case 3:
        this.jobList = this.allJobList.filter((job) => job.status === 'Rejected');
        break;
      case 4:
        this.jobList = this.allJobList.filter((job) => job.status === 'Interview Invitation');
        break;
      case 5:
        this.jobList = this.allJobList.filter((job) => job.status === 'Interview Scheduled');
        break;
      case 6:
        this.jobList = this.allJobList.filter((job) => job.status === 'Approved');
        break;
      default:
        this.jobList = [...this.allJobList];
        break;
    }
    
    this.activeTab = tabId;
  }  

  jobDetails(route: string) {
    this.router.navigateByUrl(route);
  }
}
