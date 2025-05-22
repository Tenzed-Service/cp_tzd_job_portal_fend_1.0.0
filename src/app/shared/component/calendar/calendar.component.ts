import { UserType } from '../../../core/enums/common.enum';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    standalone: true,
    imports: [
      CommonModule
    ]
})
export class CalendarComponent {
   // Shift data
   shifts = [
    { id: 1, title: "General Medicine", staff: "Dr. Emily Johnson", day: "Monday", date: "2025-04-24", startTime: "7:00 AM", duration: 120, type: "shift-type-1", top: 60 },
    { id: 2, title: "Pediatrics", staff: "Dr. Michael Chen", day: "Monday", date: "2025-04-24", startTime: "9:00 AM", duration: 180, type: "shift-type-3", top: 240 },
    { id: 3, title: "Emergency", staff: "Dr. David Washington", day: "Tuesday", date: "2025-04-25", startTime: "8:00 AM", duration: 180, type: "shift-type-2", top: 120 },
    { id: 4, title: "Dental", staff: "Sophia Martinez", day: "Tuesday", date: "2025-04-25", startTime: "11:00 AM", duration: 120, type: "shift-type-4", top: 360 },
    { id: 5, title: "General Medicine", staff: "Dr. Amir Patel", day: "Wednesday", date: "2025-04-26", startTime: "7:00 AM", duration: 120, type: "shift-type-1", top: 60 },
    { id: 6, title: "Pediatrics", staff: "Rebecca Anderson", day: "Wednesday", date: "2025-04-26", startTime: "9:00 AM", duration: 120, type: "shift-type-3", top: 240 },
    { id: 7, title: "Emergency", staff: "Dr. Emily Johnson", day: "Wednesday", date: "2025-04-26", startTime: "12:00 PM", duration: 120, type: "shift-type-2", top: 420 },
    { id: 8, title: "Dental", staff: "Jennifer O'Connor", day: "Thursday", date: "2025-04-27", startTime: "8:30 AM", duration: 120, type: "shift-type-4", top: 180 },
    { id: 9, title: "General Medicine", staff: "Dr. Michael Chen", day: "Thursday", date: "2025-04-27", startTime: "11:00 AM", duration: 180, type: "shift-type-1", top: 360 },
    { id: 10, title: "Emergency", staff: "Dr. David Washington", day: "Friday", date: "2025-04-28", startTime: "7:00 AM", duration: 180, type: "shift-type-2", top: 60 },
    { id: 11, title: "Pediatrics", staff: "Rebecca Anderson", day: "Friday", date: "2025-04-28", startTime: "10:00 AM", duration: 120, type: "shift-type-3", top: 300 },
    { id: 12, title: "Dental", staff: "Sophia Martinez", day: "Saturday", date: "2025-04-29", startTime: "8:00 AM", duration: 120, type: "shift-type-4", top: 120 },
    { id: 13, title: "General Medicine", staff: "Dr. Amir Patel", day: "Sunday", date: "2025-04-30", startTime: "8:30 AM", duration: 120, type: "shift-type-1", top: 180 },
    { id: 14, title: "General Medicine", staff: "Dr. Emily Johnson", day: "Thursday", date: "2025-04-30", startTime: "7:00 AM", duration: 120, type: "shift-type-1", top: 60 },
    { id: 15, title: "Emergency", staff: "Dr. David Washington", day: "Thursday", date: "2025-04-30", startTime: "9:00 AM", duration: 180, type: "shift-type-2", top: 240 }
  ];

  // Calendar state
  currentDate = new Date('2025-04-24');
  weekDays: { date: Date; dayName: string; isToday: boolean }[] = [];
  monthDays: { date: Date; isToday: boolean; isOtherMonth: boolean }[] = [];
  dateRangeDisplay = '';
  currentView: 'week' | 'day' | 'month' = 'week';
  timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];
  selectedShift: any = null;

  ngOnInit() {
    this.updateCalendar();
  }

  // Update calendar based on view
  updateCalendar() {
    if (this.currentView === 'week' || this.currentView === 'day') {
      this.updateWeek();
    } else {
      this.updateMonth();
    }
  }

  // Update week display
  updateWeek() {
    this.weekDays = [];
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() === 0 ? -6 : 1));

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.weekDays.push({
        date: day,
        dayName: day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        isToday: day.toDateString() === new Date().toDateString()
      });
    }

    const start = this.weekDays[0].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const end = this.weekDays[6].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    this.dateRangeDisplay = this.currentView === 'day'
      ? this.currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : `${start} - ${end}`;
  }

  // Update month display
  updateMonth() {
    this.monthDays = [];
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1));

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      this.monthDays.push({
        date: day,
        isToday: day.toDateString() === new Date().toDateString(),
        isOtherMonth: day.getMonth() !== this.currentDate.getMonth()
      });
    }

    this.dateRangeDisplay = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  // Navigation methods
  prevPeriod() {
    if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else if (this.currentView === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
    this.updateCalendar();
  }

  nextPeriod() {
    if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else if (this.currentView === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.updateCalendar();
  }

  setToday() {
    this.currentDate = new Date();
    this.updateCalendar();
  }

  // View change
  changeView(view: 'week' | 'day' | 'month') {
    this.currentView = view;
    this.updateCalendar();
  }

  // Select a day (switches to Day view)
  selectDay(date: Date) {
    this.currentDate = new Date(date);
    this.currentView = 'day';
    this.updateCalendar();
  }

  // Check if date is today
  isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  // Filter shifts for a specific day
  getShiftsForDay(date: Date): any[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.shifts.filter(shift => shift.date === dateStr);
  }

  // Open shift details modal
  openShiftModal(shift: any) {
    this.selectedShift = shift;
  }

  // Close shift details modal
  closeShiftModal() {
    this.selectedShift = null;
  }
}
