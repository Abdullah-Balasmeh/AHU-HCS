import { Component, EventEmitter, Output } from '@angular/core';
import { ListTabComponent } from "../sherad-component/list-tab/list-tab.component";
import { AddMedicineComponent } from "../sherad-component/add-medicine/add-medicine.component";
import { AddDiseaseComponent } from "../sherad-component/add-disease/add-disease.component";
import { AddAllergyComponent } from "../sherad-component/add-allergy/add-allergy.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-section',
  standalone: true,
  imports: [ListTabComponent, AddMedicineComponent, AddDiseaseComponent, AddAllergyComponent , CommonModule],
  templateUrl: './list-section.component.html',
  styleUrl: './list-section.component.css'
})
export class ListSectionComponent {
  @Output() resetEvent = new EventEmitter<void>(); // Notify parent to reset the view

  selectedTab: string = 'add-medicine'; // Default tab

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
}
