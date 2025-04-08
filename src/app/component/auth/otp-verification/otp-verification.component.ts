
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent {
  otpForm: FormGroup;
  otpLength = 4;
  otpArray = Array(this.otpLength).fill('');

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Allow only numbers
    input.value = value.replace(/[^0-9]/g, '');

    if (input.value && index < this.otpLength - 1) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && index > 0 && !target.value) {
      const prevInput = target.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
}

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP Verified');
      // Add your verification logic here
    }
  }

  resendOtp() {
    // Add your resend OTP logic here
    console.log('Resending OTP...');
  }
}
