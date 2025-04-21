import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { SingletonStoreService } from '../services/helper/singleton-store.service';
import { EncryptionDecryptionService } from '../services/helper/encrypt-decrypt.service';
import { LocalStorageService } from '../services/helper/local-storage.service';
import { CustomHeaders } from '../enums/common.const';


export class EncryptDecryptAuthInterceptor implements HttpInterceptor {
    constructor(
        private encryptionDescrptionService: EncryptionDecryptionService,
        private singletonStoreService: SingletonStoreService,
        private localStorageService: LocalStorageService
    ) {
    }
    ExcludeURLList = []; // Add your excluded URLs here
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes("/api/")) {
            const isSecured = this.singletonStoreService.securityResponse.getValue()
            if (isSecured) {
                const shouldExclude = this.ExcludeURLList.some(url => req.url.includes(url));
                if (!shouldExclude) {
                    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
                        let seed = -1;
                        if (seed < 0) {
                            seed = +this.localStorageService.getItem("Security");
                            if (!seed || seed < 0) {
                                seed = 1;
                            }
                        }
                        let body = req.body;
                        try {
                            body = JSON.stringify(req.body);
                        } catch {
                            body = req.body;
                        }
                        const encryptedBody = this.encryptionDescrptionService.encryptInfo(body, seed);
                        const clonedRequest = req.clone({
                            body: encryptedBody,
                            responseType: 'text',
                            setHeaders: {
                                [CustomHeaders.Security]: `Secured-${seed}` // Replace with your header name and value
                            }
                        });
                        return next.handle(clonedRequest).pipe(
                            filter(event => event instanceof HttpResponse),
                            map((event: HttpResponse<any>) => this.decryptResponse(event)),
                            catchError(error => {
                                if (error?.status == 415) {
                                    const securityHeader = error.headers.get(CustomHeaders.Security);
                                    if (securityHeader == "ERROR") {
                                        // this.accountService.logout('UILOGIN');
                                        window.location.reload()
                                        // Return an empty observable after logging out
                                        return of();
                                    }
                                }
                                // Re-throw the error if it's not handled
                                return throwError(() => error);
                            })
                        );
                    }
                }
                return next.handle(req.clone({ responseType: 'text' })).pipe(
                    filter(event => event instanceof HttpResponse),
                    map((event: HttpResponse<any>) => this.decryptResponse(event)),
                    catchError(error => {
                        if (error?.status == 415) {
                            const securityHeader = error.headers.get(CustomHeaders.Security);
                            if (securityHeader == "ERROR") {
                                window.location.reload()
                                // Return an empty observable after logging out
                                return of();
                            }
                        }
                        // Re-throw the error if it's not handled
                        return throwError(() => error);
                    })
                );
            }
        }
        return next.handle(req).pipe(
            filter(event => event instanceof HttpResponse),
            map((event: HttpResponse<any>) => event),
            catchError(error => {
                if (error?.status == 415) {
                    const securityHeader = error.headers.get(CustomHeaders.Security);
                    if (securityHeader == "ERROR") {
                        window.location.reload()
                        // Return an empty observable after logging out
                        return of();
                    }
                }
                // Re-throw the error if it's not handled
                return throwError(() => error);
            })
        );
    }
    decryptResponse(event: HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse) {
            const securityHeader = event.headers.get(CustomHeaders.Security);
            if (securityHeader && securityHeader.includes('Secured')) {
                var seed = +securityHeader.split("-")[1];
                this.localStorageService.setItem("Security", seed.toString());
                const decryptedResponse = this.encryptionDescrptionService.decryptInfo(event.body, seed);
                try {
                    const parsedResponse = decryptedResponse ? JSON.parse(decryptedResponse) : '';
                    return event.clone({ body: parsedResponse });
                } catch (e) {
                    return event.clone({ body: decryptedResponse });
                }
            }
        }
        return event;
    }
}
