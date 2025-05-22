import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { UserType } from '../../../core/enums/common.enum';
import { EmployerTaskManagementComponent } from '../../employer/employer-task-management/employer-task-management.component';
import { WorkerTaskManagementComponent } from '../../worker/worker-task-management/worker-task-management.component';

@Component({
    selector: 'app-task-management',
    templateUrl: './task-management.component.html',
    styleUrls: ['./task-management.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      EmployerTaskManagementComponent,
      WorkerTaskManagementComponent
    ]
})
export class TaskManagementComponent {
  userType = UserType;
  currentUserType: string = '';

  constructor(
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.selectedUserType.subscribe((res: string) => {
      this.currentUserType = res;
    });
  }
}
