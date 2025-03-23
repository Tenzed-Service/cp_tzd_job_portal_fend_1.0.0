import { Component, Inject, OnDestroy, PLATFORM_ID } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PageWrapperComponent } from "../../shared/components/page-wrapper/page-wrapper.component";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
// import { TableClickedAction } from "../../shared/interface/table.interface";
import { HasPermissionDirective } from "../../shared/directive/has-permission.directive";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { ActionTypeEnum, ResponseCodeEnum, UserTypeEnum } from "../../core/enums/common.enum";
import { SingletonStoreService } from "../../core/services/helper/singleton-store.service";
import { RoleAuthorizeState } from "../../shared/store/state/role-management.state";
import {
  APIResponseVM,
  // TableConfigVM,
} from "../../core/models/common/common.model";
import { GetTZDJobListReqVM } from "../../core/models/api/tzd-job.model";
import { TZDJobService } from "../../core/services/api/tzd-job.service";
import { NotificationService } from "../../shared/services/notification.service";
// import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JobCardSectionComponent } from "./job-card-section/job-card-section.component";
import { JobListTypeEnum } from "../../core/enums/job.enum";
import { TableClickedAction } from "../../shared/interface/table.interface";

@Component({
  selector: "app-worker-job",
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    HasPermissionDirective,
    PageWrapperComponent,
    CommonModule,
    JobCardSectionComponent
  ],
  templateUrl: "./worker-job.component.html",
  styleUrl: "./worker-job.component.scss",
})
export class WorkerJobComponent implements OnDestroy {
  @Select(RoleAuthorizeState.roleAuthorizeMenu)
  roleAuthorizeMenu$: Observable<any>;

  filter: {
    search: "",
    pageSize: 10,
    pageNo: 1,
    formCode: 0,
    layoutId: null,
    commonSearch: [],
  }
  formCode: any;
  jobConfig:any[]=[];
  jobListTypeEnum = JobListTypeEnum;
  selectedStatus: number = this.jobListTypeEnum.ALL;
  totalRecords: number = 0;
  filterPills: any[] = [
    {
      value: this.jobListTypeEnum.JOB_APPLIED,
      label: 'Applied',
      countKey: 'total_pending_orders',
      color: 'pending',
    },
    {
      value: this.jobListTypeEnum.JOB_REVIEWED,
      label: 'Reviewed',
      countKey: 'total_processing_orders',
      color: 'processing',

    },
    {
      value: this.jobListTypeEnum.JOB_REJECTED,
      label: 'Rejected',
      countKey: 'total_cancelled_orders',
      color: 'cancel',
    },
    {
      value: this.jobListTypeEnum.JOB_APPROVED,
      label: 'Approved',
      countKey: 'total_delivered_orders',
      color: 'completed',
    },
  ];
  getWorkerJobListSubscription: Subscription;
  userTypeEnum = UserTypeEnum;

  constructor(
    public router: Router,
    private singletonStoreService: SingletonStoreService,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    // private modalService: NgbModal,
    // private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.singletonStoreService.sectionHeader.next('Jobs');
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
    this.roleAuthorizeMenu$.subscribe({
      next: (res) => {
        if (res) {
          this.formCode = res?.find(
            (data: any) => data?.route == "/worker-jobs"
          )?.formCode;
          this.singletonStoreService.formCode.next(this.formCode);
          this.singletonStoreService.action.next(ActionTypeEnum.View);
          this.filter = {
            search: "",
            pageSize: 10,
            pageNo: 1,
            formCode: this.formCode,
            layoutId: null,
            commonSearch: [],
          };
          this.loadJobList();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
  }

  loadJobList(jobApplyStatus:number = this.jobListTypeEnum.ALL) {
    this.singletonStoreService.isLoading.next(true);
    if (this.getWorkerJobListSubscription) {
      this.getWorkerJobListSubscription.unsubscribe();
    } 
    const payload: GetTZDJobListReqVM = {
      search: this.filter?.search,
      pageSize: this.filter?.pageSize,
      pageNo: this.filter?.pageNo,
      formCode: this.filter?.formCode,
      layoutId: this.filter?.layoutId,
      jobApplyStatus: jobApplyStatus,
      commonSearch: this.filter?.commonSearch,
      formTabTypeId: 0,
    };
      this.getWorkerJobListSubscription = this.tzdJobService.get_tzd_worker_job_list(payload).subscribe({
      next: (res: APIResponseVM<any[]>) => {
        if (res.responseCode === ResponseCodeEnum.SUCCESS) {
          this.totalRecords = res?.pager?.totalRecords
            ? res?.pager?.totalRecords
            : 0;
          this.jobConfig = res?.data;
        } else {
          this.notificationService.showError(res?.message);
        }
        this.singletonStoreService.isLoading.next(false);
      },
      error:(err)=>{
        this.singletonStoreService.isLoading.next(false);
      }
    });
  }

   onActionClicked(action: TableClickedAction) {
      if (action.actionToPerform == 'view'){
        this.router.navigate([`/worker-jobs/view/${action?.data?.jobId}`]);
      }else if (action.actionToPerform == 'apply'){
        this.router.navigate([`/worker-jobs/apply/${action?.data?.jobId}`]);
      }
    }


  onTableChange(data?: any) {
    this.filter = { 
      ...this.filter, 
      pageNo: data?.search === '' ? (data?.pageNo ? data?.pageNo : 1) : 1, 
      pageSize:data?.pageSize ? data?.pageSize : 10,  
      search: data?.search ? data?.search : '',   
    }
    this.loadJobList();
  }

  filterOrder(status: number) {
    this.selectedStatus = status;
    this.loadJobList(status);
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next('');
    if (this.getWorkerJobListSubscription) {
      this.getWorkerJobListSubscription.unsubscribe();      
    }
  }
}
