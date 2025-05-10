import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownItemModel } from '../../../../core/models/common/common.models';
import { MultiSelectionComponent } from '../../../../shared/ui/fields/multi-selection/multi-selection.component';
import { SelectionComponent } from '../../../../shared/ui/fields/selection/selection.component';
import { SimpleInputComponent } from '../../../../shared/ui/fields/simple-input/simple-input.component';
import { DateComponent } from '../../../../shared/ui/fields/date/date.component';
import { DateTimeComponent } from '../../../../shared/ui/fields/date-time/date-time.component';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [
    CommonModule,
    SimpleInputComponent,
    MultiSelectionComponent,
    SelectionComponent,
    DateComponent,
    DateTimeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  jobId: number = 0;
  amountTypeList: DropdownItemModel[] = [];
  skillList: any[] = [];
  languageList: DropdownItemModel[] = [];
  countryList: DropdownItemModel[] = [];
  stateList: DropdownItemModel[] = [];
  cityList: DropdownItemModel[] = [];
  statusList: DropdownItemModel[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private singletonStoreService: SingletonStoreService,
    private fb: FormBuilder
  ) {
    this.jobId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Jobs', url: '/jobs' },
      { label: this.jobId ? 'Edit Job' : 'Create Job', active: true },
    ]);
  }

  ngOnInit() {
    this.loadDropdownData();
    this.initForm();
  }

  loadDropdownData() {
    this.amountTypeList = [
      { label: 'Per Hour', value: 'hourly' },
      { label: 'Per Day', value: 'daily' },
      { label: 'Per Week', value: 'weekly' },
      { label: 'Per Month', value: 'monthly' },
    ];
    this.skillList = [
      { label: 'HTML', value: 1 },
      { label: 'CSS', value: 2 },
      { label: 'JavaScript', value: 3 },
      { label: 'TypeScript', value: 4 },
      { label: 'Angular', value: 5 },
      { label: 'React', value: 6 },
      { label: 'Vue.js', value: 7 },
      { label: 'Node.js', value: 8 },
      { label: 'Python', value: 9 },
      { label: 'Java', value: 10 },
      { label: 'AI', value: 11 },
      { label: 'Machine Learning', value: 12 },
      { label: 'DevOps', value: 13 },
      { label: 'Cloud Computing', value: 14},
    ];
    this.languageList = [
      { label: 'English', value: 'English' },
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Spanish', value: 'Spanish' },
    ];
    this.countryList = [
      { label: 'India', value: 'India' },
      { label: 'USA', value: 'USA' },
      { label: 'UK', value: 'UK' },
    ];
    this.stateList = [
      { label: 'Gujarat', value: 'Gujarat' },
      { label: 'MP', value: 'MP' },
      { label: 'UP', value: 'UP' },
    ];
    this.cityList = [
      { label: 'Surat', value: 'Surat' },
      { label: 'Ahmadabad', value: 'Ahmadabad' },
      { label: 'Mumbai', value: 'Mumbai' },
    ];
    this.statusList = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Draft', value: 'draft' },
    ];
  }

  private initForm() {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobType: ['full-time', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+91'],
      contact: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      dueDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      amountType: ['', Validators.required],
      skills: [[], Validators.required],
      locations: this.fb.array([]),
      languages: [[], Validators.required],
      applicants: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.addLocation();
  }

  get formControl() {
    return this.jobForm.controls;
  }

  get locations() {
    return this.jobForm.get('locations') as FormArray;
  }

  createLocationGroup() {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  addLocation() {
    this.locations.push(this.createLocationGroup());
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
  }

  onSubmit() {
    this.jobForm.markAllAsTouched();
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
    }
  }
}
