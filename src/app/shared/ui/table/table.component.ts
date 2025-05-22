import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableSchema } from './table.component.models';
import { AdvancedFilterSortDirectionEnum, TableColumnsDataTypeEnum } from '../../../core/enums/common.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class TableComponent implements OnInit {
  @Input() tableSchema!: TableSchema<any, any>;
  tableColumnsDataTypeEnum: typeof TableColumnsDataTypeEnum = TableColumnsDataTypeEnum;
  tableFilterSortDirectionEnum: typeof AdvancedFilterSortDirectionEnum = AdvancedFilterSortDirectionEnum;

  constructor() {}

  ngOnInit(): void {}
}
