import { SingletonStoreService } from './../../../../core/services/helper/singleton-store.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserTypeEnum } from '../../../../core/enums/common.enum';

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.scss'
})
export class UserSelectionComponent {

  public isBrowser: boolean;
  userTypeEnum = UserTypeEnum;

  constructor(
    private singletonStoreService: SingletonStoreService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  selectUserType(userType:string){
    this.singletonStoreService.userSelected.next(userType);
    this.router.navigateByUrl('/auth/login');
  }

}
