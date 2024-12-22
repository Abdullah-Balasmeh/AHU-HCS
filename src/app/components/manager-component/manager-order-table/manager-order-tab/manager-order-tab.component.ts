import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manager-order-tab',
  standalone: true,
  imports: [],
  templateUrl: './manager-order-tab.component.html',
  styleUrl: './manager-order-tab.component.css'
})
export class ManagerOrderTabComponent {
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit(); // Emit the event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
