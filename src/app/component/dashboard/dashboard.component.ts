import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class DashboardScreenComponent {
    
  constructor(
    private router: Router
  ) {
    
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
