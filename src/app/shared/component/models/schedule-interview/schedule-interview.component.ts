
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-schedule-interview',
    templateUrl: './schedule-interview.component.html',
    styleUrls: ['./schedule-interview.component.scss'],
    standalone: true,
    imports: [
      CommonModule]
})
export class ScheduleInterviewComponent {
  @Output() closeEvent = new EventEmitter<boolean>();
    
  constructor() {    
  }

  close() {
    this.closeEvent.emit(false);
  }
}
