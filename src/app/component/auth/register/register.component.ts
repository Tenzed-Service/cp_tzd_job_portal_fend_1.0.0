import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserType } from '../../../core/enums/common-enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ButtonModule, CardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userType = UserType;
  selectedUserType: string = '';
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/auth/login']);
  }
}
