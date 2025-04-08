import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountUser } from '../../interface/account.interface';
import { Permission } from '../../interface/role.interface';
import { Values } from '../../interface/setting.interface';
import { Sidebar, SidebarModel } from '../../interface/sidebar.interface';
import { NavService } from '../../services/nav.service';
import { GetSidebar } from '../../store/action/sidebar.action';
import { AccountState } from '../../store/state/account.state';
import { SettingState } from '../../store/state/setting.state';
import { SidebarState } from '../../store/state/sidebar.state';
import { ActionType, SidebarMenuResVM } from '../../../core/models/api/role-management.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() class: string;
  @Input() menuOption: SidebarMenuResVM[] = [];

  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(AccountState.permissions) permissions$: Observable<Permission[]>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(SidebarState.menu) menu$: Observable<SidebarModel>;

  public item: Sidebar;
  public menuItems: Sidebar[] = [];
  public permissions: string[] = [];
  public sidebarTitleKey: string = 'sidebar';
  public width: any = window?.innerWidth;
  public role: string;
  activeMenu = new BehaviorSubject(0);
  
  constructor(public navServices: NavService,
    private router: Router,
    private store: Store) {
    this.store.dispatch(new GetSidebar())
    this.menu$.subscribe((menuItems) => {
      // setTimeout(() => {
        // console.log(menuItems?.data);        
      // }, 200);
      // // this.menuItems = menuItems?.data;
      // this.router.events.subscribe((event) => {
      //   if (event instanceof NavigationEnd) {
      //     this.menuOption = this.menuOption?.map((menu: SidebarMenuResVM) => {
      //         menu.active = false;
      //         this.activeMenuRecursive(menu, (event.url.split("?")[0].toString().split("/")[1].toString()));
      //         return menu
      //     });
      //   }
      // });
    });
    this.user$.subscribe(user => this.role = user?.role?.name);
  }

  ngOnInit(){
      console.log(this.menuOption); 
    // this.menuItems = menuItems?.data;
        this.menuOption = this.menuOption?.map((menu: SidebarMenuResVM) => {
            menu.active = false;
            this.activeMenuRecursive(menu, (this.router.url.split("?")[0].toString().split("/")[1].toString()));
            return menu
        });
  }

  hasMainLevelMenuPermission(acl_permission: ActionType[]) {
    let status = true;
    if(acl_permission?.length > 0) {
      if (acl_permission.find((res: any) => res?.ActionName === "View")) {
        status = true;        
      }else{
        status = false;
      }
    }
    return status;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  onItemSelected(item: any, onRoute: boolean = false) {
    this.menuItems.forEach((menu: Sidebar) => {
      this.deActiveAllMenu(menu, item);
    });
    
    if(!onRoute){
      item.active = !item.active;
    }
  }

  activeMenuRecursive(menu: SidebarMenuResVM, url: string, item?: SidebarMenuResVM) {    
    if(menu && menu.route && menu.route === (url.charAt(0) !== '/' ? '/'+url : url)) {
      if(item) {
        item.active = true;
        this.onItemSelected(item, true);
        this.activeMenu.next(menu.formCode);
      }
      menu.active = true;
    }else{
      menu.active = false;
    }
    if(menu?.formMenu?.length) {
      menu?.formMenu.forEach((child: SidebarMenuResVM) => {
        this.activeMenuRecursive(child, (url.charAt(0) !== '/' ? '/'+url : url.toString()), menu)
      })
    }
  }

  deActiveAllMenu(menu: Sidebar, item: Sidebar) {
    if(menu && menu.active && menu.id != item.id) {
      menu.active = false;
    }
    if(menu?.children?.length) {
      menu?.children.forEach((child: Sidebar) => {
        this.deActiveAllMenu(child, item)
      })
    }
  }

  closeSidebar(){
    if(this.width < 992){
      this.navServices.collapseSidebar = false;
    }
  }

}
