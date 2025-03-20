import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';

@Injectable({
  providedIn: 'root'
})
export class TZDStoreUserService {

  public isOpenMenu: boolean = false;
  headerData:any = {};

  constructor(private http: HttpClient) {}

  get_common_request(){
    const url = apiConfig.tZDStoreUser.get_common_request;
    return this.http.post(url,{clientKey: environment.clientKey});
  }
}
