import { Component, OnDestroy } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormJobComponent } from '../form-job/form-job.component';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [PageWrapperComponent, FormJobComponent],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent implements OnDestroy {

  constructor(
    private singletonStoreService: SingletonStoreService
  ){
    this.singletonStoreService.sectionHeader.next('Edit Job');
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next('');
  }
}
