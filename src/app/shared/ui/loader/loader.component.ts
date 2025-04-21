import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/helper/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent implements OnInit {
  loading: boolean = true;
  spineLoading:boolean = false;

  constructor(
    private loaderService: LoaderService
  ) {
    this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        // this.loading = v;
      }, 1500);     
    });
  }
  ngOnInit(): void {
    this.onResize()
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 576) {
      this.spineLoading = true;
    }else{
      this.spineLoading = true;
    }
  }
}
