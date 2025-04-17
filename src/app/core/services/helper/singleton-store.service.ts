import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { breadCrumb } from "../../../layout/header/header.component";
@Injectable({ providedIn: 'root' })
export class SingletonStoreService {
    public selectedUserType = new BehaviorSubject('');
    public breadCrumbItems = new BehaviorSubject<breadCrumb[]>([]);
    public sidebarOpen = new BehaviorSubject<boolean>(true);
}