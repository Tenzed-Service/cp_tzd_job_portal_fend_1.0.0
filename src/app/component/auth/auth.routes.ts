import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserSelectionComponent } from "./user-selection/user-selection.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

export const auth: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "user-selection",
    component: UserSelectionComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
];