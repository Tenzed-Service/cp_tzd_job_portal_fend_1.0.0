import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleInputComponent),
      multi: true
    }
  ]
})
export class SimpleInputComponent implements ControlValueAccessor {
  @Input() isDisabled: boolean = false;
  @Input() prefixIcon: string = '';
  @Input() placeholder: string = '';
  simpleInputInput = '';
  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: string): void {
    if (value !== null && value !== undefined) {
      this.simpleInputInput = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSearchInputChange(value: any): void {
    this.onChange(value?.target?.value);
    this.onTouch();
  }
}
