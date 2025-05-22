import { UserType } from '../../core/enums/common.enum';
import { SingletonStoreService } from './../../core/services/helper/singleton-store.service';
import { Component, OnInit, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface breadCrumb { label: string, url?: string, active?: boolean }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {

  breadCrumbItemList: breadCrumb[] = [];
  isSidebarOpen:boolean = true;
  isNotificationOpen:boolean = false;
  isProfileOpen:boolean = false;
  userType = UserType;
  currentUserRole: string = '';

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {    
    this.singletonStoreService.sidebarOpen.subscribe((res: boolean) => {
      this.isSidebarOpen = res;
    });
    this.singletonStoreService.selectedUserType.subscribe((res: string) => {
      this.currentUserRole = res;
    });
  }

  ngOnInit(): void {
  }

  get isSmallScreen(): boolean {
    return window.innerWidth < 960;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      this.isProfileOpen = false;
      this.isNotificationOpen = false;
  }
  

  ngAfterViewInit() {
    this.singletonStoreService.breadCrumbItems.subscribe((header:breadCrumb[])=>{
      this.breadCrumbItemList = header;
      this.cdr.detectChanges();
     });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.singletonStoreService.sidebarOpen.next(this.isSidebarOpen);
  }

  changeBreadCrumb(route: breadCrumb) {
    if (route.url) {
      this.router.navigateByUrl(route.url);
    }
  }

  action(route: string) {
    this.isNotificationOpen = false;
    this.isProfileOpen = false;
    this.router.navigateByUrl(route);
  }

  changeUserRole(role: string) {
    this.action('/dashboard');
    this.singletonStoreService.selectedUserType.next(role);
  }
}
