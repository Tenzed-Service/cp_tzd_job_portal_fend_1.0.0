import { GetTZDSellerProductMasterListResVM } from "../api/tzd-product-master.model"

export interface APIHeaderVM {
	CompanyId: string,
	Clientkey: string,
	CompanyCode: string,
}

export interface APIResponseVM<T> {
	data:T,
	layout?:TableColumn[],
	message:string,
	Message?:string,
	responseCode?:number,
	pager?: Pager,
	reportSelectionFilterJson?:null
}

export interface Pager {
	nextPage:boolean,
	pageNo:number
	pageSize:number
	totalRecords:number
	}

export interface GetTableListResponseVM {
	pageSize: number,
	pageNo: number,
	search?: string,
	formCode: number,
	layoutId: number | null,	
	commonSearch?: CommonSearch[]
}

export interface CommonSearch {
	searchField: string,
	searchValue: string
}

export interface TableConfigVM<T> {
	columns: TableColumn[],
	rowActions: TableRowAction[],
	data: T[],
	totalRecords: number,
	filter:any
}

export interface TableColumn {
    layoutName: string,
    fieldName: string,
    aliasName: string,
    redirectFormCodeField: number,
    redirectIdField: number,
    displayFieldName: string,
    fieldDataType: string,
    isGroup: boolean,
    groupingSrNo: number,
    width: number,
    alignment: string,
    sortType: string,
    isFreeze: boolean,
    isFilter: boolean,
    aggregateTypeId: number,
    isRequired: boolean
}

export interface TableRowAction { 
	label: string, 
	actionToPerform: string, 
	icon: string 
}