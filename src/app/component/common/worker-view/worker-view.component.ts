import { FilterSchema } from './../../../shared/component/filters/filters.component.models';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { WorkerCardViewComponent } from './worker-card-view/worker-card-view.component';
import { GridViewType } from '../../../core/enums/common.enum';
import { FiltersComponent } from '../../../shared/component/filters/filters.component';
import { TableSchema } from '../../../shared/ui/table/table.component.models';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { PaginationSchema } from '../../../shared/ui/pagination/pagination.component.models';

@Component({
    selector: 'app-worker-view',
    templateUrl: './worker-view.component.html',
    styleUrls: ['./worker-view.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FiltersComponent,
      WorkerCardViewComponent,
      TableComponent,
      PaginationComponent,
    ]
})
export class WorkerViewComponent {
  gridViewType = GridViewType;
  @Input() workerList: any[] = [];
  @Input() actionList:any[] = [];
  @Input() filterSchema!: FilterSchema<any,any>;
  @Input() tableSchema!: TableSchema<any,any>;
  @Input() paginationSchema!: PaginationSchema<any,any>;
  @Output() actionEvent = new EventEmitter();
    
  constructor() {  
  }

  ngOnInit() {
  }

  onActionEvent(action: any) {
    this.actionEvent.emit(action); 
  }
}
