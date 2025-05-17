import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingletonStoreService } from '../../../../core/services/helper/singleton-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VerificationDetailsScreenComponent implements OnInit {
  currentUrl: string[] = [];

  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService
  ) {    
    // Initial URL parsing
    this.updateCurrentUrl();
  }
  ngOnInit(): void {}

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url
      .split('/')
      .filter((item) => item.trim() !== '');
    this.singletonStoreService.breadCrumbItems.next([
        { label: this.currentUrl[0] },
        { label: this.currentUrl[1], url: '/' + this.currentUrl[0] + '/' + this.currentUrl[1] },
        { label: 'Verification Details', active: true },
      ]);
  }

  close() {
    this.router.navigateByUrl('/' + this.currentUrl[0] + '/' + this.currentUrl[1]);
  }

}
