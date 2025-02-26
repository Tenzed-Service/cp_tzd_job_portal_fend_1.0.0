import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavService } from '../../../services/nav.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { SidebarMenuSkeletonComponent } from '../../ui/skeleton/sidebar-menu-skeleton/sidebar-menu-skeleton.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent,
            SidebarMenuSkeletonComponent, SidebarComponent, RouterModule
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  public isBrowser: boolean;

  constructor(public navServices: NavService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/order/create'){
          this.navServices.collapseSidebar = true;
        }
      }
    })
  }

}
