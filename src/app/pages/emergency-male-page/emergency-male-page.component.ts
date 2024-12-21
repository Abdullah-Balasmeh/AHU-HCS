import { Component, signal } from '@angular/core';
import { EmergencyMaleTableComponent } from "../../components/emergency-male-component/emergency-male-table/emergency-male-table.component";
import { EmergencyMaleOrderComponent } from "../../components/emergency-male-component/emergency-male-order/emergency-male-order.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency-male-page',
  standalone: true,
  imports: [EmergencyMaleTableComponent, EmergencyMaleOrderComponent ,CommonModule],
  templateUrl: './emergency-male-page.component.html',
  styleUrl: './emergency-male-page.component.css'
})
export class EmergencyMalePageComponent {
  selectedCard =signal <string | null >(null);

  // Show the component based on the card clicked
  showComponent(card: string): void {
    this.selectedCard.set(card) ;
  }

  // Reset to show the cards again
  handleReset(): void {
    this.selectedCard.set(null);
  }
}
