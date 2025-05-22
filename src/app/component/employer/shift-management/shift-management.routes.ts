import { Routes } from "@angular/router";
import { ShiftComponent } from "./shift/shift.component";
import { ShiftAssignComponent } from "./shift-assign/shift-assign.component";
import { ShiftFormComponent } from "./shift/shift-form/shift-form.component";

export const shiftManagementRoutes: Routes = [
  {
    path: "shifts",
    component: ShiftComponent,
  },
  {
    path: "shifts/create",
    component: ShiftFormComponent,
  },
  {
    path: "shifts/edit/:id",
    component: ShiftFormComponent,
  },
  {
    path: "shift-assign",
    component: ShiftAssignComponent,
  },
];