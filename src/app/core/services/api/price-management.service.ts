import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class PriceManagementService {

  constructor(private http: HttpClient) {}

  get_hsnsacmasterddl(): Observable<APIResponseVM<any>>{
    const url = apiConfig.priceManagement.get_hsnsacmasterddl;
    return this.http.get<APIResponseVM<any>>(url);
  }
}
