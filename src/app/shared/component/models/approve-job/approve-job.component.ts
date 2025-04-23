import { UserType } from '../../../../core/enums/common.enum';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-approve-job',
    templateUrl: './approve-job.component.html',
    styleUrls: ['./approve-job.component.scss'],
    standalone: true,
    imports: [
      CommonModule]
})
export class ApproveJobComponent {
  userType = UserType;
  currentUser:string = '';
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) {     
    this.singletonStoreService.selectedUserType.subscribe((user:string) => {
      this.currentUser = user;
    });
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
