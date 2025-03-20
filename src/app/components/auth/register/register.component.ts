import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { countryCodes } from "../../../shared/data/country-code";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Values } from "../../../shared/interface/setting.interface";
import { CountryState } from "../../../shared/store/state/country.state";
import {
  Select2Data,
  Select2Module,
  Select2SearchEvent,
  Select2UpdateEvent,
} from "ng-select2-component";
import { Stores } from "../../../shared/interface/store.interface";
import { StoreState } from "../../../shared/store/state/store.state";
import { Router, RouterModule } from "@angular/router";
import { NotificationService } from "../../../shared/services/notification.service";
import { CustomValidators } from "../../../shared/validator/password-match";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { APIResponseVM } from "../../../core/models/common/common.model";
import { ActionTypeEnum, DeviceTypeEnum, ResponseCodeEnum, SystemNameEnum, UserTypeEnum } from "../../../core/enums/common.enum";
import { SaveUserReqVM, UserLoginReqVM } from "../../../core/models/api/user.model";
import { TZDAllActiveDDLListState } from "../../../shared/store/state/tzd-product-master.state";
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BpLanguage, BusinessType, Industry, LegalEntity } from "../../../core/models/api/tzd-product-master.model";
import { AuthService } from "../../../core/services/api/auth.service";
import { Login } from "../../../shared/store/action/auth.action";
import { SingletonStoreService } from "../../../core/services/helper/singleton-store.service";
import { TZDJobService } from "../../../core/services/api/tzd-job.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    RouterModule,
    CommonModule,
    ButtonComponent,
    NgbModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  public registrationForm: FormGroup;
  public codes = countryCodes;
  public hoveredDate: NgbDate | null = null;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null;

  @Select(CountryState.countries) countries$: Observable<Select2Data>;
  @Select(StoreState.selectedStore) store$: Observable<Stores>;
  @Select(TZDAllActiveDDLListState.activeDDLList)
  activeDDLList$: Observable<Values>;

  public states$: Observable<Select2Data>;
  public platformId: boolean;
  countryList: any[] = [];
  allCountryList: any[] = [];
  stateList: any[] = [];
  allStateList: any[] = [];
  cityList: any[] = [];
  allCityList: any[] = [];
  industryList: any[] = [];
  allIndustryList: any[] = [];
  legalEntityList: any[] = [];
  allLegalEntityList: any[] = [];
  businessTypeList: any[] = [];
  allBusinessTypeList: any[] = [];
  languageList: any[] = [];
  allLanguageList: any[] = [];
  selectedUserType: string = '';
  userTypeEnum = UserTypeEnum;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private tzdJobService: TZDJobService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private authService: AuthService,
    private store: Store,
    private singletonStoreService: SingletonStoreService,
    private router: Router
  ) {
    this.platformId = isPlatformBrowser(platformId);

    this.registrationForm = this.formBuilder.group(
      {
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required]),
        countryCode: new FormControl("91"),
        phoneNo: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        password_confirmation: new FormControl("", [Validators.required]),
        countryId: new FormControl(null, [Validators.required]),
        stateId: new FormControl(null, [Validators.required]),
        cityId: new FormControl(null, [Validators.required]),
        pincode: new FormControl(""),
        dateOfBirth: new FormControl(""),
        industryID: new FormControl(null),
        legalEnityId: new FormControl(null),
        businessTypeId: new FormControl(null),
        street1: new FormControl(""),
        street2: new FormControl(""),
        bpLanguageIds: new FormControl([]),
        bpId: new FormControl(null),
      },
      {
        validator: CustomValidators.MatchValidator(
          "password",
          "password_confirmation"
        ),
      }
    );

    this.selectedUserType = this.singletonStoreService.userSelected.getValue();
    this.validations(this.selectedUserType);

    this.countries$.subscribe((option) => {
      this.countryList = option;
      if (this.countryList) {
        this.allCountryList = [...this.countryList];
      }
    });
    this.activeDDLList$.subscribe((result: any) => {
      if (result) {
        if (result?.industry) {
          this.industryList = result?.industry?.map((cn: Industry) => {
            return { ...cn, label: cn?.industryName, value: cn?.industryId };
          });
          this.allIndustryList = [...this.industryList]; 
        }
        if (result?.legalEntity) {
          this.legalEntityList = result?.legalEntity.map((cn: LegalEntity) => {
            return {
              ...cn,
              label: cn?.legalEntityName,
              value: cn?.legalEntityId,
            };
          });
          this.allLegalEntityList = [...this.legalEntityList];          
        }
        if (result?.businessType) {
          this.businessTypeList = result?.businessType.map((cn: BusinessType) => {
            return {
              ...cn,
              label: cn?.businessTypeName,
              value: cn?.businessTypeId,
            };
          });
          this.allBusinessTypeList = [...this.businessTypeList];          
        }
        if (result?.bpLanguage) {
          this.languageList = result?.bpLanguage.map((cn: BpLanguage) => {
            return { ...cn, label: cn?.bpLanguageName, value: cn?.bpLanguageId };
          });
          this.allLanguageList = [...this.languageList];          
        }
      }
    });
  }

  get passwordMatchError() {
    return (
      this.registrationForm.getError("mismatch") &&
      this.registrationForm.get("password_confirmation")?.touched
    );
  }

  validations(selectedUserType:string){
    if (selectedUserType === this.userTypeEnum.COMPANY) {
      this.registrationForm.controls['pincode'].setValidators([Validators.required]);
      this.registrationForm.controls['pincode'].updateValueAndValidity();
      this.registrationForm.controls['industryID'].setValidators([Validators.required]);
      this.registrationForm.controls['industryID'].updateValueAndValidity();
      this.registrationForm.controls['businessTypeId'].setValidators([Validators.required]);
      this.registrationForm.controls['businessTypeId'].updateValueAndValidity();
      this.registrationForm.controls['street1'].setValidators([Validators.required]);
      this.registrationForm.controls['street1'].updateValueAndValidity();
    }else if (selectedUserType === this.userTypeEnum.WORKER) {
      this.registrationForm.controls['pincode'].clearValidators();
      this.registrationForm.controls['pincode'].updateValueAndValidity();
      this.registrationForm.controls['industryID'].clearValidators();
      this.registrationForm.controls['industryID'].updateValueAndValidity();
      this.registrationForm.controls['businessTypeId'].clearValidators();
      this.registrationForm.controls['businessTypeId'].updateValueAndValidity();
      this.registrationForm.controls['street1'].clearValidators();
      this.registrationForm.controls['street1'].updateValueAndValidity();
    }
  }

  searchDropDown(data: Select2SearchEvent, type: string) {
    switch (type) {
      case "country":
        this.countryList = this.allCountryList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.countryList = [...this.allCountryList];
        }

        break;
      case "state":
        this.stateList = this.allStateList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.stateList = [...this.allStateList];
        }
        break;
      case "city":
        this.cityList = this.allCityList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.cityList = [...this.allCityList];
        }
        break;
      case "industry":
        this.industryList = this.allIndustryList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.industryList = [...this.allIndustryList];
        }
        break;
      case "legalEntity":
        this.legalEntityList = this.allLegalEntityList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.legalEntityList = [...this.allLegalEntityList];
        }
        break;
      case "businessType":
        this.businessTypeList = this.allBusinessTypeList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.businessTypeList = [...this.allBusinessTypeList];
        }
        break;
      case "language":
        this.languageList = this.allLanguageList.filter((item) =>
          item.label?.toLowerCase().includes(data?.search?.toLowerCase())
        );
        if (!data?.search) {
          this.languageList = [...this.allLanguageList];
        }
        break;
      default:
        break;
    }
  }

  selectCountryState(data: Select2UpdateEvent, type: string) {
    if (type === "country") {
      this.registrationForm.get("stateId")?.setValue("");
      this.registrationForm.get("cityId")?.setValue("");
      this.cityList = [];
      this.allCityList = [...this.cityList];
      this.stateList = [];
      this.allStateList = [...this.stateList];
      const dataList: any = this.countryList.find(
        (res) => res.countryId === data
      );
      if (dataList?.states) {
        this.stateList = dataList?.states?.map((res: any) => {
          res["label"] = res?.stateName;
          res["value"] = res?.stateId;
          return res;
        });
        this.allStateList = [...this.stateList];
        this.countryList = [...this.allCountryList];
      }
    }
    if (type === "state") {
      this.registrationForm.get("cityId")?.setValue("");
      this.cityList = [];
      this.allCityList = [...this.cityList];
      const dataList: any = this.stateList.find((res) => res.stateId === data);
      if (dataList?.cities) {
        this.cityList = dataList?.cities?.map((res: any) => {
          res["label"] = res?.cityName;
          res["value"] = res?.cityId;
          return res;
        });
        this.allCityList = [...this.cityList];
        this.stateList = [...this.allStateList];
      }
    }
    if (type === "city") {
      this.cityList = [...this.allCityList];
    }
  }

  clearDateRange() {
    this.fromDate = null
    this.toDate = null
    let params = null
    // this.onChangeTable(params, 'daterange')
  }
  
  onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
  
      if(this.fromDate)
        this.registrationForm.controls['dateOfBirth'].setValue(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`);
    }
  
    isHovered(date: NgbDate) {
      return (
        this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
      );
    }
  
    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }
  
    isRange(date: NgbDate) {
      return (
        date.equals(this.fromDate) ||
        (this.toDate && date.equals(this.toDate)) ||
        this.isInside(date) ||
        this.isHovered(date)
      );
    }
  
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

  submit() {
    this.singletonStoreService.action.next(ActionTypeEnum.Add);
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.registrationForm.valid) {
      const selectedUserType = this.singletonStoreService.userSelected.getValue();
      if (selectedUserType === this.userTypeEnum.COMPANY) {
        const payload: SaveUserReqVM = {
          userId: null,
          firstName: this.registrationForm.value?.firstName,
          lastName: this.registrationForm.value?.lastName,
          email: this.registrationForm.value?.email,
          countryCode: this.registrationForm.value?.countryCode,
          phoneNo: this.registrationForm.value?.phoneNo ? this.registrationForm.value?.phoneNo?.toString() : '',
          password: this.registrationForm.value?.password,
          countryId: this.registrationForm.value?.countryId,
          stateId: this.registrationForm.value?.stateId,
          cityId: this.registrationForm.value?.cityId,
          pincode: this.registrationForm.value?.pincode,
          dateOfBirth: this.registrationForm.value?.dateOfBirth,
          industryID: this.registrationForm.value?.industryID,
          legalEnityId: this.registrationForm.value?.legalEnityId,
          businessTypeId: this.registrationForm.value?.businessTypeId,
          street1: this.registrationForm.value?.street1,
          street2: this.registrationForm.value?.street2,
          street3: '',
          bpLanguageIds: this.registrationForm.value?.bpLanguageIds
            ? this.registrationForm.value?.bpLanguageIds?.toString()
            : "",
          status: true,
          bpId: this.registrationForm.value?.bpId,
        };
        this.tzdJobService
        .save_tzd_job_company_registration(payload)
        .subscribe({
          next: (resData: APIResponseVM<any>) => {
            this.loginFunction(resData)
          },
          error: (error: any) => {
            this.notificationService.showError(error);
          },
        });        
      }
      if (selectedUserType === this.userTypeEnum.WORKER) {
        const payload: SaveUserReqVM = {
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName,
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password,
          countryCode: this.registrationForm.value?.countryCode,
          phoneNo: this.registrationForm.value?.phoneNo ? this.registrationForm.value?.phoneNo?.toString() : '',
          countryId: this.registrationForm.value?.countryId,
          stateId: this.registrationForm.value?.stateId,
          cityId: this.registrationForm.value?.cityId,
          userId: 0,
          bpId: 0,
          status: true,
          street1: "",
          street2: "",
          pincode: "",
          dateOfBirth: "",
          industryID: null,
          legalEnityId: null,
          businessTypeId: null,
          bpLanguageIds: ""
        };
        this.tzdJobService
        .save_tzd_job_worker_registration(payload)
        .subscribe({
          next: (resData: APIResponseVM<any>) => {
            this.loginFunction(resData)
          },
          error: (error: any) => {
            this.notificationService.showError(error);
          },
        });        
      }
    }
  }

  loginFunction(resData:APIResponseVM<any>){
    if (resData?.responseCode === ResponseCodeEnum.SUCCESS) {
      this.notificationService.showSuccess(resData?.message);
      const payload:UserLoginReqVM = {
              email: this.registrationForm.value.email,
              password: this.registrationForm.value.password,
              systemName: SystemNameEnum.DESKTOP,
              deviceType: DeviceTypeEnum.DESKTOP,
              isforcedlogin: false
            }
            this.authService.login(payload).subscribe({
              next: (res:any)=>{
                if (res?.responseCode === ResponseCodeEnum.SUCCESS) {
                  this.store.dispatch(new Login(res?.data))
                  this.router.navigateByUrl('/dashboard');
                  this.notificationService.showSuccess(res?.message);
                }else {
                  this.notificationService.showError(res?.Message ? res?.Message : res?.message);
                }
              },
              error: (err)=>{
                  this.notificationService.showError(err?.message);
              }
            })
    } else {
      this.notificationService.showError(resData?.message);
    }
  }
}
