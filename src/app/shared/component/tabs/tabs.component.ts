import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SimpleInputComponent } from '../../ui/fields/simple-input/simple-input.component';
import { TabsSchema } from './tabs.component.models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SimpleInputComponent
  ]
})
export class TabsComponent implements OnInit, AfterViewInit {
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  @Input() tabsSchema!:TabsSchema<any,any>;
  showArrows: boolean = false;
  searchInput = new Subject<any>();

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
      this.searchInput
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((event: Event & { target: HTMLInputElement }) => {
          if (this.tabsSchema.onFilterChange) {
            this.tabsSchema.onFilterChange(this.tabsSchema.parentComponent , event?.target?.value ? event?.target?.value : '');
          }
        });   
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

  switchTab(tabId: any) {
    this.tabsSchema.tabChange(this.tabsSchema,tabId);    
    this.tabsSchema.activeTab = tabId;
  }  
}
