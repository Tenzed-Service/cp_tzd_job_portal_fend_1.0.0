import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginReqVM } from '../../models/api/user.model';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isOpenMenu: boolean = false;

  constructor(private http: HttpClient) {}

  login(payload:UserLoginReqVM){
    const url = apiConfig.user.login;
    return this.http.post(url,payload);
  }

  logout(): Observable<APIResponseVM<string>>{
    const url = apiConfig.user.logout;
    return this.http.post<APIResponseVM<string>>(url,{});
  }
}
