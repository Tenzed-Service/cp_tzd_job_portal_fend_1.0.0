import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormJobComponent } from '../form-job/form-job.component';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [PageWrapperComponent, FormJobComponent],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent {

}
