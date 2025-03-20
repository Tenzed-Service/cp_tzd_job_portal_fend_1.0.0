import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {}

  get_active_countrystatecity_list(): Observable<APIResponseVM<any>>{
    const url = apiConfig.master.get_active_countrystatecity_list;
    return this.http.get<APIResponseVM<any>>(url);
  }
}
