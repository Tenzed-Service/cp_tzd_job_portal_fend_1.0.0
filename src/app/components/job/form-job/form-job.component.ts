
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Select2Data, Select2Module, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { countryCodes } from '../../../shared/data/country-code';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { TZDAllActiveDDLListState } from '../../../shared/store/state/tzd-product-master.state';
import { AmountType, BpLanguage, Skill } from '../../../core/models/api/tzd-product-master.model';
import { APIResponseVM } from '../../../core/models/common/common.model';
import { ActionTypeEnum, ResponseCodeEnum } from '../../../core/enums/common.enum';
import { TZDJobService } from '../../../core/services/api/tzd-job.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SaveTZDJobListReqVM } from '../../../core/models/api/tzd-job.model';
import { CountryState } from '../../../shared/store/state/country.state';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { RoleAuthorizeState } from '../../../shared/store/state/role-management.state';
import moment from 'moment';

@Component({
  selector: 'app-form-job',
  standalone: true,
  imports: [
    TranslateModule, FormsModule, ReactiveFormsModule,
    Select2Module, CommonModule, ButtonComponent, FormFieldsComponent,
    ],
  templateUrl: './form-job.component.html',
  styleUrl: './form-job.component.scss'
})
export class FormJobComponent {

  @Select(TZDAllActiveDDLListState.activeDDLList)
  activeDDLList$: Observable<any>;
  @Select(CountryState.countries) countries$: Observable<Select2Data>;
  @Select(RoleAuthorizeState.roleAuthorizeMenu)
  roleAuthorizeMenu$: Observable<any>;
  
  @Input() type: string;

  public jobForm: FormGroup;
  public id: number;
  public codes = countryCodes;
  
