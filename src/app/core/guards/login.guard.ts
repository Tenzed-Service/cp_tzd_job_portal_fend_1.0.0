import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AccountService } from '../services/api/account.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.accountService.isAuthenticated().pipe(map((response: {
      accessAllowed: boolean
    }) => {
      if (!response.accessAllowed) {
        return true;
      }
      else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }), catchError((error) => {
      this.router.navigate(['/dashboard']);
      return of(false);
    }));
  }
}
