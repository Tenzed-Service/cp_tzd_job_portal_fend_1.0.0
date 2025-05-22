import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { ProfileTabs, UserType } from '../../../core/enums/common.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TabsSchema } from '../../../shared/component/tabs/tabs.component.models';
import { TabsComponent } from '../../../shared/component/tabs/tabs.component';
import { SelectionComponent } from '../../../shared/ui/fields/selection/selection.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TabsComponent, SelectionComponent],
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
  ].map((item) => item.toString()).join('');
  tabList: any[] = [
    {
      id: 1,
      name: 'Personal Details',
      count: 0,
      icon: 'ri-user-line',
    },
    {
      id: 2,
      name: 'Change Password',
      count: 0,
      icon: 'ri-lock-line',
    },
  ];
  tabsSchema:TabsSchema<UserProfileComponent,any[]> = {
    parentComponent: this,
    tabList: this.tabList,
    activeTab: 1,
    searchInput: false,
    tabChange: this.switchTab,
  };
  selectedUserType: string = '';
  userType = UserType;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private fb: FormBuilder
  ) {
    this.selectedUserType = this.singletonStoreService.selectedUserType.getValue();
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'User Profile', active: true },
    ]);
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.initForms();
  }

  initForms() {
    if (this.selectedUserType === this.userType.EMPLOYEE || this.selectedUserType === this.userType.AGENCY) {
      this.profileForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        countryCode: ['+91'],
        contact: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
      });
    }
    if (this.selectedUserType === this.userType.EMPLOYER) {
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
    }

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.confirmedValidator('newPassword', 'confirmPassword') }
    );
  }

  loadDropdownData() {
    // Add your API calls here to load dropdown data
    this.countries = [{ value: 1, label: 'USA' }, { value: 2, label: 'Canada' }];
    this.states = [{ value: 1, label: 'California' }, { value: 2, label: 'Texas' }];
    this.cities = [{ value: 1, label: 'Los Angeles' }, { value: 2, label: 'Houston' }];
  }

  get formControl() {
    return this.profileForm.controls;
  }

  get passwordControl() {
    return this.passwordForm.controls;
  }

  // Change the switchTab method signature to match the interface
  switchTab (
    tabsSchema: TabsSchema<UserProfileComponent,any[]>,
    event: any
  ) {
    console.log(tabsSchema,event);
    
    switch (event) {
      case 1:
        tabsSchema.parentComponent.activeTab = tabsSchema.parentComponent.profileTabs.personaDetails;
        break;
      case 2:
        tabsSchema.parentComponent.activeTab = tabsSchema.parentComponent.profileTabs.changePassword;
        break;
    }
    console.log(tabsSchema.parentComponent.activeTab);
    
  }

  action(route: string) {
    this.router.navigateByUrl(route);
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
