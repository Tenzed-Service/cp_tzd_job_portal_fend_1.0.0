import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { NavService } from "../../../services/nav.service";
import { FooterComponent } from "../../footer/footer.component";
import { HeaderComponent } from "../../header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { SidebarMenuSkeletonComponent } from "../../ui/skeleton/sidebar-menu-skeleton/sidebar-menu-skeleton.component";
import { isPlatformBrowser } from "@angular/common";
import { Select, Store } from "@ngxs/store";
import { GetRoleAuthorizeDetails } from "../../../store/action/role-management.action";
import { CommonState } from "../../../store/state/common.state";
import { Observable } from "rxjs";
import {
  APIHeaderVM,
  APIResponseVM,
} from "../../../../core/models/common/common.model";
import { RoleOptionEnum } from "../../../../core/enums/common.enum";
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: "app-content",
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SidebarMenuSkeletonComponent,
    SidebarComponent,
    RouterModule,
    LoaderComponent
  ],
  templateUrl: "./content.component.html",
  styleUrl: "./content.component.scss",
})
export class ContentComponent {
  @Select(CommonState.commonHeaderDetails) commonHeaderDetails$: Observable<
    APIResponseVM<APIHeaderVM>
  >;

  public isBrowser: boolean;
  sideBarOptions:any[] = [];
  public isLoading: boolean = true;

  constructor(
    private store: Store,
    public navServices: NavService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.commonHeaderDetails$.subscribe({
        next: (resData: APIResponseVM<APIHeaderVM>) => {
          if (resData?.data?.CompanyId) {
            this.store.dispatch(new GetRoleAuthorizeDetails()).subscribe({
              next: (res) => {
                
                if (res?.roleManagement?.data?.length > 0) {
                  this.sideBarOptions = res?.roleManagement?.data.find((option:any)=>option?.PositionName === RoleOptionEnum.SIDEBAR)?.Menu;
                }
                this.isLoading = false;
              },
              error:(err)=>{this.isLoading = false;}
            });
          }
        },
      });      
    }
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if (event.url === "/order/create") {
    //       this.navServices.collapseSidebar = true;
    //     }
    //   }
    // });
  }
}
