import { routes } from './../../../app.routes';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTypeEnum } from '../../../core/enums/common.enum';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card-section',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './job-card-section.component.html',
  styleUrl: './job-card-section.component.scss'
})
export class JobCardSectionComponent implements OnInit {

  @Input() jobConfig:any[]=[];
  jobTypeEnum = JobTypeEnum;

  constructor(
    private router: Router
  ){
  }

  ngOnInit(): void { 
  }

  applyJob(jobId:number){
    this.router.navigate([`/jobs/apply/${jobId}`]);
  }
}
