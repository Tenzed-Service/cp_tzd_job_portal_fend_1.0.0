// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable, throwError } from "rxjs";
// import { AccessPermissionService } from "../services/helper/access-permission.service";
// @Injectable()
// export class PermissionInterceptor implements HttpInterceptor 
// {
//   constructor(private accessPermissionService:AccessPermissionService){}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (request.url.includes("/api/release/currentversion")) {
//         const permission = this.accessPermissionService.getPermissionByUrl(request.url);
//         if (permission) {
//           if (!this.accessPermissionService.userHasPermission(permission)) {
//             // Return an error response indicating lack of permission
//             return throwError(()=>new HttpErrorResponse({ status: 403, statusText: 'Forbidden' }));
//           }
//         }
//       }
//     return next.handle(request);
//   }   
// }
