import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'verbena-switch',
  templateUrl: './verbena-switch.component.html',
  styleUrls: ['./verbena-switch.component.css']
})
export class VerbenaSwitchComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customStyles: string = '';

  @Output() change = new EventEmitter<boolean>();

  toggleSwitch() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.change.emit(this.checked);
    }
  }

  onChange(event: Event) {
    if (!this.disabled) {
      this.checked = (event.target as HTMLInputElement).checked;
      this.change.emit(this.checked);
    }
  }
}