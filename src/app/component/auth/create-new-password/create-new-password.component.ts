
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent {
  passwordForm: FormGroup;
  showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    symbols = "!@#$%^&*()<>?/'\";:}{[]\\|+=~`";
    passRequirement = {
      passwordMinLowerCase: 1,
      passwordMinNumber: 1,
      passwordMinSymbol: 1,
      passwordMinUpperCase: 1,
      passwordMinCharacters: 8,
      passwordMaxCharacters: 50
    };
    pattern = [
        `(?=(.*[${this.symbols.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]){${this.passRequirement.passwordMinSymbol},})`,
        `(?=(.*[a-z]){${this.passRequirement.passwordMinLowerCase},})`,
        `(?=(.*[A-Z]){${this.passRequirement.passwordMinUpperCase},})`,
        `(?=(.*\\d){${this.passRequirement.passwordMinNumber},})`,
        `[A-Za-z\\d${this.symbols.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}.]{${this.passRequirement.passwordMinCharacters},${this.passRequirement.passwordMaxCharacters}}`
      ].map(item => item.toString()).join('');

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(this.pattern)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });
  }

  get formControl() {
    return this.passwordForm.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl:any = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {
      console.log('Password Updated');
      // Add your password update logic here
    }
  }
}
