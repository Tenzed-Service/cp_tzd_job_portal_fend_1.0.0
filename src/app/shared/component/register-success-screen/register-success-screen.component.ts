import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success-screen',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './register-success-screen.component.html',
  styleUrls: ['./register-success-screen.component.scss']
})
export class RegisterSuccessScreenComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
