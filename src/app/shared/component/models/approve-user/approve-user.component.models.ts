
export interface ApproveModalSchema<T, DT> {
  parentComponent: T;
  title: string;
  action(
    modelSchema: ApproveModalSchema<T, DT>,
    actionType: string,
    event:any
  ): any;
}


