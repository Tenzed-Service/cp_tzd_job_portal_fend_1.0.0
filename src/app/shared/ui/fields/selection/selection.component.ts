import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemModel } from '../../../../core/models/common/common.models';

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
  value: string = '';
  @Input() dropDownListData: DropdownItemModel[] = [];
  @Input() isDisabled: boolean = false;
  @Input() isInvalid: boolean = false;
  showSkillsDropdown = false;
  skillInput = '';
  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: string): void {
    if (value) {
      this.value = value;
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
