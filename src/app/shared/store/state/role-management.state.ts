import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { RoleManagementService } from "../../../core/services/api/role-management.service";
import { GetRoleAuthorizeDetails } from "../action/role-management.action";

export class RoleAuthorizeStateModel {
  data:[]
}

@State<RoleAuthorizeStateModel>({
    name: "roleManagement",
    defaults: {
      data: []
    },
})

@Injectable()
export class RoleAuthorizeState{

  constructor(
    private roleManagementService: RoleManagementService,
    ) {}

  @Selector()
  static roleAuthorizeMenu(state: any) {
    if (state?.data) {
      return state?.data?.find((data:any)=>data?.Position == 2)?.Menu;      
    }
    return null;
  }

  @Selector()
  static roleAuthorizeDetails(state: RoleAuthorizeStateModel) {
    return state;
  }

  @Action(GetRoleAuthorizeDetails)
  getRoleAuthorizeDetails(ctx: StateContext<RoleAuthorizeStateModel>) {
    // const state = ctx.getState();
    // if (state?.data && state?.data.length > 0) {
    //   return true;
    // }
    return this.roleManagementService.get_profile_roleauthorizationlist().pipe(
      tap({
        next: (result:any) => {
          ctx.patchState({
            data: result?.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}