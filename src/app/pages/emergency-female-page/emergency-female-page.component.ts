import { Component, signal } from '@angular/core';
import { EmergencyFemaleTableComponent } from "../../components/emergeny-female-component/emergency-female-table/emergency-female-table.component";
import { EmergencyFemaleOrderComponent } from "../../components/emergeny-female-component/emergency-female-order/emergency-female-order.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency-female-page',
  standalone: true,
  imports: [EmergencyFemaleTableComponent, EmergencyFemaleOrderComponent,CommonModule],
  templateUrl: './emergency-female-page.component.html',
  styleUrl: './emergency-female-page.component.css'
})
export class EmergencyFemalePageComponent {
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
