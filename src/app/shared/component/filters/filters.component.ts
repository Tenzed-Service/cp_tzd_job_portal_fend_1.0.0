import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SimpleInputComponent } from '../../ui/fields/simple-input/simple-input.component';
import { SelectionComponent } from '../../ui/fields/selection/selection.component';
import { FormsModule } from '@angular/forms';
import { TableFilterTypeEnum } from '../../../core/enums/common.enum';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FilterSchema, FilterItemConfig } from './filters.component.models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SimpleInputComponent,
    SelectionComponent,
    FormsModule,
  ]
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() onFilterChange = new EventEmitter<any>();
  @Input() filterSchema!: FilterSchema<any,any>;
  oldFilter:FilterItemConfig[] = [];
  tableFilterTypeEnum = TableFilterTypeEnum;
  searchInput = new Subject<any>();

  constructor() { }

  ngOnInit() {
    const filters = this.filterSchema.filterItemConfig.reduce((acc:any, item:any) => {
      acc[item.title.toLowerCase()] = item.filterValue;
      return acc;
    }, {} as Record<string, string>);
    this.oldFilter = filters;
    
    this.searchInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((event: Event & { target: HTMLInputElement }) => {
        if (event?.target?.value) {
          this.filterChange(this.filterSchema.applyBtn);
        }
      });
  }

  filterChange(filter:boolean = true) {
    if(!filter) {
      const filters = this.filterSchema.filterItemConfig.reduce((acc:any, item:any) => {
        acc[item.title.toLowerCase()] = item.filterValue;
        return acc;
      }, {} as Record<string, string>);
      this.filterSchema.onFilterChange(this.filterSchema.parentComponent, filters);
    }
  }

  resetFilters(filter:boolean = false) {
    // Reset the filters to their initial values
      this.filterSchema.filterItemConfig = this.filterSchema.filterItemConfig.map((item:any) => {
        item.filterValue = this.oldFilter[item.title.toLowerCase()] || '';
        return item;
      });
      this.filterChange(filter);
  }

  ngOnDestroy(): void {
    this.resetFilters(true);
  }
}
