import {
  HttpErrorResponse,
  HttpHandler, HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from '../services/helper/token.service';
import { AccountService } from '../services/api/account.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let authReq = req;
    const token: any = this.tokenService.getToken();
    if (token != null && req.url.includes(environment.baseUrl)) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next, error);
        }
        return throwError(error);
      })
    );
  }
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: any
  ) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
    //   if (token)
    //     return this.accountService.refreshLoginToken(token).pipe(
    //       switchMap((token: any) => {
    //         this.isRefreshing = false;
    //         this.tokenService.saveToken(token.access_token);
    //         this.refreshTokenSubject.next(token.access_token);
    //         return next.handle(
    //           this.addTokenHeader(request, token.access_token)
    //         );
    //       }),
    //       catchError((err) => {
    //         this.isRefreshing = false;
    //         this.accountService.logout('UILOGIN');
    //         return throwError(err);
    //       })
    //     );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    if (
      request.url.includes('refresh_token') &&
      request.url.includes('loginapp')
    ) {
      return request.clone({
        headers: request.headers,
      });
    } else {
      return request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`)
      });
    }
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
