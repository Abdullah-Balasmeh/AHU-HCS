import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emergency-female-order',
  standalone: true,
  imports: [],
  templateUrl: './emergency-female-order.component.html',
  styleUrl: './emergency-female-order.component.css'
})
export class EmergencyFemaleOrderComponent {
  @Output() resetEvent = new EventEmitter<void>();


  reset(): void {
    this.resetEvent.emit(); 
  }
}
