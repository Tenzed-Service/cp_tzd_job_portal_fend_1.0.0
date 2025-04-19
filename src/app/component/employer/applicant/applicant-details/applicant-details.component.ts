import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'],
  standalone: true,
  imports: [CommonModule, PaginationComponent],
})
export class ApplicantDetailsComponent {

  constructor(private singletonStoreService: SingletonStoreService) {
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Applicants', url: '/applicants' },
      { label: 'Applicant Details', active: true },
    ]);
  }
}
