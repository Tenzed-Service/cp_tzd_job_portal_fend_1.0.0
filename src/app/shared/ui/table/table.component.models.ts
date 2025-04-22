import { TableColumnsDataTypeEnum, AdvancedFilterSortDirectionEnum } from "../../../core/enums/common.enum";

export interface TableSchema<T, DT> {
  parentComponent: T;
  data?: DT;
  columns?: TableColumns<T, DT>[];
  showSerialNo?: boolean;
}

export interface TableColumns<T, DT> {
  title: string;
  dataPropertyName: string;
  dataType?: TableColumnsDataTypeEnum;
  actions?: TableColumnAction<T, DT>[];
  sorting?: boolean;
  sortDirection?: AdvancedFilterSortDirectionEnum;
  onFormatChange?(
    tableSchema: TableSchema<T, DT>,
    columnSchema?: TableColumns<T, DT>,
    event?: any
  ): any;
  onSortChange?(
    tableSchema: TableSchema<T, DT>,
    columnSchema?: TableColumns<T, DT>
  ): any;
}
export interface TableColumnAction<T, DT> {
  tooltip: string;
  actionType: string;
  class: string;
  iconClass: string;
  onActionClick(
    tableSchema: TableSchema<T, DT>,
    actionType?: string,
    event?: any
  ): any;
}
