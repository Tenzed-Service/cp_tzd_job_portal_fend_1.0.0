import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { BadgesComponent } from '../../../../shared/ui/badges/badges.component';
import { ColumnFormateService } from '../../../../core/services/helper/column-formate.service';
import { TabsComponent } from '../../../../shared/component/tabs/tabs.component';
import { TabsSchema } from '../../../../shared/component/tabs/tabs.component.models';
import { SimpleInputComponent } from '../../../../shared/ui/fields/simple-input/simple-input.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { StatusType } from '../../../../core/enums/common.enum';

@Component({
  selector: 'app-shift-assign',
  templateUrl: './shift-assign.component.html',
  styleUrls: ['./shift-assign.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgesComponent, TabsComponent, SimpleInputComponent],
})
export class ShiftAssignComponent implements OnInit {
  draggedElement: any = null;
  shiftList = [
    {
      id: 1,
      shiftTitle: 'Morning Shift - General Medicine',
      location: 'East Wing, Floor 2',
      status: 'Available',
      date: '2025-05-07',
      startTime: '8:00 AM',
      endTime: '12:00 PM',
      icon: 'ri-hospital-line',
      requiredStaff: {
        current: 0,
        total: 2,
      },
      assignedStaff: [],
      requiredRoles: ['MD', 'RN'],
    },
    {
      id: 2,
      shiftTitle: 'Night Shift - Pediatrics',
      location: 'West Wing, Floor 3',
      status: 'Partially Assigned',
      date: '2025-05-08',
      startTime: '9:00 AM',
      endTime: '1:00 PM',
      requiredStaff: {
        current: 1,
        total: 3,
      },
      assignedStaff: ['Michael Chen'],
      requiredRoles: ['MD', 'RN', 'PA'],
    },
    {
      id: 3,
      shiftTitle: 'Morning Shift - Emergency',
      location: 'Emergency shiftTitle',
      status: 'Fully Assigned',
      date: '2025-05-09',
      startTime: '7:00 PM',
      endTime: '7:00 AM',
      requiredStaff: {
        current: 4,
        total: 4,
      },
      assignedStaff: [
        'David Washington',
        'Emily Johnson',
        'Sophia Martinez',
        'Rebecca Anderson',
      ],
      requiredRoles: ['MD', 'RN', 'EMT'],
    },
    {
      id: 4,
      shiftTitle: 'Morning Shift - Dental',
      location: 'Dental Clinic, Floor 1',
      status: 'Pending Confirmation',
      date: '2025-05-10',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      requiredStaff: {
        current: 2,
        total: 2,
      },
      assignedStaff: ['Sophia Martinez', "Jennifer O'Connor"],
      requiredRoles: ['DDS', 'DA'],
    },
    {
      id: 5,
      shiftTitle: 'Night Shift - Psychiatry',
      location: 'Mental Health Wing, Floor 4',
      status: 'Available',
      date: '2025-05-11',
      startTime: '1:00 PM',
      endTime: '5:00 PM',
      requiredStaff: {
        current: 0,
        total: 2,
      },
      assignedStaff: [],
      requiredRoles: ['MD', 'RN'],
    },
    {
      id: 6,
      shiftTitle: 'Morning Shift - Cardiology',
      location: 'Cardiac Care Unit, Floor 3',
      status: 'Partially Assigned',
      date: '2025-05-12',
      startTime: '11:00 AM',
      endTime: '3:00 PM',
      requiredStaff: {
        current: 1,
        total: 3,
      },
      assignedStaff: ['Amir Patel'],
      requiredRoles: ['MD', 'RN', 'Tech'],
    },
  ];
  allShiftList = [...this.shiftList];
  staffList = [
    {
      id: 1,
      name: 'Emily Johnson',
      title: 'Dr.',
      department: 'General Medicine',
      status: 'Available',
      roles: ['MD', 'Internal Medicine'],
      availability: {
        hours: { startTime: '8:00 AM', endTime: '5:00 PM' },
        days: ['Monday', 'Wednesday', 'Friday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520female%252520with%252520short%252520brown%252520hair%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=1&orientation=squarish',
    },
    {
      id: 2,
      name: 'Amir Patel',
      title: 'Dr.',
      department: 'Cardiology',
      status: 'Assigned',
      roles: ['MD', 'Cardiology'],
      availability: {
        hours: { startTime: '9:00 AM', endTime: '6:00 PM' },
        days: ['Tuesday', 'Thursday', 'Friday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520middle%252520eastern%252520man%252520with%252520dark%252520hair%252520and%252520beard%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=6&orientation=squarish',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Dr.',
      department: 'Pediatrics',
      status: 'Assigned',
      roles: ['MD', 'Pediatrics'],
      availability: {
        hours: { startTime: '8:00 AM', endTime: '4:00 PM' },
        days: ['Monday', 'Wednesday', 'Thursday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520asian%252520male%252520with%252520glasses%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=2&orientation=squarish',
    },
    {
      id: 4,
      name: 'David Washington',
      title: 'Dr.',
      department: 'Emergency Medicine',
      status: 'Assigned',
      roles: ['MD', 'Emergency'],
      availability: {
        hours: { startTime: '7:00 PM', endTime: '7:00 AM' },
        days: ['Thursday', 'Friday', 'Saturday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520african%252520american%252520male%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=4&orientation=squarish',
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      title: 'Dr.',
      department: 'Dental',
      status: 'Pending',
      roles: ['DDS', 'Orthodontics'],
      availability: {
        hours: { startTime: '9:00 AM', endTime: '5:00 PM' },
        days: ['Monday', 'Tuesday', 'Wednesday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520latina%252520woman%252520with%252520long%252520dark%252520hair%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=3&orientation=squarish',
    },
    {
      id: 6,
      name: 'Rebecca Anderson',
      title: 'RN',
      department: 'Emergency',
      status: 'Assigned',
      roles: ['RN', 'Critical Care'],
      availability: {
        hours: { startTime: '7:00 PM', endTime: '7:00 AM' },
        days: ['Thursday', 'Friday', 'Saturday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520blonde%252520woman%252520with%252520medium%252520length%252520hair%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=5&orientation=squarish',
    },
    {
      id: 7,
      name: "Jennifer O'Connor",
      title: 'DA',
      department: 'Dental',
      status: 'Pending',
      roles: ['DA', 'Dental Hygiene'],
      availability: {
        hours: { startTime: '9:00 AM', endTime: '5:00 PM' },
        days: ['Monday', 'Tuesday', 'Wednesday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520woman%252520with%252520red%252520hair%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=7&orientation=squarish',
    },
    {
      id: 8,
      name: 'Thomas Wilson',
      title: 'Dr.',
      department: 'Psychiatry',
      status: 'Available',
      roles: ['MD', 'Psychiatry'],
      availability: {
        hours: { startTime: '10:00 AM', endTime: '6:00 PM' },
        days: ['Monday', 'Wednesday', 'Friday'],
      },
      image:
        'https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520caucasian%252520man%252520with%252520blonde%252520hair%25252C%252520smiling%25252C%252520professional%252520attire%25252C%252520neutral%252520background%25252C%252520high%252520quality%252520portrait&width=50&height=50&seq=8&orientation=squarish',
    },
  ];
  allStaffList = [...this.staffList];
  shiftTabList: any[] = [
    {
      id: 1,
      name: 'All Shift',
      count: 10,
      icon: 'ri-apps-line',
    },
    {
      id: 2,
      name: 'Unassigned',
      count: 2,
      icon: 'ri-file-list-line',
    },
    {
      id: 3,
      name: 'Upcoming',
      count: 8,
      icon: 'ri-eye-line',
    },
  ];
  activeShiftTab: number = 1;
  shiftTabsSchema: TabsSchema<ShiftAssignComponent, any> = {
    parentComponent: this,
    tabList: this.shiftTabList,
    activeTab: this.activeShiftTab,
    searchInput: false,
    tabChange: this.switchShiftTab,
  };
  staffTabList: any[] = [
    {
      id: 1,
      name: 'All Staff',
      count: 10,
      icon: 'ri-apps-line',
    },
    {
      id: 2,
      name: 'Available',
      count: 2,
      icon: 'ri-file-list-line',
    },
    {
      id: 3,
      name: 'Assigned',
      count: 8,
      icon: 'ri-eye-line',
    },
  ];
  activeStaffTab: number = 1;
  staffTabsSchema: TabsSchema<ShiftAssignComponent, any> = {
    parentComponent: this,
    tabList: this.staffTabList,
    activeTab: this.activeStaffTab,
    searchInput: false,
    tabChange: this.switchStaffTab,
  };
  searchInput = new Subject<{ event: any; type: string }>();
  assignmentModal: boolean = false;
  shiftDetailsModal: boolean = false;
  removeStaffModal: boolean = false;
  confirmationModal: boolean = false;

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
    private columnFormateService: ColumnFormateService
  ) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Shift Management' },
      { label: 'Shift Assign', active: true },
    ]);
  }

  ngOnInit() {
    this.searchInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(({ event, type }) => {
        if (type === 'shift') {
          const searchTerm = event?.target?.value?.toLowerCase() || '';
          this.shiftList = this.allShiftList.filter(
            (shift) =>
              shift.shiftTitle.toLowerCase().includes(searchTerm) ||
              shift.location.toLowerCase().includes(searchTerm)
          );
        }
        if (type === 'staff') {
          const searchTerm = event?.target?.value?.toLowerCase() || '';
          this.staffList = this.allStaffList.filter(
            (staff) =>
              staff.name.toLowerCase().includes(searchTerm) ||
              staff.department.toLowerCase().includes(searchTerm)
          );
        }
      });
  }

  switchShiftTab(
    tabsSchema: TabsSchema<ShiftAssignComponent, any>,
    event: any
  ) {
    switch (event) {
      case 1:
        tabsSchema.parentComponent.shiftList = [
          ...tabsSchema.parentComponent.allShiftList,
        ];
        break;
    }
  }

  switchStaffTab(
    tabsSchema: TabsSchema<ShiftAssignComponent, any>,
    event: any
  ) {
    switch (event) {
      case 1:
        tabsSchema.parentComponent.staffList = [
          ...tabsSchema.parentComponent.allStaffList,
        ];
        break;
      case 2:
        tabsSchema.parentComponent.staffList =
          tabsSchema.parentComponent.allStaffList.filter(
            (staff) => staff.status === StatusType.Available
          );
        break;
      case 3:
        tabsSchema.parentComponent.staffList =
          tabsSchema.parentComponent.allStaffList.filter(
            (staff) => staff.status === StatusType.Assigned
          );
        break;
    }
  }

  onDragStart(event: DragEvent, staff: any) {
    this.draggedElement = staff;
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('opacity-50');
    }
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', staff.id.toString());

      // Create custom drag image
      const dragImage = event.target as HTMLElement;
      const clone = dragImage.cloneNode(true) as HTMLElement;
      clone.classList.add('staff-card-mini', 'opacity-90', 'shadow-lg');
      clone.style.position = 'absolute';
      clone.style.top = '-1000px';
      document.body.appendChild(clone);
      event.dataTransfer.setDragImage(clone, 20, 20);
      setTimeout(() => {
        document.body.removeChild(clone);
      }, 0);
    }
  }

  onDragEnd(event: DragEvent) {
    if (event.target instanceof HTMLElement) {
      event.target.classList.remove('opacity-50');
    }
    this.draggedElement = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const dropZone = event.target.closest('.drop-zone');
      if (dropZone && !dropZone.classList.contains('drag-over')) {
        dropZone.classList.add('drag-over');
      }
    }
  }

  onDragLeave(event: Event) {
    if (event.target instanceof HTMLElement) {
      const dropZone = event.target.closest('.drop-zone');
      if (dropZone) {
        dropZone.classList.remove('drag-over');
      }
    }
  }

  onDrop(event: DragEvent, shift: any) {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const dropZone = event.target.closest('.drop-zone');
      if (dropZone) {
        dropZone.classList.remove('drag-over');
      }
    }

    if (event.dataTransfer) {
      if (shift) {
        this.assignStaffToShift(this.draggedElement, shift);
      }
    }
  }

  private assignStaffToShift(staff: any, shift: any) {
    // Implement your assignment logic here
    console.log(`Assigning staff ${staff.id} to shift ${shift.id}`);
    // Call your API or service method
  }

  createIconUsingName(data: any, key: string) {
    return this.columnFormateService.formatAvatarName(data, key);
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
