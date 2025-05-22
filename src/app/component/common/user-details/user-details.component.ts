import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UserDetailsScreenComponent implements OnInit {
  currentUrl: string[] = [];

  constructor(
    private router: Router,
  ) {    
    // Initial URL parsing
    this.updateCurrentUrl();
  }
  ngOnInit(): void {}

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url
      .split('/')
      .filter((item) => item.trim() !== '');
  }
}
