import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  constructor(private http: HttpClient) {}

  get_unitofmeasurementlist(): Observable<APIResponseVM<any>>{
    const url = apiConfig.productMaster.get_unitofmeasurementlist;
    return this.http.get<APIResponseVM<any>>(url);
  }

  get_active_product_group(): Observable<APIResponseVM<any>>{
    const url = apiConfig.productMaster.get_active_product_group;
    return this.http.get<APIResponseVM<any>>(url);
  }

  get_active_productcategory_list(): Observable<APIResponseVM<any>>{
    const url = apiConfig.productMaster.get_active_productcategory_list;
    return this.http.get<APIResponseVM<any>>(url);
  }

  get_productmaster(productId :number): Observable<APIResponseVM<any>>{
    const url = apiConfig.productMaster.get_productmaster + productId ;
    return this.http.get<APIResponseVM<any>>(url);
  }

  delete_productmaster(productId :number): Observable<APIResponseVM<any>>{
    const url = apiConfig.productMaster.delete_productmaster + productId ;
    return this.http.delete<APIResponseVM<any>>(url);
  }
}
