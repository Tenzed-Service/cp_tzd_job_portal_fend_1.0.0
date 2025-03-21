import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveUserReqVM } from '../../models/api/user.model';
import { apiConfig } from '../../../../environments/api.config';
import { Observable } from 'rxjs';
import { APIResponseVM } from '../../models/common/common.model';
import { GetTZDJobListReqVM, SaveTZDJobApplyReqVM, SaveTZDJobListReqVM } from '../../models/api/tzd-job.model';

@Injectable({
  providedIn: 'root'
})
export class TZDJobService {

  constructor(private http: HttpClient) {}

  save_tzd_job_company_registration(payload:SaveUserReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.save_tzd_job_company_registration;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }

  save_tzd_job_worker_registration(payload:SaveUserReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.save_tzd_job_worker_registration;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }

  save_tzd_job(payload:SaveTZDJobListReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.save_tzd_job;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }

  get_tzd_job(jobId:number): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.get_tzd_job + jobId;
    return this.http.get<APIResponseVM<any>>(url);
  }

  get_job_list(payload:GetTZDJobListReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.get_job_list;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }

  delete_tzd_job(jobId:number): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.delete_tzd_job + jobId;
    return this.http.delete<APIResponseVM<any>>(url);
  }

  get_tzd_worker_job_list(payload:GetTZDJobListReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.get_tzd_worker_job_list;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }

  save_tzd_job_apply(payload:SaveTZDJobApplyReqVM): Observable<APIResponseVM<any>>{
    const url = apiConfig.tzdJob.save_tzd_job_apply;
    return this.http.post<APIResponseVM<any>>(url,payload);
  }
}
