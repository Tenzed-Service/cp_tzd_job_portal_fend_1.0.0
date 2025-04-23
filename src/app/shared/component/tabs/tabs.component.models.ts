
export interface TabsSchema<T, DT> {
    parentComponent: T;
    tabList:TabItem[],
    activeTab: number,
    searchInput:boolean,
    filterItemConfig:FilterItemConfig,
    tabChange(
      tabsSchema: TabsSchema<T, DT>,
      event: any
    ):any,
    onFilterChange(
      tabsSchema: TabsSchema<T, DT>,
      event?: any
    ):any
  }

export interface TabItem {
  id: number,
  name: string,
  count: number,
  icon: string,
} 

export interface FilterItemConfig {
    title: string,
    prefixIcon?: string,
    placeholder?: string,
    filterValue?: string,
  } 