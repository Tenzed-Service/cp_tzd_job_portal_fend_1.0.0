import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutMenuModel } from '../core/models/api/layout.model';
import { RouterModule } from '@angular/router';
import { SingletonStoreService } from '../core/services/helper/singleton-store.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  menuItems: LayoutMenuModel[] = [
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
      route: '/Jobs',
      children: [],
    },
    {
      name: 'Messages',
      icon: 'ri-message-2-line',
      route: '/messages',
      children: [],
    },
    {
      name: 'Reports',
      icon: 'ri-file-chart-line',
      route: '/Reports',
      children: [],
    },
  ];
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
    }else{
      this.singletonStoreService.sidebarOpen.next(true);
    }
  }

  get isSmallScreen(): boolean {
    return window.innerWidth < 960;
  }

  ngOnInit(): void {
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
        name: 'Reports',
        icon: 'ri-bar-chart-line',
        route: '/Reports',
        children: [],
      },
    ]
  }

  closeSideBar() {
    this.singletonStoreService.sidebarOpen.next(false); 
  }
}
