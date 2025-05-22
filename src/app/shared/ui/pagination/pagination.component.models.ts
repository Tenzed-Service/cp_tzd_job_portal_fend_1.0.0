
export interface PaginationSchema<T, DT> {
  parentComponent: T;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  maxVisiblePages: number;
  pageSizeOptions?: number[];
  onPaginationChange(tableSchema: PaginationSchema<T, DT>, event?: any): any;
}
