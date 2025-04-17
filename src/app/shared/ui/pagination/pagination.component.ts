import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PaginationComponent implements OnInit {
  @Input() currentPage:number = 1;
  @Input() itemsPerPage:number = 10;
  @Input() totalItems:number = 0;
  @Input() maxVisiblePages:number = 5;
  @Output() changePagination = new EventEmitter<number>();
  startIndex = 0;
  endIndex = 0;

  ngOnInit() {
    this.updateIndexes();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const maxVisible = this.maxVisiblePages;
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
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateIndexes();
      this.changePagination.emit(this.currentPage);
    }
  }
}
