export interface SidebarMenuResVM{
    baseFormCode:number,
    formCode:number,
    formModules:string,
    formName:string,
    icon:string,
    isEditable:boolean,
    isReportSelection:boolean,
    isReportSelectionPagination:boolean,
    key:string,
    label:string,
    route:string,
    ActionType:ActionType[];
    active?:boolean;
    formMenu?:SidebarMenuResVM[];
}

export interface ActionType{
    ActionGroup:number,
    ActionName:string,
    Route:string,
}