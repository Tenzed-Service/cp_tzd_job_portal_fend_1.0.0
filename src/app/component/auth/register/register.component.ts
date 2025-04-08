import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { UserType } from '../../../core/enums/common-enum';
import { RegisterSuccessScreenComponent } from '../../../shared/component/register-success-screen/register-success-screen.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DropdownModule,
        InputMaskModule,
        FileUploadModule,
        RegisterSuccessScreenComponent
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    countries: any[] = [];
    states: any[] = [];
    cities: any[] = [];
    industries: any[] = [];
    uploadedFiles: File[] = [];
    maxFileSize = 5 * 1024 * 1024; // 5MB
    userType = UserType;
    selectedUserType: string = this.userType.EMPLOYER;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private singletonStoreService: SingletonStoreService
    ) {
        this.selectedUserType = this.singletonStoreService.selectedUserType.getValue() ? this.singletonStoreService.selectedUserType.getValue() : this.userType.EMPLOYER
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            companyName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contact: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            legalEntity: [''],
            industry: ['', Validators.required],
            legalName: ['', Validators.required],
        }, {
            validators: this.passwordMatchValidator
        });
    }

    get formControl() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        // Initialize dropdown data
        this.loadDropdownData();
    }

    loadDropdownData() {
        // Add your API calls here to load dropdown data
        this.countries = [{ name: 'USA' }, { name: 'Canada' }];
        this.states = [{ name: 'California' }, { name: 'Texas' }];
        this.cities = [{ name: 'Los Angeles' }, { name: 'Houston' }];
        this.industries = [{ name: 'Technology' }, { name: 'Healthcare' }];
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
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
        if (this.registerForm.invalid) {
            return;
        }
        // Add your registration logic here
        console.log('Form submitted:', this.registerForm.value);
    }

    goBack() {
        this.router.navigate(['/auth/selection']);
    }
}
