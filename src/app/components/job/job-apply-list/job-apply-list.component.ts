import { SingletonStoreService } from "../../../core/services/helper/singleton-store.service";
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { PageWrapperComponent } from "../../../shared/components/page-wrapper/page-wrapper.component";
import { DynamicTableComponent } from "../../../shared/components/ui/dynamic-table/dynamic-table.component";
import { isPlatformBrowser } from "@angular/common";
import { Select } from "@ngxs/store";
import { RoleAuthorizeState } from "../../../shared/store/state/role-management.state";
import { filter, Observable } from "rxjs";
import { APIResponseVM } from "../../../core/models/common/common.model";
import {
  ActionTypeEnum,
  ResponseCodeEnum,
} from "../../../core/enums/common.enum";
import { GetTZDCompanyJobApplyWorkerListReqVM } from "../../../core/models/api/tzd-job.model";
import { TZDJobService } from "../../../core/services/api/tzd-job.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TableClickedAction } from "../../../shared/interface/table.interface";

@Component({
  selector: "app-job-apply-list",
  standalone: true,
  imports: [PageWrapperComponent, DynamicTableComponent],
  templateUrl: "./job-apply-list.component.html",
  styleUrl: "./job-apply-list.component.scss",
})
export class JobApplyListComponent implements OnInit, OnDestroy {
  @Select(RoleAuthorizeState.roleAuthorizeMenu)
  roleAuthorizeMenu$: Observable<any>;
  formCode: any;
  tableConfig: any = {
    columns: [
      {
        layoutName: "",
        fieldName: "jobTitle",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Job Title",
        fieldDataType: "VARCHAR",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
      {
        layoutName: "",
        fieldName: "workerName",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Worker Name",
        fieldDataType: "VARCHAR",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
      {
        layoutName: "",
        fieldName: "workerEmail",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Worker Email",
        fieldDataType: "VARCHAR",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
      {
        layoutName: "",
        fieldName: "workerPhoneNo",
        aliasName: "workerCountryCode",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Phone No",
        fieldDataType: "VARCHAR",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
      {
        layoutName: "",
        fieldName: "dueDate",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Due Date",
        fieldDataType: "DATE",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
      {
        layoutName: "",
        fieldName: "jobApplyStatusId",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Status",
        fieldDataType: "STATUS",
        isGroup: false,
        groupingSrNo: 0,
        width: 0,
        alignment: "left",
        sortType: "",
        isFreeze: false,
        isFilter: false,
        aggregateTypeId: 0,
        isRequired: false,
      },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line" },      
    ],
    data: [] as any[],
    totalRecords: 0,
    filter: {
      search: "",
      pageSize: 10,
      pageNo: 1,
      formCode: 0,
      layoutId: null,
      commonSearch: [],
    },
  };
  jobId: number;

  constructor(
    private singletonStoreService: SingletonStoreService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.singletonStoreService.sectionHeader.next("Job Apply Workers");
    this.jobId = Number(this.activeRouter.snapshot.paramMap.get("id")!);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.roleAuthorizeMenu$.subscribe({
        next: (res) => {
          if (res) {
            this.formCode = res?.find(
              (data: any) => data?.route == "/jobs"
            )?.formCode;
            this.singletonStoreService.formCode.next(this.formCode);
            this.singletonStoreService.action.next(ActionTypeEnum.View);
            this.tableConfig.filter = {
              search: "",
              pageSize: 10,
              pageNo: 1,
              formCode: this.formCode,
              layoutId: null,
              commonSearch: [],
            };
            this.loadJobApplyWorkerList();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  loadJobApplyWorkerList() {
    const payload: GetTZDCompanyJobApplyWorkerListReqVM = {
      search: this.tableConfig.filter?.search,
      pageSize: this.tableConfig.filter?.pageSize,
      pageNo: this.tableConfig.filter?.pageNo,
      formCode: this.tableConfig.filter?.formCode,
      layoutId: this.tableConfig.filter?.layoutId,
      commonSearch: this.tableConfig.filter?.commonSearch,
      formTabTypeId: 0,
      jobId: this.jobId,
    };
    this.tzdJobService
      .get_tzd_company_job_apply_worker_list(payload)
      .subscribe({
        next: (res: APIResponseVM<any[]>) => {
          console.log(res);

          if (res.responseCode === ResponseCodeEnum.SUCCESS) {
            // this.productMasterList = res?.data;
            this.tableConfig.data = res?.data;
            this.tableConfig.totalRecords = res?.pager?.totalRecords
              ? res?.pager?.totalRecords
              : 0;

            // if (res?.layout && res?.layout.length > 0) {
            //   this.tableConfig.columns = res.layout;
            // }
          } else {
            this.notificationService.showError(res?.message);
          }
        },
      });
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == "edit") {
      if (action.data && action?.data?.jobApplyId) {
        this.router.navigateByUrl(`jobs/apply-confirmation/${action?.data?.jobApplyId}`)
      }
    }
  }

  onTableChange(data?: any) {
    this.tableConfig.filter = {
      ...this.tableConfig.filter,
      pageNo: data?.search === "" ? (data?.pageNo ? data?.pageNo : 1) : 1,
      pageSize: data?.pageSize ? data?.pageSize : 10,
      search: data?.search ? data?.search : "",
    };
    this.loadJobApplyWorkerList();
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next("");
  }
}
