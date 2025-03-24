import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoaderState } from '../../../store/state/loader.state';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TableClickedAction, TableColumn } from '../../../interface/table.interface';
import { Params } from '@angular/router';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { Pager, TableConfigVM } from '../../../../core/models/common/common.model';
import { FieldDataTypeEnum } from '../../../../core/enums/common.enum';
import { JobListTypeEnum, JobTypeEnum } from '../../../../core/enums/job.enum';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule, TranslateModule, NgbModule,
    FormsModule, ReactiveFormsModule,
    PaginationComponent, DeleteModalComponent, ConfirmationModalComponent
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;

  @Input() tableConfig: TableConfigVM<any>;
  @Input() pagination: boolean = true;
  @Input() loading: boolean = true;
  @Input() topBar: boolean = true;

  @Output() tableChanged: EventEmitter<Pager> = new EventEmitter();
  @Output() action = new EventEmitter<TableClickedAction>();
  @Output() rowClicked = new EventEmitter<any>();

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;
  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public term = new FormControl();
  public rows = [1,10, 25, 50, 100];

  fieldDataTypeEnum = FieldDataTypeEnum;
  jobTypeEnum = JobTypeEnum;
  jobListTypeEnum = JobListTypeEnum;

  constructor(
  @Inject(DOCUMENT) private document: Document,
  public formatter: NgbDateParserFormatter
) {
   this.term.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged())
        .subscribe(
          (data: string) => {
          this.onChangeTable(data, 'search');
      });
}

  ngOnInit() {
  }

  onRowClicked(rowData: any): void {
      this.rowClicked.emit(rowData);
  }

  onChangeTable(data: TableColumn | any, type: string) {
    switch (type) {
      case 'paginate':
        this.tableConfig.filter.pageNo = 1;
        this.tableConfig.filter.pageSize = +data?.target?.value;        
        break;
      case 'page':
        this.tableConfig.filter.pageNo = data;        
        break;
      case 'search':
        this.tableConfig.filter.search = data;        
        break;    
      default:
        break;
    }
    this.tableChanged.emit(this.tableConfig.filter);
  }

  onActionClicked(actionType: any, rowData: any, value?: number) { 
      this.action.emit({actionToPerform: actionType, data: rowData});
  }

  showColumnValue(columnData:any, columnKey:string){
    return columnData[columnKey] ? columnData[columnKey] : '';
  }
  
  ngOnDestroy() {
  }
}
