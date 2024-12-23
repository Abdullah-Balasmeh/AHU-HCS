import { Component } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [MultiSelectDropdownComponent],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {

}
