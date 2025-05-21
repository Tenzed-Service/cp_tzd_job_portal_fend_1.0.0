import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, input, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemModel, ErrorMessageList } from '../../../../core/models/common/common.models';
import { Event } from '@angular/router';

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
  @Input() prefixIcon: string = '';
  @Input() dropDownListData: any[] = [];
  @Input() isDisabled: boolean = false;
  @Input() keyValue: string = 'value'; // Key for the value property (e.g., 'id', 'value')
  @Input() keyLabel: string = 'label'; // Key for the label property (e.g., 'name', 'label')
  @Input() isInvalid: boolean = false;
  @Input() errorList: ErrorMessageList[] = [];
  @Input() rounded: boolean = true;
  onChange: any = () => {};
  onTouch: any = () => {};
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  showDropdown: boolean = false;
  searchTerm: string = '';
  selectedValue: any = null;
  filteredOptions: any[] = [];
  
  writeValue(value: string): void {
    this.filteredOptions = [...this.dropDownListData];
    if (value) {
      this.selectedValue = value;
      this.searchTerm = this.filteredOptions.find(option => option.value === value)?.label || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // onValueChange(value: any): void {
  //   this.onChange(value);
  //   this.onTouch();
  // }

  searchValue(event: any){
    if (event?.target?.value) {
      this.filteredOptions = this.dropDownListData.filter(option =>
        option.label.toLowerCase().includes(event?.target?.value.toLowerCase())
      );
    } else {
      this.filteredOptions = [...this.dropDownListData];
    }    
  }

  selectOption(option: any) {
    this.selectedValue = option.value;
    this.searchTerm = option.label;
    this.showDropdown = false;
    this.onChange(option.value);
    this.onTouch();
    this.filteredOptions = [...this.dropDownListData];
  }

  onInputBlur() {
    setTimeout(() => {
      this.showDropdown = false;
      if (!this.selectedValue) {
        this.searchTerm = '';
      }else{
        this.searchTerm = this.filteredOptions.find(option => option.value === this.selectedValue)?.label || '';
      }
    }, 200);
  }
}
