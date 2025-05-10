import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemModel, ErrorMessageList } from '../../../../core/models/common/common.models';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true
    }
  ]
})
export class SelectionComponent implements ControlValueAccessor {
  selectField: string = '';
  @Input() prefixIcon: string = '';
  @Input() dropDownListData: any[] = [];
  @Input() isDisabled: boolean = false;
  @Input() keyValue: string = 'value'; // Key for the value property (e.g., 'id', 'value')
  @Input() keyLabel: string = 'label'; // Key for the label property (e.g., 'name', 'label')
  @Input() isInvalid: boolean = false;
  @Input() errorList: ErrorMessageList[] = [];
  showSkillsDropdown = false;
  skillInput = '';
  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: string): void {
    if (value) {
      this.selectField = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onValueChange(value: any): void {
    this.onChange(value);
    this.onTouch();
  }
}