  private destroy$ = new Subject<void>();
  latitude: number = 0;
	longitude: number = 0;
  allSkillList:any[] = [];
  skillList:any[] = [];
  amountTypeList:any[] = [];
  platformId: boolean;
  languageList:any[]=[];
  allLanguageList: any[] = [];
  countryList: any[] = [];
  allCountryList: any[] = [];
  stateList: any[] = [];
  allStateList: any[] = [];
  cityList: any[] = [];
  allCityList: any[] = [];
  jobId: number = 0;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private store: Store, 
    private singletonStoreService: SingletonStoreService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private tzdJobService: TZDJobService,
    private notificationService: NotificationService,
    private activeRouter: ActivatedRoute
  ) {
    this.platformId = isPlatformBrowser(platformId);
    this.jobId = Number(this.activeRouter.snapshot.paramMap.get("id")!);    
  }

  ngOnInit() {
    this.getLocation();

    this.countries$.subscribe((option) => {
      this.countryList = option;
      if (this.countryList) {
        this.allCountryList = [...this.countryList];
      }
    });

    this.activeDDLList$.subscribe((result: any) => {
      if (result) {
        if (result?.skill) {
          this.skillList = result?.skill.map((cn: Skill) => {
            return { ...cn, label: cn?.skillName, value: cn?.skillIMasterId };
          });
          this.allSkillList = [...this.skillList];          
        }
        if (result?.amountType) {
          this.amountTypeList = result?.amountType.map((cn: AmountType) => {
            return { ...cn, label: cn?.amountTypeName, value: cn?.amountTypeId };
          });       
        }
        if (result?.bpLanguage) {
          this.languageList = result?.bpLanguage.map((cn: BpLanguage) => {
            return { ...cn, label: cn?.bpLanguageName, value: cn?.bpLanguageId };
          });
          this.allLanguageList = [...this.languageList];          
        }
      }
    });

      this.jobForm = this.formBuilder.group({
        jobTitle: ['', Validators.required],
        description: ['', Validators.required],
        comment: [''],
        nameOfOwner: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dialCode: ['91'],
        contactNo: ['', Validators.required],
        amount: [null, Validators.required],
        jobType: [null, Validators.required],
        jobStartTime: ['', Validators.required],
        jobEndTime: ['', Validators.required],
        experience: [null, Validators.required],
        amountType: [null, Validators.required],
        status: [true],
        dueDate: ['', Validators.required],
        jobLocations: this.formBuilder.array([]),
        jobSkillIds: ['', Validators.required],
        jobLanguageIds: ['', Validators.required]
      });
      if (this.jobId === 0) {
        // Initialize with one location by default
        this.addLocation();
      }
      this.masterAPICall();
  }

   // Getter for form array
   get formControl() {
    return this.jobForm.controls;
  }

  // Getter for form array
  get jobLocations(): FormArray {
    return this.jobForm.get('jobLocations') as FormArray;
  }

  // Add new location
  addLocation(): void {
    this.jobLocations.push(
      this.formBuilder.group({
        address: ['', Validators.required],
        cityId: [null, Validators.required],
        stateId: [null, Validators.required],
        countryId: [null, Validators.required],
        zipCode: ['', Validators.required]
      })
    );
  }

  // Remove location
  removeLocation(index: number): void {
    this.jobLocations.removeAt(index);
  }

  
  masterAPICall() {
    this.roleAuthorizeMenu$.subscribe({
      next: (res) => {
        if (res) {
          const formCode = res?.find(
            (data: any) => data?.route == "/jobs"
          )?.formCode;
          this.singletonStoreService.formCode.next(formCode);
          this.singletonStoreService.action.next(ActionTypeEnum.View);
          if (this.jobId) {
            this.getJobData();
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getJobData(){
    this.tzdJobService.get_tzd_job(this.jobId).subscribe({
      next: (res) => {
        if (res.responseCode === ResponseCodeEnum.SUCCESS) {
          this.formControl['jobTitle'].setValue(res?.data?.jobTitle);
          this.formControl['description'].setValue(res?.data?.description);
          this.formControl['comment'].setValue(res?.data?.comment);
          this.formControl['nameOfOwner'].setValue(res?.data?.nameOfOwner);
          this.formControl['email'].setValue(res?.data?.email);
          this.formControl['dialCode'].setValue(res?.data?.dialCode);
          this.formControl['contactNo'].setValue(res?.data?.contactNo);
          this.formControl['amount'].setValue(res?.data?.amount);
          this.formControl['jobType'].setValue(res?.data?.jobTypeId);
          this.formControl['jobStartTime'].setValue(res?.data?.jobStartTime ? moment(res?.data?.jobStartTime, "DD-MM-YYYY hh:mm:ss A").format("YYYY-MM-DDTHH:mm") : '');
          this.formControl['jobEndTime'].setValue(res?.data?.jobEndTime ? moment(res?.data?.jobEndTime, "DD-MM-YYYY hh:mm:ss A").format("YYYY-MM-DDTHH:mm") : '');
          this.formControl['experience'].setValue(res?.data?.experience);
          this.formControl['amountType'].setValue(res?.data?.amountType);
          this.formControl['status'].setValue(res?.data?.status);
          this.formControl['dueDate'].setValue(res?.data?.dueDate ? moment(res?.data?.dueDate, "DD-MM-YYYY hh:mm:ss A").format("YYYY-MM-DDTHH:mm") : '');
          if (res?.data?.jobSkills) {
            const jobSkillIds = res?.data?.jobSkills.map((data:Skill)=>data?.skillIMasterId);
            this.formControl['jobSkillIds'].setValue(jobSkillIds ? jobSkillIds : []);
          }
          if (res?.data?.languages) {
            const jobLanguageIds = res?.data?.languages.map((data:BpLanguage)=>data?.bpLanguageId);
            this.formControl['jobLanguageIds'].setValue(jobLanguageIds ? jobLanguageIds : []);
          }
          this.latitude = res?.data?.latitude;
          this.longitude = res?.data?.longitude;
          if (res?.data?.jobLocation) {
            res?.data?.jobLocation.forEach((location:any) => {
              this.selectCountryState(location?.countryId,'country');
              this.selectCountryState(location?.stateId,'state');
              const locationGroup = this.formBuilder.group({
                address: [location?.address || '', Validators.required],
                cityId: [location?.cityId || 0, Validators.required],
                stateId: [location?.stateId || 0, Validators.required],
                countryId: [location?.countryId || 0, Validators.required],
                zipCode: [location?.zipCode || '', Validators.required]
              });
        
              this.jobLocations.push(locationGroup);
            });
            // this.formControl['jobLocations'].setValue(res?.data?.jobLocations);
          }
        } else {
          this.notificationService.showError(res?.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position: any) => {
				if (position) {
					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;
				}
			});
		} else {
			alert('Geolocation is not supported by this browser.');
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
        case 'skill':
          this.skillList = this.allSkillList.filter((item) => item.label?.toLowerCase().includes(data?.search?.toLowerCase()));
          if (!data?.search) {
            this.skillList = [...this.allSkillList];
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
  
    selectCountryState(data: Select2UpdateEvent, type: string, index:number = 0) {
      if (type === "country") {
        // this.registrationForm.get("stateId")?.setValue("");
        // this.registrationForm.get("cityId")?.setValue("");
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
        // this.registrationForm.get("cityId")?.setValue("");
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


  submit() {
    this.jobForm.markAllAsTouched();
    if (this.jobForm.invalid) {
      return;
    }
    this.singletonStoreService.action.next(this.jobId == 0 ? ActionTypeEnum.Add : ActionTypeEnum.Edit);
    const payload:SaveTZDJobListReqVM = {
      jobId: this.jobId,
      jobTitle: this.formControl['jobTitle']?.value,
      description: this.formControl['description']?.value,
      comment: this.formControl['comment']?.value,
      nameOfOwner: this.formControl['nameOfOwner']?.value,
      email: this.formControl['email']?.value,
      dialCode: this.formControl['dialCode']?.value,
      contactNo: this.formControl['contactNo']?.value ? this.formControl['contactNo']?.value?.toString() : '',
      amount: this.formControl['amount']?.value,
      jobType: this.formControl['jobType']?.value,
      jobStartTime: this.formControl['jobStartTime']?.value,
      jobEndTime: this.formControl['jobEndTime']?.value,
      experience: this.formControl['experience']?.value,
      amountType: this.formControl['amountType']?.value,
      status: this.formControl['status']?.value,
      dueDate: this.formControl['dueDate']?.value,
      jobLocations: this.formControl['jobLocations']?.value,
      jobSkillIds: this.formControl['jobSkillIds']?.value ? this.formControl['jobSkillIds']?.value?.toString() : '',
      jobLanguageIds: this.formControl['jobLanguageIds']?.value ? this.formControl['jobLanguageIds']?.value?.toString() : '',
      latitude: this.latitude ? this.latitude?.toString() : '',
      longitude: this.latitude ? this.latitude?.toString() : ''
    }

    this.tzdJobService
      .save_tzd_job(payload)
      .subscribe({
        next: (res: APIResponseVM<any[]>) => {
          if (res.responseCode === ResponseCodeEnum.SUCCESS) {
            this.notificationService.showSuccess(res?.message);
            this.router.navigateByUrl("/jobs");
          } else {
            this.notificationService.showError(res?.message);
          }
        },
        error: (err) => {
          this.notificationService.showError(err?.message);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
