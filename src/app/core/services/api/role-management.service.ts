import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  constructor(private http: HttpClient) {}

  get_profile_roleauthorizationlist(): Observable<APIResponseVM<any>>{
    const url = apiConfig.roleManagement.get_profile_roleauthorizationlist;
    return this.http.get<APIResponseVM<any>>(url);
  }
}
