import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      userRole: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      // Handle login logic
      return
    }
    this.singletonStoreService.selectedUserType.next(this.loginForm.value?.userRole);
    this.action('dashboard');
  }

  action(route:string) {
    this.router.navigateByUrl(route);
  } 
}
