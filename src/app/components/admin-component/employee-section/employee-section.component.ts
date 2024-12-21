import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeTabComponent } from "../sherad-component/employee-tab/employee-tab.component";
import { EmployeeRigestComponent } from "../sherad-component/employee-rigest/employee-rigest.component";
import { EmployeeTableComponent } from "../sherad-component/employee-table/employee-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-section',
  standalone: true,
  imports: [EmployeeTabComponent, EmployeeRigestComponent, EmployeeTableComponent , CommonModule],
  templateUrl: './employee-section.component.html',
  styleUrl: './employee-section.component.css'
})
export class EmployeeSectionComponent {
  @Output() resetEvent = new EventEmitter<void>(); // Notify parent to reset the view

  selectedTab: string = 'employee-rigest'; // Default tab

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
}
