
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent {
  otpLength = 4;
  otpArray = Array(this.otpLength).fill('');
  showError:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
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
    if (this.otpArray.some(value => value === '')) {
      this.showError = true;
    }else{
      this.showError = false; 
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
    if (this.otpArray.some(value => value === '')) {
      // Handle incomplete OTP error
      console.error('Please fill in all OTP digits');
      this.showError = true;
      return;
    }
  }

  resendOtp() {
    // Add your resend OTP logic here
    console.log('Resending OTP...');
  }
}
