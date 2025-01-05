import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownListComponent } from "../../shared/dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-manager-analysis-report',
  standalone: true,
  imports: [DropdownListComponent],
  templateUrl: './manager-analysis-report.component.html',
  styleUrl: './manager-analysis-report.component.css'
})
export class ManagerAnalysisReportComponent {
  @Output() resetEvent = new EventEmitter<void>();


  reset(): void {
    this.resetEvent.emit(); 
  }
}
