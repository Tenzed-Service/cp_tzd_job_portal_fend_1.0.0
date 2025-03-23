import { UserTypeEnum } from './../../../core/enums/common.enum';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTypeEnum } from '../../../core/enums/job.enum';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

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
  @Input() userType:string = UserTypeEnum.COMPANY;
  @Output() cardAction = new EventEmitter();
  jobTypeEnum = JobTypeEnum;
  userTypeEnum = UserTypeEnum;

  constructor(
  ){
  }

  ngOnInit(): void {
  }

  action(type:string,data:any){
    this.cardAction.emit({
      actionToPerform: type,
      data: data,
      value: ''
  });
  }
}
