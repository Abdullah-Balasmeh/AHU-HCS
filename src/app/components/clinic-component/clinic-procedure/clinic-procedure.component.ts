import { Component, Input } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinic-procedure',
  standalone: true,
  imports: [MultiSelectDropdownComponent,CommonModule,FormsModule],
  templateUrl: './clinic-procedure.component.html',
  styleUrl: './clinic-procedure.component.css'
})
export class ClinicProcedureComponent {
  @Input() patient: any; // Patient data passed from parent
  // Checkbox state variables
  exam1Checked = false;
  exam2Checked = false;
  exam3Checked = false;
  exam4Checked = false;
  hasChecked   = false;



  // Handle numeric input sanitization
  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9^.]/g, '');
  }

}
