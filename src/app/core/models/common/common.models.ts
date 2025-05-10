import { AdvancedFilterOperatorEnum, AdvancedFilterRelationEnum, AdvancedFilterSortDirectionEnum } from "../../enums/common.enum";

export interface DropdownItemModel {
    label: string;
    value: string;
}
export interface ResponseVM<T>
{
  data: T;
  errorMessage: string[];
  message: string;
  success: boolean;
  metaData: {
    TotalRecords:number,
    TotalTime:string
  };
}
export interface FilterBaseReqVM
{
  pagerCriteria?:PagerCriteriaReqVM,
  advancedFilters?:AdvancedFilterCriteriaReqVM[]
}
export interface PagerCriteriaReqVM
{
    pageNumber: number,
    pageSize: number
}
export interface AdvancedFilterCriteriaReqVM
{   
  columnName: string;
  operator?: AdvancedFilterOperatorEnum;
  values?: any[];
  relation?: AdvancedFilterRelationEnum;
  sortDirection?: AdvancedFilterSortDirectionEnum;
}
export interface GetAllDataReq extends FilterBaseReqVM {
  search: string
}
export interface KeyValueResVM<KType, VType> {
  key: KType;
  value: VType;
}  
export interface PermissionsDirectiveModel {
  required?: string[];
  optional?: string[];
  removeElement?: boolean;
  disableElement?: boolean;
}

export interface GrigActionVM { 
  icon: string, 
  function: string, 
  title: string 
}

export interface ErrorMessageList {
  error: boolean;
  errorMessage: string;
}