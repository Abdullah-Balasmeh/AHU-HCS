import { Component, Input } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownListComponent } from "../../shared/dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [MultiSelectDropdownComponent, CommonModule, FormsModule, DropdownListComponent],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent {
@Input() patient: any | null = null;
vaccineStatus: string = ''; // Holds the selected value: 'yes' or 'no'
selectedFileName: string | null = null;

onFileSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selectedFileName = inputElement.files[0].name;
  }
}
}
