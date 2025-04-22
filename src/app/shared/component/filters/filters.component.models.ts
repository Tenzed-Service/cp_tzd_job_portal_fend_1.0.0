import { DropdownItemModel } from "../../../core/models/common/common.models";


export interface FilterSchema<T, DT> {
    parentComponent: T;
    applyBtn:boolean,
    resetBtn:boolean,
    filterItemConfig:FilterItemConfig[],
    onFilterChange(
      tableSchema: FilterSchema<T, DT>,
      event?: any
    ):any
  }

export interface FilterItemConfig {
    title: string,
    prefixIcon?: string,
    placeholder?: string,
    filterValue?: string,
    filterOptions?: DropdownItemModel[],
    filterType: number,
    dataType: number,
  } 