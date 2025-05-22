import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
} from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageList } from '../../../../core/models/common/common.models';

@Component({
  selector: 'app-multi-selection',
  templateUrl: './multi-selection.component.html',
  styleUrls: ['./multi-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectionComponent),
      multi: true,
    },
  ],
})
export class MultiSelectionComponent implements ControlValueAccessor {
  selectedField: any[] = [];
  @Input() dropDownListData: any[] = [];
  @Input() isDisabled: boolean = false;
  @Input() keyValue: string = 'value'; // Key for the value property (e.g., 'id', 'value')
  @Input() keyLabel: string = 'label'; // Key for the label property (e.g., 'name', 'label')
  @Input() isInvalid: boolean = false;
  @Input() errorList: ErrorMessageList[] = [];
  showFieldDropdown = false;
  fieldInput = '';
  onChange: any = () => {};
  onTouch: any = () => {};

  // Add a skill to the selected list
  addField(field: any): void {
    if (!field || !field[this.keyValue]) {
      return;
    }

    const isSelected = this.selectedField.some(
      (s: any) => s[this.keyValue] === field[this.keyValue]
    );

    if (!isSelected) {
      this.selectedField.push(field);
    } else {
      this.selectedField = this.selectedField.filter(
        (s: any) => s[this.keyValue] !== field[this.keyValue]
      );
    }

    this.onChange(this.selectedField.map((s: any) => s[this.keyValue]));
    this.fieldInput = '';
    this.showFieldDropdown = false;
  }

  // Check if a skill is selected
  isFieldSelected(field: any): boolean {
    return this.selectedField.some(
      (s: any) => s[this.keyValue] === field[this.keyValue]
    );
  }

  removeField(field: any): void {
    if (!field || !field[this.keyValue]) {
      return;
    }

    this.selectedField = this.selectedField.filter(
      (s: any) => s[this.keyValue] !== field[this.keyValue]
    );
    const select = this.selectedField.map((s: any) => s[this.keyValue]);
    this.onChange(select);
  }

  toggleDropdown(): void {
    this.showFieldDropdown = !this.showFieldDropdown;
  }

  filterField(): any[] {
    return this.dropDownListData.filter((field: any) =>
      // !this.selectedField.includes(field) &&
      field[this.keyLabel].toLowerCase().includes(this.fieldInput.toLowerCase())
    );
  }

  onInputBlur(): void {
    // Small delay to allow click events on dropdown items to fire first
    setTimeout(() => {
      this.showFieldDropdown = false;
    }, 100);
  }
  writeValue(value: string[]): void {
    if (value && Array.isArray(value)) {
      // Map the incoming value array (e.g., ['id1', 'id2']) to the corresponding dropdown items
      this.selectedField = this.dropDownListData.filter((item) =>
        value.includes(item[this.keyValue])
      );
    } else {
      this.selectedField = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
