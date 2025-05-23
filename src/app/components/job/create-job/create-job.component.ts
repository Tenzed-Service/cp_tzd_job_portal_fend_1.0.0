import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormJobComponent } from '../form-job/form-job.component';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [PageWrapperComponent, FormJobComponent],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss'
})
export class CreateJobComponent {

}
