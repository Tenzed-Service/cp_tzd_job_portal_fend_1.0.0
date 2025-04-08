import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: 'root' })
export class SingletonStoreService {
    public selectedUserType = new BehaviorSubject('');
}