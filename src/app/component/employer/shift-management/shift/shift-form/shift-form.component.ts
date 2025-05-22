import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SingletonStoreService } from '../../../../../core/services/helper/singleton-store.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SimpleInputComponent } from '../../../../../shared/ui/fields/simple-input/simple-input.component';
import { TimeComponent } from '../../../../../shared/ui/fields/time/time.component';
import { DateComponent } from '../../../../../shared/ui/fields/date/date.component';

interface DateLog {
  id: number;
  formattedDate: string;
  currentTime: string;
}

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleInputComponent,
    TimeComponent,
    DateComponent,
  ],
})
export class ShiftFormComponent {
  shiftForm!: FormGroup;
  holidayLogs: any[] = [];
  multiDateLogs: any[] = [];
  weeklyList: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  monthlyDates: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  shiftId:number = 0;

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.shiftId = Number(this.activatedRoute.snapshot.paramMap.get('id')) ?? 0;
    
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Shift Management' },
      { label: 'Shifts', url: '/shift-management/shifts' },
      { label: this.shiftId == 0 ? 'Create' : 'Edit', active: true },
    ]);
  }

  ngOnInit() {
    this.shiftForm = new FormGroup({
      shiftTitle: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      scheduleType: new FormControl('daily'),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      holidayDate: new FormControl(''),
      multipleDates: new FormControl(''),
      frequencyType: new FormControl('weekly'),
      weeklyDays: new FormControl([]),
      monthlyDates: new FormControl([]),
    });
  }

  get formControl() {
    return this.shiftForm.controls;
  }

  addDateToLogs(formControlName: string, logArray: DateLog[]): void {
    const formControl = this.shiftForm.get(formControlName);
    if (!formControl?.value) return;

    const dateLog: DateLog = {
      id: logArray.length + 1,
      formattedDate: this.formateDate(formControl.value),
      currentTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    logArray.push(dateLog);
    formControl.reset();
  }

  addHoliday(): void {
    this.addDateToLogs('holidayDate', this.holidayLogs);
  }

  removeHoliday(holiday: DateLog): void {
    this.holidayLogs = this.holidayLogs.filter(
      (item) => item.id !== holiday.id
    );
  }

  addMultipleDates(): void {
    this.addDateToLogs('multipleDates', this.multiDateLogs);
  }

  removeMultipleDates(multipleDate: DateLog): void {
    this.multiDateLogs = this.multiDateLogs.filter(
      (item) => item.id !== multipleDate.id
    );
  }

  formateDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  resetScheduleType() {
    this.shiftForm.patchValue({
      startDate: '',
      endDate: '', 
      holidayDate: '',
      multipleDates: '',
      weeklyDays: [],
      monthlyDates: [],
    })
  }

  // Add this method to handle checkbox changes
  onDayChange(event: any, day: any, formControlName: string) {
    const days = this.shiftForm.get(formControlName)?.value || [];
    if (event.target.checked) {
      days.push(day);
    } else {
      const index = days.indexOf(day);
      if (index > -1) {
        days.splice(index, 1);
      }
    }
    this.shiftForm.patchValue({ formControlName: days });
  }

  submitForm() {
    console.log(this.shiftForm.value);
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }

  close(){
    this.router.navigateByUrl('/shift-management/shifts');
  }
}
