import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-tab',
  standalone: true,
  imports: [],
  templateUrl: './list-tab.component.html',
  styleUrl: './list-tab.component.css'
})
export class ListTabComponent {
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit(); // Emit the event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
