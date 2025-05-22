import { SelectionComponent } from '../../../shared/ui/fields/selection/selection.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { BadgesComponent } from '../../../shared/ui/badges/badges.component';
import { TabsComponent } from '../../../shared/component/tabs/tabs.component';
import { SimpleInputComponent } from '../../../shared/ui/fields/simple-input/simple-input.component';
import { TabsSchema } from '../../../shared/component/tabs/tabs.component.models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { StatusType } from '../../../core/enums/common.enum';
import { DateComponent } from '../../../shared/ui/fields/date/date.component';

@Component({
  selector: 'app-employer-task-management',
  templateUrl: './employer-task-management.component.html',
  styleUrls: ['./employer-task-management.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgesComponent, TabsComponent, SimpleInputComponent, SelectionComponent, DateComponent],
})
export class EmployerTaskManagementComponent {
  // Task related variables
  taskList = [
    {
      id: 1,
      title: 'Update patient records system',
      description:
        'Ensure all recent patient data is correctly entered into the system before the end of day.',
      status: 'In Progress',
      dueDate: '2025-05-07T17:00:00',
      priority: 'High',
      assignedTo: ['Emily Johnson'],
      tags: ['Admin', 'Records'],
      archived: false,
    },
    {
      id: 2,
      title: 'Prepare emergency response training',
      description:
        'Create materials and schedule for the quarterly emergency response training session.',
      status: 'To Do',
      dueDate: '2025-05-10T15:00:00',
      priority: 'High',
      assignedTo: ['David Washington'],
      tags: ['Training', 'Emergency'],
      archived: false,
    },
    {
      id: 3,
      title: 'Review nursing staff schedules',
      description:
        'Evaluate current nursing schedules and make adjustments for the upcoming month.',
      status: 'In Progress',
      dueDate: '2025-05-12T12:00:00',
      priority: 'Medium',
      assignedTo: ['Rebecca Anderson'],
      tags: ['Scheduling', 'Nursing'],
      archived: false,
    },
    {
      id: 4,
      title: 'Order medical supplies',
      description:
        'Inventory current supplies and place orders for items running low.',
      status: 'Completed',
      dueDate: '2025-05-06T16:00:00',
      priority: 'Low',
      assignedTo: ['Sophia Martinez'],
      tags: ['Inventory', 'Supplies'],
      archived: false,
    },
    {
      id: 5,
      title: 'Coordinate patient transfer procedures',
      description:
        'Update and distribute new patient transfer protocols to all departments.',
      status: 'To Do',
      dueDate: '2025-05-15T11:00:00',
      priority: 'Medium',
      assignedTo: ['Michael Chen'],
      tags: ['Protocols', 'Coordination'],
      archived: false,
    },
    {
      id: 6,
      title: 'Update staff contact information',
      description:
        'Verify and update emergency contact information for all staff members.',
      status: 'To Do',
      dueDate: '2025-05-20T14:00:00',
      priority: 'Low',
      assignedTo: ["Jennifer O'Connor"],
      tags: ['HR', 'Admin'],
      archived: false,
    },
  ];
  allTaskList = [...this.taskList];
  taskTabList: any[] = [
    {
      id: 1,
      name: 'All Tasks',
      count: 0,
      icon: 'ri-apps-line',
    },
    {
      id: 2,
      name: 'To Do',
      count: 0,
      icon: 'ri-list-check-2',
    },
    {
      id: 3,
      name: 'In Progress',
      count: 0,
      icon: 'ri-loader-4-line',
    },
    {
      id: 4,
      name: 'Completed',
      count: 0,
      icon: 'ri-checkbox-circle-line',
    },
    {
      id: 5,
      name: 'Archived',
      count: 0,
      icon: 'ri-archive-line',
    },
  ];
  activeTaskTab: number = 1;
  taskTabsSchema: TabsSchema<EmployerTaskManagementComponent, any> = {
    parentComponent: this,
    tabList: this.taskTabList,
    activeTab: this.activeTaskTab,
    searchInput: false,
    tabChange: this.switchTaskTab,
  };
  // Staff related variables
  staffList = [
    {
      id: 1,
      name: 'Emily Johnson',
      title: 'Dr.',
      department: 'General Medicine',
      status: 'Busy',
      roles: ['MD', 'Internal Medicine'],
      taskCount: 2,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520female%25252520with%25252520short%25252520brown%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=1&orientation=squarish',
    },
    {
      id: 2,
      name: 'Amir Patel',
      title: 'Dr.',
      department: 'Cardiology',
      status: 'Available',
      roles: ['MD', 'Cardiology'],
      taskCount: 0,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520middle%25252520eastern%25252520man%25252520with%25252520dark%25252520hair%25252520and%25252520beard%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=6&orientation=squarish',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Dr.',
      department: 'Pediatrics',
      status: 'Busy',
      roles: ['MD', 'Pediatrics'],
      taskCount: 1,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520an%25252520asian%25252520male%25252520with%25252520glasses%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=2&orientation=squarish',
    },
    {
      id: 4,
      name: 'David Washington',
      title: 'Dr.',
      department: 'Emergency Medicine',
      status: 'Busy',
      roles: ['MD', 'Emergency'],
      taskCount: 1,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520an%25252520african%25252520american%25252520male%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=4&orientation=squarish',
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      title: 'Dr.',
      department: 'Dental',
      status: 'Available',
      roles: ['DDS', 'Orthodontics'],
      taskCount: 1,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520latina%25252520woman%25252520with%25252520long%25252520dark%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=3&orientation=squarish',
    },
    {
      id: 6,
      name: 'Rebecca Anderson',
      title: 'RN',
      department: 'Emergency',
      status: 'Busy',
      roles: ['RN', 'Critical Care'],
      taskCount: 1,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520blonde%25252520woman%25252520with%25252520medium%25252520length%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=5&orientation=squarish',
    },
    {
      id: 7,
      name: "Jennifer O'Connor",
      title: 'DA',
      department: 'Dental',
      status: 'Available',
      roles: ['DA', 'Dental Hygiene'],
      taskCount: 1,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520woman%25252520with%25252520red%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=7&orientation=squarish',
    },
    {
      id: 8,
      name: 'Thomas Wilson',
      title: 'Dr.',
      department: 'Psychiatry',
      status: 'Available',
      roles: ['MD', 'Psychiatry'],
      taskCount: 0,
      image:
        'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520caucasian%25252520man%25252520with%25252520blonde%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=8&orientation=squarish',
    },
  ];
  allStaffList = [...this.staffList];
  staffTabList: any[] = [
    {
      id: 1,
      name: 'All Staff',
      count: 0,
      icon: 'ri-team-line',
    },
    {
      id: 2,
      name: 'Available',
      count: 0,
      icon: 'ri-user-follow-line',
    },
    {
      id: 3,
      name: 'Busy',
      count: 0,
      icon: 'ri-user-star-line',
    },
  ];
  activeStaffTab: number = 1;
  staffTabsSchema: TabsSchema<EmployerTaskManagementComponent, any> = {
    parentComponent: this,
    tabList: this.staffTabList,
    activeTab: this.activeStaffTab,
    searchInput: false,
    tabChange: this.switchStaffTab,
  };
  searchInput = new Subject<{ event: any; type: string }>();
  staffImages: { [key: string]: string } = {
    'Emily Johnson':
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520female%25252520with%25252520short%25252520brown%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=1&orientation=squarish',
    'David Washington':
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520an%25252520african%25252520american%25252520male%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=4&orientation=squarish',
    'Rebecca Anderson':
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520blonde%25252520woman%25252520with%25252520medium%25252520length%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=5&orientation=squarish',
    'Sophia Martinez':
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520latina%25252520woman%25252520with%25252520long%25252520dark%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=3&orientation=squarish',
    'Michael Chen':
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520an%25252520asian%25252520male%25252520with%25252520glasses%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=2&orientation=squarish',
    "Jennifer O'Connor":
      'https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520woman%25252520with%25252520red%25252520hair%2525252C%25252520smiling%2525252C%25252520professional%25252520attire%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%25252520portrait&width=50&height=50&seq=7&orientation=squarish',
  };
  selectedTask: any = null;
  advancedSettingsModal: boolean = false;
  createTaskModal: boolean = false;
  assignTaskModal: boolean = false;
  confirmationModal: boolean = false;

  getStaffImage(staffName: string): string {
    return (
      this.staffImages[staffName] ||
      'https://readdy.ai/api/search-image?query=placeholder%2520avatar&width=50&height=50'
    );
  }

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Task Management', active: true },
    ]);
  }

  ngOnInit() {
    this.searchInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(({ event, type }) => {
        if (type === 'task') {
          const searchTerm = event?.target?.value?.toLowerCase() || '';
          this.taskList = this.allTaskList.filter((shift) =>
            shift.title.toLowerCase().includes(searchTerm)
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

  switchTaskTab(
    tabsSchema: TabsSchema<EmployerTaskManagementComponent, any>,
    event: any
  ) {
    switch (event) {
      case 1:
        tabsSchema.parentComponent.taskList = [
          ...tabsSchema.parentComponent.allTaskList,
        ];
        break;
      case 2:
        tabsSchema.parentComponent.taskList =
          tabsSchema.parentComponent.allTaskList.filter(
            (staff) => staff.status === StatusType.ToDo
          );
        break;
      case 3:
        tabsSchema.parentComponent.taskList =
          tabsSchema.parentComponent.allTaskList.filter(
            (staff) => staff.status === StatusType.InProgress
          );
        break;
      case 4:
        tabsSchema.parentComponent.taskList =
          tabsSchema.parentComponent.allTaskList.filter(
            (staff) => staff.status === StatusType.Completed
          );
        break;
      case 5:
        tabsSchema.parentComponent.taskList =
          tabsSchema.parentComponent.allTaskList.filter(
            (staff) => staff.status === StatusType.Archived
          );
        break;
    }
  }

  switchStaffTab(
    tabsSchema: TabsSchema<EmployerTaskManagementComponent, any>,
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
            (staff) => staff.status === StatusType.Busy
          );
        break;
    }
  }

  onDragStart(event: DragEvent, staff: any) {
    const data = {
      staffId: staff.id,
      staffName: staff.name,
      roles: staff.roles,
    };
    event.dataTransfer!.setData('text/plain', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
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

  onDrop(event: DragEvent, task: any) {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const dropZone = event.target.closest('.drop-zone');
      if (dropZone) {
        dropZone.classList.remove('drag-over');
      }
    }
    const data = JSON.parse(event.dataTransfer!.getData('text/plain'));
    if (!task.assignedTo.includes(data.staffName)) {
      task.assignedTo.push(data.staffName);
      console.log(`Assigned ${data.staffName} to task ${task.title}`);
      // TODO: Validate staff roles/availability and update backend
    }
  }

  viewTaskDetails(task: any) {
    this.selectedTask = task;
  }

  archiveTask(task: any) {
    task.archived = true;
    console.log(`Archived task: ${task.title}`);
    // TODO: Update backend to persist archived status
  }

  duplicateTask(task: any) {
    const newTask = {
      ...task,
      id: this.taskList.length + 1,
      title: `Copy of ${task.title}`,
      archived: false,
    };
    this.taskList.push(newTask);
    console.log(`Duplicated task: ${task.title} as ${newTask.title}`);
    // TODO: Update backend to persist new task
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
