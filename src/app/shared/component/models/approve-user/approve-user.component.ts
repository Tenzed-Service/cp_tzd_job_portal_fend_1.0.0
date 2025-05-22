
import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveModalSchema } from './approve-user.component.models';

@Component({
    selector: 'app-approve-user',
    templateUrl: './approve-user.component.html',
    styleUrls: ['./approve-user.component.scss'],
    standalone: true,
    imports: [
      CommonModule]
})
export class ApproveUserComponent {
  @Input() approveModalSchema!:ApproveModalSchema<any, any>
    
  constructor() {
  }

  action(type: string) {
    this.approveModalSchema.action(this.approveModalSchema,type,'');
  }
}
