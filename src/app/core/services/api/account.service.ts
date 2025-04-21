import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { CommonEnum } from "../../enums/common.enum";
import { ResponseVM } from "../../models/common/common.models";
import { CustomHeaders } from "../../enums/common.const";
import { SingletonStoreService } from "../helper/singleton-store.service";
import { LocalStorageService } from "../helper/local-storage.service";

@Injectable({ providedIn: 'root' })
export class AccountService {
  authUserData: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private singletonStoreService: SingletonStoreService
  ) {
    this.setAuthUserDataProperty()
  }
  // login(request: LoginReqVM): Observable<ResponseVM<LoginResVM>> {
  //   const url = apiConfig.account.login.url;
  //   return this.http.post<ResponseVM<LoginResVM>>(url, request)
  // }
  // verifyLoginOtp(request: TwoFactorAuthReqVM): Observable<ResponseVM<LoginValidationResVM>> {
  //   const url = apiConfig.account.verifyLoginOtp.url;
  //   return this.http.post<ResponseVM<LoginValidationResVM>>(url, request)
  // }
  // verifyEmail(token: string): Observable<ResponseVM<VerifyEmailResVM>> {
  //   const url = apiConfig.account.verify_email.url + token;
  //   return this.http.get<ResponseVM<VerifyEmailResVM>>(url)
  // }
  // changePassword(request: ChangePasswordReqVM): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.changePassword.url;
  //   return this.http.post<ResponseVM<string>>(url, request)
  // }
  // resetPassword(payload: SetPasswordReqVM): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.reset_password.url;
  //   return this.http.post<ResponseVM<string>>(url, payload)
  // }
  // loginInfo(): Observable<ResponseVM<LoginValidationResVM>> {
  //   const url = apiConfig.account.loginInfo.url;
  //   return this.http.get<ResponseVM<LoginValidationResVM>>(url)
  // }
  // sendForgotPwdEmail(payload: SendForgotPasswordEmailReqVM): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.send_forgot_pwd_email.url;
  //   return this.http.post<ResponseVM<string>>(url, payload)
  // }
  // loginHistory(payload: GetLogInHistoryListFilterReqVM): Observable<ResponseVM<GetLogInHistoryListFilterResVM[]>> {
  //   const url = apiConfig.loginHistory.login_history.url;
  //   return this.http.post<ResponseVM<GetLogInHistoryListFilterResVM[]>>(url, payload)
  // }
  // validateForgotPwdToken(token: string): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.validate_forgot_pwd_token.url + token;
  //   return this.http.get<ResponseVM<string>>(url)
  // }
  isAuthenticated() {
    if (this.getToken()) {
      const authData = this.getToken();
      const authUserData: any = this.getUserData();
      if (authData && authUserData && authUserData.isFirstLogin) {
        return of({ accessAllowed: true });
      } else {
        return of({ accessAllowed: false });
      }
    } else {
      return of({ accessAllowed: false });
    }
  }
  getUserData() {
    const userData = this.setAuthUserDataProperty();
    if (userData) {
      return userData;
    } else {
      return null;
    }
  }
  setAuthUserDataProperty() {
    try {
      this.authUserData = JSON.parse(this.localStorageService.getItem(CommonEnum.USERDATA));
      return this.authUserData;
    } catch {
      this.localStorageService.clearLocalStorage();
      this.router.navigate(['/login']);
      return null;
    }
  }
  getToken() {
    const authData = this.localStorageService.getItem(CommonEnum.AUTHTOKEN);
    if (authData) {
      return authData;
    } else {
      return false;
    }
  }
  // logout(payload: string): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.logout.url + '?type=' + payload;
  //   return this.http.post<ResponseVM<string>>(url, '');
  // }
  // getPermission(): Observable<ResponseVM<string[]>> {
  //   const url = apiConfig.account.userPermissions.url;
  //   // Define headers
  //   const headers = new HttpHeaders({
  //     [CustomHeaders.CallSecurityCheckApi]: 'true'
  //   });
  //   // Define options with headers
  //   const options = {
  //     headers: headers
  //   };
  //   return this.http.get<ResponseVM<string[]>>(url, options);
  // }
  // getUserPermission(): Observable<string[]> {
  //   let permossion = [];
  //   this.singletonStoreService.permissionList.subscribe((response: string[]) => {
  //     permossion = response;
  //   });
  //   return of(permossion)
  // }
  // resendOTP(twoFactorToken: string): Observable<ResponseVM<LoginResVM>> {
  //   const url = apiConfig.account.resend_login_otp.url;
  //   return this.http.get<ResponseVM<LoginResVM>>(url + twoFactorToken);
  // }
  // resendVerifyEmail(payload: ResendVerifyEmailReqVM): Observable<ResponseVM<string>> {
  //   const url = apiConfig.account.resend_verify_email.url;
  //   return this.http.post<ResponseVM<string>>(url, payload);
  // }
  // refreshLoginToken(refreshToken: string): Observable<ResponseVM<RefreshTokenResVM>> {
  //   const url = apiConfig.account.refreshLoginToken.url;
  //   const data: RefreshTokenReqVM = {
  //     refreshToken: refreshToken,
  //     accessToken: this.getToken(),
  //   }
  //   return this.http.post<ResponseVM<RefreshTokenResVM>>(url, data)
  // }
  // securityCheck(): Observable<boolean> {
  //   const url = apiConfig.account.securityCheck.url;
  //   return this.http.post<boolean>(url, {})
  // }
}
