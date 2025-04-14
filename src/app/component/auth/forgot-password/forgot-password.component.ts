import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.forgotForm.markAllAsTouched();
    if (this.forgotForm.invalid) {
      // Handle password reset logic
      return
    }
    console.log('Form submitted:', this.forgotForm.value);
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
