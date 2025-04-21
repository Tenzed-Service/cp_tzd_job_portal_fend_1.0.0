// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
// import { AccountService } from '../services/api/account.service';
// import Swal from 'sweetalert2';
// import { firstValueFrom } from 'rxjs';
// import { SingletonStoreService } from '../services/helper/singleton-store.service';
// @Injectable({ providedIn: 'root' })
// export class RouteGuard implements CanActivate {
//   permission: string[] = [];
//   constructor(
//     private router: Router,
//     private accountService: AccountService,
//     private singletonStoreService: SingletonStoreService
//   ) {
//   }
//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
//     try {
//       const isSecurityEnabled: boolean = await firstValueFrom(this.accountService.securityCheck());
//       this.singletonStoreService.securityResponse.next(isSecurityEnabled);
//       return true;
//     } catch {
//       Swal.fire({
//         icon: 'error',
//         title: 'You are not authorized to access this application!!!',
//         html: `<div style="font-size: small">We are facing some security issues. You are not allowed to access this application. Please refresh page.</div>`,
//         showConfirmButton: false,
//         showCancelButton: false,
//         allowOutsideClick: false
//         // cancelButtonText: 'Close',
//       })
//       // .then((result) => {
//       //   if (result.dismiss === Swal.DismissReason.cancel) {
//       //     return false;
//       //   }
//       // });
//     }
//   }
// }
