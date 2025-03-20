import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../../shared/store/action/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { UserLoginReqVM } from '../../../core/models/api/user.model';
import { DeviceTypeEnum, ResponseCodeEnum, SystemNameEnum } from '../../../core/enums/common.enum';
import { AuthService } from '../../../core/services/api/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../shared/components/ui/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            RouterModule, ButtonComponent, ConfirmationModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm: FormGroup;
  public reCaptcha: boolean = true;

  @Select(SettingState.setting) setting$: Observable<Values>;
  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modal : NgbModal
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm(isForcedLogin:boolean = false){
    if(this.loginForm.valid){
      const payload:UserLoginReqVM = {
        email: this.loginForm.value?.email,
        password: this.loginForm.value?.password,
        systemName: SystemNameEnum.DESKTOP,
        deviceType: DeviceTypeEnum.DESKTOP,
        isforcedlogin: isForcedLogin
      }
      this.authService.login(payload).subscribe({
        next: (res:any)=>{
          if (res?.responseCode === ResponseCodeEnum.SUCCESS) {
            this.store.dispatch(new Login(res?.data));            
            this.router.navigateByUrl('/dashboard');
            this.notificationService.showSuccess(res?.message);
          }else {
            this.notificationService.showError(res?.Message ? res?.Message : res?.message);
          }
        }, 
        error: (err)=>{
          if (err?.status === 409) {
            this.ConfirmationModal.openModal('credit');
          }else{
            this.notificationService.showError(err?.message);
          }          
        }
      })
    }
  }  
}
