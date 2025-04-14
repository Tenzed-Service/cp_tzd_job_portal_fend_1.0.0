import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-success-screen.component.html',
  styleUrls: ['./register-success-screen.component.scss']
})
export class RegisterSuccessScreenComponent {
  @Output() isShow = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToHome() {
    // this.router.navigate(['/']);
    this.isShow.emit(false);
  }
}
