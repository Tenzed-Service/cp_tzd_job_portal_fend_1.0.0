import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, HostListener, Input } from '@angular/core';
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

  isOpen = false;
  selectedLabel: string = '';

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  onInputBlur(): void {
    // Small delay to allow click events on dropdown items to fire first
    setTimeout(() => {
      this.isOpen = false;
    }, 100);
  }

  selectItem(item: any) {
    this.selectField = item[this.keyValue];
    this.selectedLabel = item[this.keyLabel];
    this.onValueChange(this.selectField);
    this.isOpen = false;
  }

  ngOnInit() {
    // Set initial selected label if value exists
    if (this.selectField) {
      const selectedItem = this.dropDownListData.find(item => item[this.keyValue] === this.selectField);
      if (selectedItem) {
        this.selectedLabel = selectedItem[this.keyLabel];
      }
    }
  }
}
