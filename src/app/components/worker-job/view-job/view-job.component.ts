import { SingletonStoreService } from "../../../core/services/helper/singleton-store.service";
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { PageWrapperComponent } from "../../../shared/components/page-wrapper/page-wrapper.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionTypeEnum,
  ResponseCodeEnum,
} from "../../../core/enums/common.enum";
import { TZDJobService } from "../../../core/services/api/tzd-job.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { isPlatformBrowser } from "@angular/common";
import { Select } from "@ngxs/store";
import { RoleAuthorizeState } from "../../../shared/store/state/role-management.state";
import { Observable } from "rxjs";
import { APIResponseVM } from "../../../core/models/common/common.model";
import { JobTypeEnum } from "../../../core/enums/job.enum";
import { GetJobDetailsResVM } from "../../../core/models/api/tzd-job.model";
// import { ActionTypeEnum, ResponseCodeEnum } from '../../../core/enums/common.enum';
// import { APIResponseVM } from '../../../core/models/common/common.model';
// import { TZDJobService } from '../../../core/services/api/tzd-job.service';

@Component({
  selector: "app-view-job",
  standalone: true,
  imports: [
    PageWrapperComponent, 
    ButtonComponent
  ],
  templateUrl: "./view-job.component.html",
  styleUrl: "./view-job.component.scss",
})
export class ViewJobComponent implements OnInit, OnDestroy {
  jobId: number = 0;
  formCode: any;
  @Select(RoleAuthorizeState.roleAuthorizeMenu)
  roleAuthorizeMenu$: Observable<any>;

  jobDetails:GetJobDetailsResVM;
  jobTypeEnum = JobTypeEnum;
    // userTypeEnum = UserTypeEnum;

  constructor(
    private singletonStoreService: SingletonStoreService,
    private activeRouter: ActivatedRoute,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  )
  {
    this.singletonStoreService.sectionHeader.next("Job Details");
    this.jobId = Number(this.activeRouter.snapshot.paramMap.get("id")!);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.roleAuthorizeMenu$.subscribe({
        next: (res) => {
          if (res) {
            this.formCode = res?.find(
              (data: any) => data?.route == "/worker-jobs"
            )?.formCode;
            this.singletonStoreService.formCode.next(this.formCode);
            this.singletonStoreService.action.next(ActionTypeEnum.View);
            if (this.jobId) {
              this.getJobData();
            }
          }
        },
      });
    }
  }

  getJobData() {
    this.singletonStoreService.isLoading.next(true);
    this.tzdJobService.get_tzd_job(this.jobId).subscribe({
      next: (res:APIResponseVM<GetJobDetailsResVM>) => {
        if (res.responseCode === ResponseCodeEnum.SUCCESS) {
          console.log(res);
          this.jobDetails = res?.data;
        } else {
          this.notificationService.showError(res?.message);
        }
        this.singletonStoreService.isLoading.next(false);
      },
      error: (err) => {
        this.singletonStoreService.isLoading.next(false);
      },
    });
  }

  jobApply(){
    this.router.navigate([`/worker-jobs/apply/${this.jobDetails?.jobId}`]);
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next("");
  }
}
