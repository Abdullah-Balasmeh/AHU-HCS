import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from '../../../shared/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-emergency-procedure-dialog',
  standalone: true,
  imports: [MultiSelectDropdownComponent,CommonModule, FormsModule],
  templateUrl: './emergency-procedure-dialog.component.html',
  styleUrl: './emergency-procedure-dialog.component.css'
})
export class EmergencyProcedureDialogComponent {
@Input() patient: any; // Patient data passed from parent
  // Checkbox state variables
  exam1Checked = false;
  exam2Checked = false;
  exam3Checked = false;
  exam4Checked = false;
  @Output() close = new EventEmitter<void>(); // Event emitter to notify parent

  closeDialog(): void {
    this.close.emit(); // Emit the close event
  }
  // Handle numeric input sanitization
  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9^.]/g, '');
  }

}
