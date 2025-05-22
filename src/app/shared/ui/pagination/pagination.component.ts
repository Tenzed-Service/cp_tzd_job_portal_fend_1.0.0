import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionComponent } from '../fields/selection/selection.component';
import { DropdownItemModel } from '../../../core/models/common/common.models';
import { FormsModule } from '@angular/forms';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';
import { PaginationSchema } from './pagination.component.models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SelectionComponent,
    FormsModule
  ]
})
export class PaginationComponent implements OnInit {
  @Input() paginationSchema!: PaginationSchema<any, any>;
  @Input() borderTop:boolean = false;
  startIndex = 0;
  endIndex = 0;
  dropDownListData:any[] = [
    { 
      label: '10',
      value: 10
    },
    {
      label: '20',
      value: 20 
    },
    {
      label: '50',
      value: 50 
    },
    {
      label: '100',
      value: 100 
    }
  ];

  constructor(
    private singletonStoreService: SingletonStoreService
  ) {}

  ngOnInit() {
    this.singletonStoreService.isMobileView.subscribe((isMobileView:boolean) => {
      if (this.paginationSchema && this.paginationSchema.maxVisiblePages) {
        if(isMobileView){
         this.paginationSchema.maxVisiblePages = 3;
        } else {
         this.paginationSchema.maxVisiblePages = 5;
       }        
      }
     });
     if(this.paginationSchema && this.paginationSchema?.pageSizeOptions && this.paginationSchema.pageSizeOptions.length > 0){
       this.dropDownListData = [];
       this.paginationSchema.pageSizeOptions.forEach((pageSize:number) => {
         this.dropDownListData.push({
           label: pageSize.toString(),
           value: pageSize
         });
       });
     }
    this.updateIndexes();
  }

  get totalPages(): number {
    return Math.ceil(this.paginationSchema.totalItems / this.paginationSchema.pageSize);
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    const current = this.paginationSchema.pageNumber;
    const maxVisible = this.paginationSchema.maxVisiblePages;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(current - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get showLeftDots(): boolean {
    return this.pages[0] > 1;
  }

  get showRightDots(): boolean {
    return this.pages[this.pages.length - 1] < this.totalPages;
  }

  updateIndexes() {
    this.startIndex = (this.paginationSchema.pageNumber - 1) * this.paginationSchema.pageSize;
    this.endIndex = Math.min(this.startIndex + this.paginationSchema.pageSize, this.paginationSchema.totalItems);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.paginationSchema.pageNumber) {
      this.paginationSchema.pageNumber = page;
      this.updateIndexes();
      this.paginationSchema.onPaginationChange(this.paginationSchema,{pageNumber:this.paginationSchema.pageNumber, pageSize:+this.paginationSchema.pageSize});
    }
  }
  onPageSizeChange(pageSize: number) {
      this.paginationSchema.pageSize = pageSize; // Assuming paginationSchema.pageSize is a number, you may need to convert it from string if it comes from your dat
      this.paginationSchema.pageNumber = 1;
      this.updateIndexes();
      this.paginationSchema.onPaginationChange(this.paginationSchema,{pageNumber:this.paginationSchema.pageNumber, pageSize:+this.paginationSchema.pageSize});
  }
}
