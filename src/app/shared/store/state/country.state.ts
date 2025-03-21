import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCountries } from "../action/country.action";
import { MasterService } from "../../../core/services/api/master.service";

export class CountryStateModel {
  data:[]
}

@State<CountryStateModel>({
  name: "country",
  defaults: {
      data:[]
  },
})
@Injectable()
export class CountryState {
  
  constructor(private masterService: MasterService) {}

  @Selector()
  static country(state: CountryStateModel) {
    return state;
  }

  @Selector()
  static countries(state: CountryStateModel) {
    return state?.data.map((cn:any) => {
      return { ...cn, label: cn?.countryName, value: cn?.countryId }
    });
  }

  @Action(GetCountries)
  getCountries(ctx: StateContext<CountryStateModel>, action: GetCountries) {
    const state = ctx.getState(); 
    
    if (state?.data?.length > 0) {
      // If the country has been already loaded
      // we just break the execution
      return true;
    }
    return this.masterService.get_active_countrystatecity_list().pipe(
      tap({
        next: result => {           
          ctx.patchState({
              data:result?.data
          });
        },
        error: err => { 
          // throw new Error(err?.error?.message);
        }
      })
    );
  }

}
