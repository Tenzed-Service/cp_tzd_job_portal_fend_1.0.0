import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TabsComponent implements OnInit, AfterViewInit {
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  @Input() activeTab: number = 1;
  @Input() tabList: any[] = [];
  @Output() tabChange = new EventEmitter<number>();
  showArrows: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkOverflow();
    // Add resize observer to check overflow on window resize
    const resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });
    resizeObserver.observe(this.tabsContainer.nativeElement);
  }

  checkOverflow() {
    const element = this.tabsContainer.nativeElement;
    this.showArrows = element.scrollWidth > element.clientWidth;
    this.cdr.detectChanges();
  }

  scrollTabs(direction: 'left' | 'right') {
    const container = this.tabsContainer.nativeElement;
    const scrollAmount = 200; // Adjust this value as needed
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  switchTab(tabId: number) {
    this.tabChange.emit(tabId);    
    this.activeTab = tabId;
  }  
}
