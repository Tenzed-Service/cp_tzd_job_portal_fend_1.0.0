import { TZDProductMasterService } from './../../../core/services/api/tzd-product-master.service';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { AccountClear } from "../action/account.action";
import { GetTZDAllActiveDDLList } from '../action/tzd-product-master.action';
import { GetTZDActiveDDLListResVM } from '../../../core/models/api/tzd-product-master.model';

export class TZDAllActiveDDLListStateModel {
  data:GetTZDActiveDDLListResVM | null
}

@State<TZDAllActiveDDLListStateModel>({
  name: "tzdProductMaster",
  defaults: {
    data:null
  },
})
@Injectable()
export class TZDAllActiveDDLListState {

  constructor(
    private tzdProductMasterService: TZDProductMasterService,
    public router: Router
  ) {}

  @Selector()
  static activeDDLList(state: TZDAllActiveDDLListStateModel) {
    return state?.data;
  }


  @Action(GetTZDAllActiveDDLList)
  getTZDAllActiveDDLList(ctx: StateContext<TZDAllActiveDDLListStateModel>) {
    const state = ctx.getState();
    if (state?.data) {
      // If the country has been already loaded
      // we just break the execution
      return true;
    }
    return this.tzdProductMasterService.get_tzdall_active_ddl_list().pipe(
      tap({
        next: result => {
          ctx.patchState({
            data:result?.data
        });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AccountClear)
  tzdAllActiveDDLListClear(ctx: StateContext<TZDAllActiveDDLListStateModel>){
    ctx.patchState({} as TZDAllActiveDDLListStateModel);
  }

}