import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LayoutMenuModel } from '../../core/models/api/layout.model';
import { SingletonStoreService } from '../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      RouterModule
    ]
})
export class SidebarComponent implements OnInit {
  @Input() menus: LayoutMenuModel[] = [];
  currentUrl: string = '';
  isSidebarOpen: boolean = true;
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) {
    this.currentUrl = this.router.url;
    this.singletonStoreService.sidebarOpen.subscribe((res: boolean) => {
      this.isSidebarOpen = res;
    });  
  }

  ngOnInit(): void {
    this.expandedMenu();
  }

  expandedMenu() {
    if (this.menus) {
      this.menus = this.menus.map((item) => {
        if (this.currentUrl.includes(item.route)) {
          item.expanded = true;
        }else {
          item.expanded = false;
        }
        return item;
      });
    }
  }

  action(route: string) {
    this.currentUrl = route;
    this.router.navigateByUrl(route);
    this.expandedMenu();
  }

  toggleSubmenu(item: any) {
    // Toggle the expanded state of the clicked item
    item.expanded = !item.expanded;
  }
}
