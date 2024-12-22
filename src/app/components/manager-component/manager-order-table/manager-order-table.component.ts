import { Component, EventEmitter, Output } from '@angular/core';
import { ManagerOrderTabComponent } from "./manager-order-tab/manager-order-tab.component";
import { ManagerMaleOrderTableComponent } from "./manager-male-order-table/manager-male-order-table.component";
import { ManagerFemaleOrderTableComponent } from "./manager-female-order-table/manager-female-order-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-order-table',
  standalone: true,
  imports: [ManagerOrderTabComponent, ManagerMaleOrderTableComponent, ManagerFemaleOrderTableComponent ,CommonModule],
  templateUrl: './manager-order-table.component.html',
  styleUrl: './manager-order-table.component.css'
})
export class ManagerOrderTableComponent {
  selectedTab: string = 'male-order';
  @Output() resetEvent = new EventEmitter<void>();

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
}
