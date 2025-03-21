import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionTypeEnum, ResponseCodeEnum } from '../../../core/enums/common.enum';
import { APIResponseVM } from '../../../core/models/common/common.model';
import { TZDJobService } from '../../../core/services/api/tzd-job.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SaveTZDJobApplyReqVM } from '../../../core/models/api/tzd-job.model';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    PageWrapperComponent, 
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.scss'
})
export class ApplyJobComponent implements OnInit, OnDestroy {

  jobApplyForm: FormGroup;
  jobId: number = 0;

  constructor(
    private singletonStoreService: SingletonStoreService,
    private activeRouter: ActivatedRoute,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    private router: Router
  ){
    this.singletonStoreService.sectionHeader.next('Apply Job');
    this.jobId = Number(this.activeRouter.snapshot.paramMap.get("id")!);
  }

  ngOnInit(): void {
    this.jobApplyForm = new FormGroup({
      comment: new FormControl('',[Validators.required]),
    })
  }

  submitForm(){
    this.jobApplyForm.markAllAsTouched();
    if (this.jobApplyForm.invalid) {
      return;
    }
    this.singletonStoreService.action.next(ActionTypeEnum.Add);
    const payload:SaveTZDJobApplyReqVM = {
      jobApplyId: null,
      jobId: this.jobId,
      jobApplyStatus: 1,
      comments: this.jobApplyForm.value.comment,
    }

     this.tzdJobService
          .save_tzd_job_apply(payload)
          .subscribe({
            next: (res: APIResponseVM<any[]>) => {
              if (res.responseCode === ResponseCodeEnum.SUCCESS) {
                this.notificationService.showSuccess(res?.message);
                this.router.navigateByUrl("/jobs");
              } else {
                this.notificationService.showError(res?.message);
              }
            }
          });
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next('');
  }
}
