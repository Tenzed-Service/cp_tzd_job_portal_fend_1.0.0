import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutMenuModel } from '../core/models/api/layout.model';
import { RouterModule } from '@angular/router';
import { SingletonStoreService } from '../core/services/helper/singleton-store.service';
import { LoaderComponent } from '../shared/ui/loader/loader.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterModule, LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  menuItems: LayoutMenuModel[] = [];
  isSidebarOpen: boolean = true;

  constructor(private singletonStoreService: SingletonStoreService) {
    this.singletonStoreService.sidebarOpen.subscribe((res: boolean) => {
      this.isSidebarOpen = res;
    });

    // Check initial window width
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 960) {
      this.singletonStoreService.sidebarOpen.next(false);
      this.singletonStoreService.isMobileView.next(true);
    }else{
      this.singletonStoreService.sidebarOpen.next(true);
      this.singletonStoreService.isMobileView.next(false);
    }
  }

  get isSmallScreen(): boolean {
    return window.innerWidth < 960;
  }

  ngOnInit(): void {
    this.singletonStoreService.selectedUserType.subscribe((res: string) => {
      switch (res) {
        case 'AGENCY':
          this.menuItems = [
            {
              name: 'Dashboard',
              icon: 'ri-dashboard-line',
              route: '/dashboard',
              children: [],
            },
            {
              name: 'Verification',
              icon: 'ri-shield-check-line',
              route: '/verification',
              expanded: false,
              children: [
                {
                  name: 'Employer',
                  icon: 'ri-building-line',
                  route: '/verification/employer',
                },
                {
                  name: 'Worker',
                  icon: 'ri-user-3-line',
                  route: '/verification/worker',
                },
              ],
            },
            {
              name: 'Jobs',
              icon: 'ri-briefcase-line',
              route: '/job-grid',
              children: [],
            },
            {
              name: 'Chat',
              icon: 'ri-message-3-line',
              route: '/chat',
              children: [],
            },
            {
              name: 'Reports',
              icon: 'ri-file-chart-line',
              route: '/Reports',
              children: [],
            },
          ];
          break;
        case 'EMPLOYER':
          this.menuItems = [
            {
              name: 'Dashboard',
              icon: 'ri-dashboard-line',
              route: '/dashboard',
              children: [],
            },
            {
              name: 'Open Worker',
              icon: 'ri-user-3-line',
              route: '/open-worker',
              children: [],
            },
            {
              name: 'Jobs',
              icon: 'ri-briefcase-line',
              route: '/jobs',
              children: [],
            },
            {
              name: 'Applicants',
              icon: 'ri-user-add-line',
              route: '/applicants',
              children: [],
            },
            {
              name: 'Shift Management',
              icon: 'ri-calendar-line',
              route: '/shift-management',
              expanded: false,
              children: [
                {
                  name: 'Shifts',
                  icon: 'ri-time-line',
                  route: '/shift-management/shifts',
                },
                {
                  name: 'Shift Assign',
                  icon: 'ri-user-follow-line',
                  route: '/shift-management/shift-assign',
                },
              ],
            },
            {
              name: 'Chat',
              icon: 'ri-message-3-line',
              route: '/chat',
              children: [],
            },
            {
              name: 'Reports',
              icon: 'ri-bar-chart-line',
              route: '/reports',
              children: [],
            },
          ];
          break;
        case 'EMPLOYEE':
          this.menuItems = [
            {
              name: 'Dashboard',
              icon: 'ri-dashboard-line',
              route: '/dashboard',
              children: [],
            },
            {
              name: 'Jobs',
              icon: 'ri-briefcase-line',
              route: '/worker-jobs',
              children: [],
            },
            {
              name: 'Chat',
              icon: 'ri-message-3-line',
              route: '/chat',
              children: [],
            },
            {
              name: 'Reports',
              icon: 'ri-bar-chart-line',
              route: '/reports',
              children: [],
            },
          ]
          break;
        default:
          break;
      }
    });
    
  }

  closeSideBar() {
    this.singletonStoreService.sidebarOpen.next(false); 
  }
}
