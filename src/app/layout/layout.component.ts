
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutMenuModel } from '../core/models/api/layout.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
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
      expanded:false,
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
        }
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
  ]
  
  ngOnInit(): void {
  }
 
}
