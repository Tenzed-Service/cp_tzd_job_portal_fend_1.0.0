import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome-screen',
    templateUrl: './welcome-screen.component.html',
    styleUrls: ['./welcome-screen.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class WelcomeScreenComponent {
    
  constructor(
    private router: Router
  ) {
    
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
