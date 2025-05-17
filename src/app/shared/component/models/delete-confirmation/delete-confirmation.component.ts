
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelActions } from '../../../../core/enums/common.enum';
import { DeleteModelSchema } from './delete-confirmation.component.models';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.scss'],
    standalone: true,
    imports: [
      CommonModule]
})
export class DeleteConfirmationComponent {
  @Input() deleteModelSchema!: DeleteModelSchema<any, any>;
  modelActions = ModelActions;
    
  constructor(
  ) {
  }

  submit(type:string) {
    if (type === this.modelActions.Close) {
      this.deleteModelSchema.cancel(this.deleteModelSchema,type);
    }
    if (type === this.modelActions.Submit) {
      this.deleteModelSchema.confirm(this.deleteModelSchema,type);
    }
  }
}
