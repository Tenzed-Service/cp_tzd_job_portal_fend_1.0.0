import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string[] = [];
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    // Initial URL parsing
    this.updateCurrentUrl();
  }

  ngOnInit(): void {
    // Subscribe to router events to update currentUrl when navigation ends
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentUrl();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url.split('/').filter((item) => item.trim() !== '');
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
