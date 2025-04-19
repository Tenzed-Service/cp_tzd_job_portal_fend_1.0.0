import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { breadCrumb } from "../../../layout/header/header.component";
import { UserType } from "../../enums/common-enum";
@Injectable({ providedIn: 'root' })
export class SingletonStoreService {
    public selectedUserType = new BehaviorSubject<string>(UserType.EMPLOYEE);
    public breadCrumbItems = new BehaviorSubject<breadCrumb[]>([]);
    public sidebarOpen = new BehaviorSubject<boolean>(true);
}