
export interface DeleteModelSchema<T, DT> {
  parentComponent: T;
  title: string;
  message: string;
  cancel(
    modelSchema: DeleteModelSchema<T, DT>,
    actionType: string
  ): any;
  confirm(
    modelSchema: DeleteModelSchema<T, DT>,
    actionType: string
  ): any;
}


