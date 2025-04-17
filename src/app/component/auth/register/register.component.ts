import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { UserType } from '../../../core/enums/common-enum';
import { RegisterSuccessScreenComponent } from '../../../shared/component/register-success-screen/register-success-screen.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegisterSuccessScreenComponent
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    isVisibleModel:boolean = false;
    registerForm: FormGroup;
    countries: any[] = [];
    states: any[] = [];
    cities: any[] = [];
    industries: any[] = [];
    legalEntities: any[] = [];
    uploadedFiles: File[] = [];
    maxFileSize = 5 * 1024 * 1024; // 5MB
    userType = UserType;
    selectedUserType: string = this.userType.EMPLOYER;
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
        private router: Router,
        private singletonStoreService: SingletonStoreService
    ) {
        this.selectedUserType = this.singletonStoreService.selectedUserType.getValue() ? this.singletonStoreService.selectedUserType.getValue() : this.userType.EMPLOYER
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            companyName: [''],
            email: ['', [Validators.required, Validators.email]],
            countryCode: ['+91'],
            contact: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            legalName: [''],
            industry: [''],
            entityType: [''],
        }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });
        
    }

    get formControl() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        // Initialize dropdown data
        this.loadDropdownData();
        if(this.selectedUserType == this.userType.EMPLOYER) {
            this.formControl['companyName'].setValidators([Validators.required]);
            this.formControl['companyName'].updateValueAndValidity();
            this.formControl['legalName'].setValidators([Validators.required]);
            this.formControl['legalName'].updateValueAndValidity();
            this.formControl['industry'].setValidators([Validators.required]);
            this.formControl['industry'].updateValueAndValidity();
            this.formControl['entityType'].setValidators([Validators.required]);
            this.formControl['entityType'].updateValueAndValidity();
        }
    }

    loadDropdownData() {
        // Add your API calls here to load dropdown data
        this.countries = [{ name: 'USA' }, { name: 'Canada' }];
        this.states = [{ name: 'California' }, { name: 'Texas' }];
        this.cities = [{ name: 'Los Angeles' }, { name: 'Houston' }];
        this.industries = [{ name: 'Technology' }, { name: 'Healthcare' }];
        this.legalEntities = [{ name: 'Corporation', value:'Corporation' }, { name: 'Limited Liability Company (LLC)', value:'LLC' }, { name: 'Partnership', value:'Partnership' }, { name: 'Sole Proprietorship', value:'SoleProprietorship' }, { name: 'Non-Profit Organization', value:'NonProfit' }];
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

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const container = event.target as HTMLElement;
        container.classList.add('dragover');
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const container = event.target as HTMLElement;
        container.classList.remove('dragover');
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const container = event.target as HTMLElement;
        container.classList.remove('dragover');

        const files = event.dataTransfer?.files;
        if (files) {
            this.handleFiles(Array.from(files));
        }
    }

    onFileSelected(event: any) {
        const files = event.target.files;
        if (files) {
            this.handleFiles(Array.from(files));
        }
    }

    handleFiles(files: File[]) {
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
            const isValidSize = file.size <= this.maxFileSize;
            return isValidType && isValidSize;
        });

        this.uploadedFiles = [...this.uploadedFiles, ...validFiles];
    }

    removeFile(index: number) {
        this.uploadedFiles.splice(index, 1);
        this.uploadedFiles = [...this.uploadedFiles];
    }

    isFieldInvalid(field: string): boolean {
        const formField = this.registerForm.get(field);
        return formField ? (formField.invalid && formField.touched) : false;
    }

    onFileSelect(event: any) {
        // Handle file upload
        console.log('File selected:', event.files);
    }

    onSubmit() {
        this.registerForm.markAllAsTouched();
        this.isVisibleModel = true;
        if (this.registerForm.invalid) {
            return;
        }
        // Add your registration logic here
        console.log('Form submitted:', this.registerForm.value);
    }

    goBack() {
        this.router.navigate(['/auth/user-selection']);
    }
}
