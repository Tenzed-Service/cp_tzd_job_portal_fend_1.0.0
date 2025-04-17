import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemModel } from '../../../../core/models/common/common.models';

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
      multi: true
    }
  ]
})
export class MultiSelectionComponent implements ControlValueAccessor {
  selectedSkills: string[] = [];
  @Input() dropDownListData: DropdownItemModel[] = [];
  @Input() isDisabled: boolean = false;
  @Input() isInvalid: boolean = false;
  showSkillsDropdown = false;
  skillInput = '';
  onChange: any = () => {};
  onTouch: any = () => {};

  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
    }else{
      this.selectedSkills = this.selectedSkills.filter((s) => s!== skill);
    }
    this.onChange(this.selectedSkills);
    this.skillInput = '';
    this.showSkillsDropdown = false;
  }

  removeSkill(skill: string): void {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    this.onChange(this.selectedSkills);
  }

  toggleDropdown(): void {
    this.showSkillsDropdown = !this.showSkillsDropdown;
  }

  filterSkills(): DropdownItemModel[] {
    return this.dropDownListData.filter(
      (skill:DropdownItemModel) =>
        // !this.selectedSkills.includes(skill) &&
        skill.value.toLowerCase().includes(this.skillInput.toLowerCase())
    );
  }

  onInputBlur(): void {
    // Small delay to allow click events on dropdown items to fire first
    setTimeout(() => {
      this.showSkillsDropdown = false;
    },100);
  }
  writeValue(value: string[]): void {
    if (value) {
      this.selectedSkills = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
