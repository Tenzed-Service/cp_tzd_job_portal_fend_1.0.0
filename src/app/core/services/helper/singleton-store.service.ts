import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActionTypeEnum } from "../../enums/common.enum";
@Injectable({ providedIn: 'root' })
export class SingletonStoreService {
    public action = new BehaviorSubject(ActionTypeEnum.View);
    public formCode = new BehaviorSubject(null);
    public userSelected = new BehaviorSubject('');
    public sectionHeader = new BehaviorSubject('');
    public isLoading = new BehaviorSubject(false);
}