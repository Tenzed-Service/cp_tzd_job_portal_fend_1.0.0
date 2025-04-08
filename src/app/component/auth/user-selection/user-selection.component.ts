import { SingletonStoreService } from './../../../core/services/helper/singleton-store.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserType } from '../../../core/enums/common-enum';

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [
    CommonModule, ButtonModule, CardModule,
  ],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.scss'
})
export class UserSelectionComponent {
  userType = UserType;
  selectedUserType: string = '';
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {}

  goBack() {
    this.router.navigateByUrl('/auth/login');
  }

  action(userType:string) {
    this.singletonStoreService.selectedUserType.next(userType);
    this.router.navigateByUrl('/auth/register');
  }
}
