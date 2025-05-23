import { UserType } from './../../../../core/enums/common.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { SelectionComponent } from '../../../../shared/ui/fields/selection/selection.component';
import { SimpleInputComponent } from '../../../../shared/ui/fields/simple-input/simple-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectionComponent,
    SimpleInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  showPassword: boolean = false;
  userType = UserType;

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('user@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required]),
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
