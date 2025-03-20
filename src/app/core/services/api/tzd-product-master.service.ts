import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';
import { environment } from '../../../../environments/environment';
import { GetTZDActiveDDLListResVM, GetTZDProductMasterListReqVM, GetTZDSellerProductMasterListResVM } from '../../models/api/tzd-product-master.model';

@Injectable({
  providedIn: 'root'
})
export class TZDProductMasterService {

  constructor(private http: HttpClient) {}

  get_tzdall_active_ddl_list(): Observable<APIResponseVM<GetTZDActiveDDLListResVM>>{
    const url = apiConfig.tzdProductMaster.get_tzdall_active_ddl_list;
    return this.http.post<APIResponseVM<GetTZDActiveDDLListResVM>>(url,{});
  }

  get_tzd_seller_productmasterlist(payload:GetTZDProductMasterListReqVM): Observable<APIResponseVM<GetTZDSellerProductMasterListResVM[]>>{
    const url = apiConfig.tzdProductMaster.get_tzd_seller_productmasterlist;
      return this.http.post<APIResponseVM<GetTZDSellerProductMasterListResVM[]>>(url,payload);
  }

  save_tzd_seller_product_master(payload:any): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdProductMaster.save_tzd_seller_product_master;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }
}
