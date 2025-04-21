import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { ProfileTabs } from '../../../core/enums/common.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserProfileComponent implements OnInit {
  profileTabs = ProfileTabs;
  activeTab: string = this.profileTabs.personaDetails;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  showCurrentPassword: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  symbols = '!@#$%^&*()<>?/\'";:}{[]\\|+=~`';
  passRequirement = {
    passwordMinLowerCase: 1,
    passwordMinNumber: 1,
    passwordMinSymbol: 1,
    passwordMinUpperCase: 1,
    passwordMinCharacters: 8,
    passwordMaxCharacters: 50,
  };
  pattern = [
    `(?=(.*[${this.symbols.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]){${
      this.passRequirement.passwordMinSymbol
    },})`,
    `(?=(.*[a-z]){${this.passRequirement.passwordMinLowerCase},})`,
    `(?=(.*[A-Z]){${this.passRequirement.passwordMinUpperCase},})`,
    `(?=(.*\\d){${this.passRequirement.passwordMinNumber},})`,
    `[A-Za-z\\d${this.symbols.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}.]{${
      this.passRequirement.passwordMinCharacters
    },${this.passRequirement.passwordMaxCharacters}}`,
  ]
    .map((item) => item.toString())
    .join('');

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private fb: FormBuilder
  ) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'User Profile', active: true },
    ]);
  }

  ngOnInit(): void {
    this.initForms();
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }

  initForms() {
    this.profileForm = this.fb.group({
      companyName: ['TechVision Solutions', [Validators.required]],
      websiteUrl: ['TechVision Solutions', [Validators.pattern('https?://.+')]],
      employees: ['2'],
      taxCategory: ['3'],
      companyAddress: [
        '123 Innovation Drive, Suite 400, San Francisco, CA 94107, United States',
      ],
      businessDescription: [''],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.confirmedValidator('newPassword', 'confirmPassword') }
    );
  }

  get formControl() {
    return this.profileForm.controls;
  }

  get passwordControl() {
    return this.passwordForm.controls;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl: any = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
