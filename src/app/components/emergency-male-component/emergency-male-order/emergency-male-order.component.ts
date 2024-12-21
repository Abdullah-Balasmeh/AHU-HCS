import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emergency-male-order',
  standalone: true,
  imports: [],
  templateUrl: './emergency-male-order.component.html',
  styleUrl: './emergency-male-order.component.css'
})
export class EmergencyMaleOrderComponent {
  @Output() resetEvent = new EventEmitter<void>();


  reset(): void {
    this.resetEvent.emit(); 
  }
}
