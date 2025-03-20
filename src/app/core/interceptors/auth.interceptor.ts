import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Values } from '../../shared/interface/setting.interface';
import { NotificationService } from '../../shared/services/notification.service';
// import { AuthClear } from '../../shared/store/action/auth.action';
import { SettingState } from '../../shared/store/state/setting.state';
// import { AuthService } from '../../shared/services/auth.service';
import { SingletonStoreService } from '../services/helper/singleton-store.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/api/auth.service';
import { APIResponseVM } from '../models/common/common.model';
import { ResponseCodeEnum } from '../enums/common.enum';
import { Logout } from '../../shared/store/action/auth.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  @Select(SettingState.setting) setting$: Observable<Values>;

  public isMaintenanceModeOn: boolean = false;

  constructor(
    private store: Store, 
    private router: Router, 
    private ngZone: NgZone,
    private notificationService: NotificationService, 
    private singletonStoreService: SingletonStoreService,
    public authService: AuthService
  ) {
    this.setting$.subscribe(setting => {
      this.isMaintenanceModeOn = setting?.maintenance?.maintenance_mode!
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {

    // If Maintenance Mode On
    if (this.isMaintenanceModeOn) {
      this.ngZone.run(() => {
        this.router.navigate(['/maintenance']);
      })
      // End the interceptor chain if in maintenance mode
    }

    const commonHeader = this.store.selectSnapshot(state => state?.common);
    const action = this.singletonStoreService.action.getValue();
    const formCode: any = this.singletonStoreService.formCode.getValue();
    const token =  this.store.selectSnapshot(state => state.auth.token);

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (formCode) {      
      req = req.clone({
        setHeaders: {
          formcode: formCode.toString() ? formCode.toString() : '2302',
        },
      });      
    }
    // else if (req.url.includes('/TZDProductMaster') || req.url.includes('/ProductMaster')){
    //   req = req.clone({
    //     setHeaders: {
    //       formcode: '2302',
    //     },
    //   }); 
    // } 
    if (action) {      
      req = req.clone({
        setHeaders: {
          Actiontype: action.toString(),
        },
      });      
    }
    if (!req.url.includes('/get_common_request')) {
    if (commonHeader?.data?.CompanyId) {      
        req = req.clone({
          setHeaders: {
            CompanyId: commonHeader?.data?.CompanyId?.toString(),
            Clientkey: environment.clientKey,
            CompanyCode: commonHeader?.data?.CompanyCode?.toString(),
          },
        });        
      }else{
        req = req.clone({
          setHeaders: {
            Clientkey: environment.clientKey
          },
        });
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notificationService.notification = false;
          // this.store.dispatch(new AuthClear());
          // this.authService.isLogin = true;
          this.authService.logout().subscribe({
            next:(res:APIResponseVM<string>)=>{
              if (res.responseCode === ResponseCodeEnum.SUCCESS) {
                this.store.dispatch(new Logout());
              }       
            },
            error:(err: any)=>{console.log(err)}
          });
        }
        return throwError(() => error);
      })
    );

  }
}
