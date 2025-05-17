import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { SelectionComponent } from '../../../shared/ui/fields/selection/selection.component';

@Component({
    selector: 'app-worker-dashboard',
    templateUrl: './worker-dashboard.component.html',
    styleUrls: ['./worker-dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, SelectionComponent]
})
export class WorkerDashboardComponent {
  currentTime: string = '00:00:00';
  timeInterval: any;
  clockInTime: Date | null = null;
  duration: string = '00:00:00';
  isClockIn: boolean = false;
  private durationInterval: any;
  selectedCategory:number = 1;
  projectList = [
    {
      value: 1,
      label: 'Select Project',
    },
    {
      value: 2,
      label: 'Hospital Administration',
    },
    {
      value: 3,
      label: 'Emergency Care',
    },
    {
      value: 4,
      label: 'Patient Care',
    },
  ];
  locationList = [
    {
      value: 1,
      label: 'Select Location',
    },
    {
      value: 2,
      label: 'Main Hospital',
    },
    {
      value: 3,
      label: 'Emergency Wing',
    },
    {
      value: 4,
      label: 'Clinic',
    },
  ];
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Dashboard', active: true },
    ]);     
  }

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  clockIn() {
    this.clockInTime = new Date();
    this.isClockIn = true;
    this.startTimer();
  }

  clockOut() {
    this.isClockIn = false;
    this.clockInTime = null;
    this.duration = '00:00:00';
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
    // Here you can add API call to save the clock out time
  }

  startTimer() {
    this.durationInterval = setInterval(() => {
      this.updateDuration();
    }, 1000);
  }

  updateDuration() {
    if (this.clockInTime) {
      const now = new Date();
      const diff = now.getTime() - this.clockInTime.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      this.duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }
  
  
  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
  }
}
