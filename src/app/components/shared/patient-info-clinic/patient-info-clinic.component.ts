import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import { MultiSelectDropdownComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-patient-info-clinic',
  standalone: true,
  imports: [MultiSelectDropdownComponent, CommonModule, FormsModule, DropdownListComponent],
  templateUrl: './patient-info-clinic.component.html',
  styleUrl: './patient-info-clinic.component.css'
})
export class PatientInfoClinicComponent {
@Input() patient: any | null = null;

}
