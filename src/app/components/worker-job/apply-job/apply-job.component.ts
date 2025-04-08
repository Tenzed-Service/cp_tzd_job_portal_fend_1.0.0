import { SingletonStoreService } from "../../../core/services/helper/singleton-store.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageWrapperComponent } from "../../../shared/components/page-wrapper/page-wrapper.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionTypeEnum,
  ResponseCodeEnum,
} from "../../../core/enums/common.enum";
import { APIResponseVM } from "../../../core/models/common/common.model";
import { TZDJobService } from "../../../core/services/api/tzd-job.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { SaveTZDJobApplyReqVM } from "../../../core/models/api/tzd-job.model";

@Component({
  selector: "app-apply-job",
  standalone: true,
  imports: [
    PageWrapperComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: "./apply-job.component.html",
  styleUrl: "./apply-job.component.scss",
})
export class ApplyJobComponent implements OnInit, OnDestroy {
  jobApplyForm: FormGroup;
  jobId: number = 0;
  jobApplyId: number = 0;
  backPath: string = "/worker-jobs";

  constructor(
    private singletonStoreService: SingletonStoreService,
    private activeRouter: ActivatedRoute,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.singletonStoreService.sectionHeader.next("Apply Job");

    this.jobId = Number(this.activeRouter.snapshot.paramMap.get("jobId")!);
    this.jobApplyId = Number(
      this.activeRouter.snapshot.paramMap.get("jobApplyId")!
    );
    if (this.jobApplyId && this.jobId) {
      this.backPath = `jobs/job-apply-workers/${this.jobId}`;
    } else {
      this.backPath = "/worker-jobs";
    }
  }

  ngOnInit(): void {
    this.jobApplyForm = new FormGroup({
      comment: new FormControl("", [Validators.required]),
    });
  }

  submitForm(jobApplyStatus: number) {
    this.jobApplyForm.markAllAsTouched();
    if (this.jobApplyForm.invalid) {
      return;
    }
    this.singletonStoreService.action.next(ActionTypeEnum.Add);
    if (this.jobApplyId) {
      const payload: SaveTZDJobApplyReqVM = {
        jobApplyId: this.jobApplyId,
        jobApplyStatus: jobApplyStatus,
        remark: this.jobApplyForm.value.comment,
      };

      this.tzdJobService.save_tzd_company_worker_job_status(payload).subscribe({
        next: (res: APIResponseVM<any[]>) => {
          if (res.responseCode === ResponseCodeEnum.SUCCESS) {
            this.notificationService.showSuccess(res?.message);
            this.closeSection();
          } else {
            this.notificationService.showError(res?.message);
          }
        },
      });
    } else if (this.jobId) {
      const payload: SaveTZDJobApplyReqVM = {
        jobApplyId: null,
        jobId: this.jobId,
        jobApplyStatus: jobApplyStatus,
        comments: this.jobApplyForm.value.comment,
      };

      this.tzdJobService.save_tzd_job_apply(payload).subscribe({
        next: (res: APIResponseVM<any[]>) => {
          if (res.responseCode === ResponseCodeEnum.SUCCESS) {
            this.notificationService.showSuccess(res?.message);
            this.closeSection();
          } else {
            this.notificationService.showError(res?.message);
          }
        },
      });
    }
  }

  closeSection() {
    setTimeout(() => {
      this.router.navigateByUrl(this.backPath);
    });
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next("");
  }
}
