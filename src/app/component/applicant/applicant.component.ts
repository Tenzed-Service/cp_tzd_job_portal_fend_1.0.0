import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../core/services/helper/singleton-store.service';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss'],
  standalone: true,
  imports: [CommonModule, PaginationComponent],
})
export class ApplicantComponent {
  currentPage: number = 1;
  totalItems: number = 100;
  itemsPerPage: number = 10;
  activeTab: number = 1;
  applicantList: any[] = [
    {
      id: 1,
      name: 'Emily Chen',
      status: 'Interviewed',
      statusColor: 'bg-yellow-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520asian%2520woman%2520with%2520confident%2520expression%2520in%2520business%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=1&orientation=squarish',
      jobTitle: 'General Physician',
      location: 'San Francisco, CA',
      applicationDetails: {
        appliedOn: 'Apr 12, 2025',
        experience: '6+ years',
      },
      skills: [
        {
          label: 'Cardiology',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Patient Care',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'Emergency Medicine',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'Excellent communication skills. Performed well in the first interview. Scheduled for second round with department head.',
      lastUpdated: 'Apr 15, 2025',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      status: 'New',
      statusColor: 'bg-green-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520aged%2520african%2520american%2520man%2520with%2520glasses%2520in%2520formal%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=2&orientation=squarish',
      jobTitle: 'Medical Assistant',
      location: 'New York, NY',
      applicationDetails: {
        appliedOn: 'Apr 16, 2025',
        experience: '4+ years',
      },
      skills: [
        {
          label: 'Patient Assessment',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Medical Records',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'Phlebotomy',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'New application received. Resume shows strong experience in hospital settings. Needs initial screening.',
      lastUpdated: 'Apr 16, 2025',
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      status: 'Reviewed',
      statusColor: 'bg-blue-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520hispanic%2520woman%2520with%2520long%2520dark%2520hair%2520in%2520business%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=3&orientation=squarish',
      jobTitle: 'Dental Nurse',
      location: 'Boston, MA',
      applicationDetails: {
        appliedOn: 'Apr 10, 2025',
        experience: '8+ years',
      },
      skills: [
        {
          label: 'Dental Procedures',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Sterilization',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'X-ray Imaging',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'Resume reviewed. Strong candidate with extensive experience. Recommended for interview with dental department head.',
      lastUpdated: 'Apr 14, 2025',
    },
    {
      id: 4,
      name: 'Alexander Mitchell',
      status: 'Approved',
      statusColor: 'bg-purple-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520caucasian%2520man%2520with%2520short%2520brown%2520hair%2520in%2520business%2520casual%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=4&orientation=squarish',
      jobTitle: 'Healthcare Assistant',
      location: 'Los Angeles, CA',
      applicationDetails: {
        appliedOn: 'Apr 8, 2025',
        experience: '5+ years',
      },
      skills: [
        {
          label: 'Medication Administration',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Vital Signs',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'Patient Support',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'Completed all interview rounds successfully. Excellent references. Shortlisted for final selection. Awaiting background check.',
      lastUpdated: 'Apr 15, 2025',
    },
    {
      id: 5,
      name: 'Priya Sharma',
      status: 'Rejected',
      statusColor: 'bg-red-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520aged%2520indian%2520woman%2520with%2520professional%2520appearance%2520in%2520business%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=5&orientation=squarish',
      jobTitle: 'Medical Assistant',
      location: 'Chicago, IL',
      applicationDetails: {
        appliedOn: 'Apr 5, 2025',
        experience: '2+ years',
      },
      skills: [
        {
          label: 'Medical Records',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Basic Care',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'Administration',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'Does not meet minimum experience requirements for the position. Rejection email sent with feedback.',
      lastUpdated: 'Apr 11, 2025',
    },
    {
      id: 6,
      name: 'David Kim',
      status: 'Reviewed',
      statusColor: 'bg-blue-500',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520asian%2520man%2520with%2520glasses%2520in%2520business%2520casual%2520attire%2520on%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=100&height=100&seq=6&orientation=squarish',
      jobTitle: 'General Physician',
      location: 'Seattle, WA',
      applicationDetails: {
        appliedOn: 'Apr 14, 2025',
        experience: '7+ years',
      },
      skills: [
        {
          label: 'Internal Medicine',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
        },
        {
          label: 'Diagnosis',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
        },
        {
          label: 'Patient Management',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
        },
      ],
      notes:
        'Strong candidate with excellent qualifications. Currently scheduling initial interview with HR department.',
      lastUpdated: 'Apr 16, 2025',
    },
  ];
  allApplicantList: any[] = [...this.applicantList];
  tabList: any[] = [
    {
      id: 1,
      name: 'All',
      count: 168,
      icon: 'ri-apps-line',
    },
    {
      id: 2,
      name: 'New',
      count: 42,
      icon: 'ri-file-list-line',
    },
    {
      id: 3,
      name: 'Reviewed',
      count: 56,
      icon: 'ri-eye-line',
    },
    {
      id: 4,
      name: 'Interviewed',
      count: 38,
      icon: 'ri-discuss-line',
    },
    {
      id: 5,
      name: 'Approved',
      count: 28,
      icon: 'ri-check-double-line',
    },
    {
      id: 6,
      name: 'Rejected',
      count: 32,
      icon: 'ri-close-line',
    },
  ];
  openInterviewSchedulingModal:boolean = false;
  openRejectConfirmationModal:boolean = false;

  constructor(private singletonStoreService: SingletonStoreService) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Applicant', active: true },
    ]);
  }

  switchTab(tabId: number) {
    switch (tabId) {
      case 1:
        this.applicantList = [...this.allApplicantList];
        break;
      case 2:
        this.applicantList = this.allApplicantList.filter(
          (applicant) => applicant.status === 'New'
        );
        break;
      case 3:
        this.applicantList = this.allApplicantList.filter(
          (applicant) => applicant.status === 'Reviewed'
        );
        break;
      case 4:
        this.applicantList = this.allApplicantList.filter(
          (applicant) => applicant.status === 'Interviewed'
        );
        break;
      case 5:
        this.applicantList = this.allApplicantList.filter(
          (applicant) => applicant.status === 'Approved'
        );
        break;
      case 6:
        this.applicantList = this.allApplicantList.filter(
          (applicant) => applicant.status === 'Rejected'
        );
        break;
      default:
        this.applicantList = [...this.allApplicantList];
        break;
    }

    this.activeTab = tabId;
  }

  onChangePagination(page: number) {
    this.currentPage = page;
  }
}
