import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor {
  dateTimeField: string = ''; // Format: 'YYYY-MM-DDTHH:mm'
  @Input() prefixIcon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isInvalid: boolean = false;
  @Input() errorMessage: string = '';
  @Input() minDate?: string; // Format: 'YYYY-MM-DDTHH:mm'
  @Input() maxDate?: string; // Format: 'YYYY-MM-DDTHH:mm'
  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: string): void {
    if (value) {
      this.dateTimeField = value;
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
