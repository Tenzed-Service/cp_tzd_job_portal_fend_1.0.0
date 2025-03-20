import { SingletonStoreService } from './../services/helper/singleton-store.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { NavService } from '../../shared/services/nav.service';
import { GetUserDetails } from '../../shared/store/action/account.action';
import { GetNotification } from '../../shared/store/action/notification.action';
import { GetBadges } from '../../shared/store/action/sidebar.action';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private store: Store,
    private router: Router,
    private navService: NavService,
    private singletonStoreService: SingletonStoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const selectedUserType = this.singletonStoreService.userSelected.getValue();
      // Running in the browser, perform auth check
      return this.checkAuthStatus().pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            this.initializeData();
            return of(true);
          } else if(selectedUserType) {
            return of(this.router.createUrlTree(['/auth/login']));
          }else{
            return of(this.router.createUrlTree(['/user-type']));
          }
        })
      );
    } else {
      // Running on the server, allow SSR to proceed
      return true;
    }
  }

  canActivateChild(): Observable<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      return this.checkAuthStatus().pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            // Optionally delay navigation or perform additional checks here
            return of(true);
          }
          // User is not authenticated, proceed to the child route without redirect
          return of(true);
        })
      );
    } else {
      // Allow SSR to proceed without child route restrictions
      return true;
    }
  }

  private checkAuthStatus(): Observable<boolean> {
    return this.store.select(state => !!state.auth?.token).pipe(
      map(token => !!token), // Convert to boolean
      catchError(() => of(false)) // Handle errors, e.g., when token is not available
    );
  }

  private initializeData(): void {
    this.navService.sidebarLoading = true;
    this.store.dispatch(new GetBadges());
    this.store.dispatch(new GetNotification());
    this.store.dispatch(new GetUserDetails()).subscribe({
      complete: () => {
        this.navService.sidebarLoading = false;
      },
    });
  }
}
