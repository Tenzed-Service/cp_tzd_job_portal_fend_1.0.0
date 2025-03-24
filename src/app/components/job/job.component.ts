import { Component, Inject, OnDestroy, PLATFORM_ID, ViewChild } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PageWrapperComponent } from "../../shared/components/page-wrapper/page-wrapper.component";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { TableClickedAction } from "../../shared/interface/table.interface";
import { HasPermissionDirective } from "../../shared/directive/has-permission.directive";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { ActionTypeEnum, ResponseCodeEnum, UserTypeEnum } from "../../core/enums/common.enum";
import { SingletonStoreService } from "../../core/services/helper/singleton-store.service";
import { RoleAuthorizeState } from "../../shared/store/state/role-management.state";
import {
  APIResponseVM,
  TableConfigVM,
} from "../../core/models/common/common.model";
import { DynamicTableComponent } from "../../shared/components/ui/dynamic-table/dynamic-table.component";
import { GetTZDJobListReqVM } from "../../core/models/api/tzd-job.model";
import { TZDJobService } from "../../core/services/api/tzd-job.service";
import { NotificationService } from "../../shared/services/notification.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JobCardSectionComponent } from "../worker-job/job-card-section/job-card-section.component";
import { DeleteModalComponent } from "../../shared/components/ui/modal/delete-modal/delete-modal.component";

@Component({
  selector: "app-job",
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    HasPermissionDirective,
    PageWrapperComponent,
    DynamicTableComponent,
    CommonModule,
    JobCardSectionComponent,
    DeleteModalComponent
  ],
  templateUrl: "./job.component.html",
  styleUrl: "./job.component.scss",
})
export class JobComponent implements OnDestroy {
  @Select(RoleAuthorizeState.roleAuthorizeMenu)
  roleAuthorizeMenu$: Observable<any>;

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  tableConfig: TableConfigVM<any> = {
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
        fieldName: "nameOfOwner",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Owner",
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
        fieldName: "email",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Email",
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
        fieldName: "jobType",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Job Type",
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
        fieldName: "jobStartTime",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "Start Time",
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
        fieldName: "jobEndTime",
        aliasName: "",
        redirectFormCodeField: 0,
        redirectIdField: 0,
        displayFieldName: "End Time",
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
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line" },
      {
        label: "Delete",
        actionToPerform: "delete",
        icon: "ri-delete-bin-line",
      },
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
  formCode: any;
  jobConfig:any[]=[];
  userTypeEnum = UserTypeEnum;

  constructor(
    public router: Router,
    private singletonStoreService: SingletonStoreService,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
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
          this.loadJobList();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  }

  loadJobList() {
    const payload: GetTZDJobListReqVM = {
      search: this.tableConfig.filter?.search,
      pageSize: this.tableConfig.filter?.pageSize,
      pageNo: this.tableConfig.filter?.pageNo,
      formCode: this.tableConfig.filter?.formCode,
      layoutId: this.tableConfig.filter?.layoutId,
      commonSearch: this.tableConfig.filter?.commonSearch,
      formTabTypeId: 0,
    };
    this.tzdJobService.get_job_list(payload).subscribe({
      next: (res: APIResponseVM<any[]>) => {
        if (res.responseCode === ResponseCodeEnum.SUCCESS) {
          // this.productMasterList = res?.data;
          this.tableConfig.data = res?.data;
          this.tableConfig.totalRecords = res?.pager?.totalRecords
            ? res?.pager?.totalRecords
            : 0;
          this.jobConfig = res?.data;
          console.log(this.jobConfig);
          
          // if (res?.layout && res?.layout.length > 0) {
          //   this.tableConfig.columns = res.layout;
          // }
        } else {
          this.notificationService.showError(res?.message);
        }
      }
    });
  }

  onTableChange(data?: any) {
    this.tableConfig.filter = { 
      ...this.tableConfig.filter, 
      pageNo: data?.search === '' ? (data?.pageNo ? data?.pageNo : 1) : 1, 
      pageSize:data?.pageSize ? data?.pageSize : 10,  
      search: data?.search ? data?.search : '',   
    }
    this.loadJobList();
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit'){
      this.edit(action.data)
    } else if (action.actionToPerform == 'delete'){
      // this.delete(action.data)
      this.DeleteModal.openModal('delete',action.data)
    }else if (action.actionToPerform == 'job_apply'){
      if (action?.data?.jobId) {
        this.router.navigateByUrl(`jobs/job-apply-workers/${action?.data?.jobId}`)
      }
    }
  }

  edit(data: any) {
    this.router.navigateByUrl(`/jobs/edit/${data?.jobId}`);
  }

  delete(data: any) {     
    if (data.jobId) {
      this.tzdJobService.delete_tzd_job(data?.jobId).subscribe({
        next: (res) => {
          if (res.responseCode === ResponseCodeEnum.SUCCESS) {
            this.notificationService.showSuccess(res?.message);
            this.modalService.dismissAll();
            this.loadJobList();      
          }else{
            this.notificationService.showError(res?.message);
          }      
        },
        error: (error) => {
          console.error("Error occurred in one of the APIs", error);
        },
      });        
    }else{
      this.notificationService.showError('This job not found.');
    }
  }

  ngOnDestroy(): void {
    this.singletonStoreService.sectionHeader.next('');
  }
}
