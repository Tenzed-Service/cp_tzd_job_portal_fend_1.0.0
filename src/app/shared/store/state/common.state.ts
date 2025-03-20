import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { TZDStoreUserService } from "../../../core/services/api/tzd-store-user.service";
import { GetCommonDetails } from "../action/common.action";
import { environment } from '../../../../environments/environment';
import { APIHeaderVM, APIResponseVM } from '../../../core/models/common/common.model';

export class CommonStateModel {
  data:{}
}

@State<APIResponseVM<APIHeaderVM>>({
    name: "common",
    defaults: {
      data: {
        CompanyId: '',
        Clientkey: '',
        CompanyCode: ''
      },
      message: '',
      responseCode: 0
    },
})

@Injectable()
export class CommonState{

  constructor(
    private tzdStoreUserService: TZDStoreUserService,
    ) {}

  @Selector()
  static commonHeaderDetails(state: APIResponseVM<APIHeaderVM>) {
    return state;
  }

  @Action(GetCommonDetails)
  getCommonDetails(ctx: StateContext<CommonStateModel>) {
    return this.tzdStoreUserService.get_common_request().pipe(
      tap({
        next: (result:any) => {
          if (result?.data && !result.data.Clientkey) {
            result.data['Clientkey'] = environment.clientKey;
          }
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