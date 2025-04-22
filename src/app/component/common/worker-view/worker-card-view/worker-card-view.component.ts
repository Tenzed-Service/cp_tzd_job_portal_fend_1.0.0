import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrigActionVM } from '../../../../core/models/common/common.models';

@Component({
    selector: 'app-worker-card-view',
    templateUrl: './worker-card-view.component.html',
    styleUrls: ['./worker-card-view.component.scss'],
    standalone: true,
    imports: [
      CommonModule
    ]
})
export class WorkerCardViewComponent {
  @Input() workerList: any[] = [];
  @Input() actions: GrigActionVM[] = [];
  @Output() actionEvent = new EventEmitter();
    
  constructor() {  
  }

  ngOnInit() {
  }

  clickAction(action: string, item?: any) {
    this.actionEvent.emit({action, item}); 
  }

}
