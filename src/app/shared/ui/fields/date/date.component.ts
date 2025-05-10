import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements ControlValueAccessor {
  dateField: string = ''; // Format: 'YYYY-MM-DD'
  @Input() prefixIcon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isInvalid: boolean = false;
  @Input() errorMessage: string = '';
  @Input() minDate?: string; // Format: 'YYYY-MM-DD'
  @Input() maxDate?: string; // Format: 'YYYY-MM-DD'
  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: string): void {
    if (value !== undefined) {
      this.dateField = value;
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
