import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PrescriptionComponent } from "../prescription/prescription.component";
import { ClinicProcedureComponent } from "../clinic-procedure/clinic-procedure.component";
import { ReportSectionComponent } from "../report-section/report-section.component";

@Component({
  selector: 'app-clinic-tab',
  standalone: true,
  imports: [CommonModule, PrescriptionComponent, ClinicProcedureComponent, ReportSectionComponent],
  templateUrl: './clinic-tab.component.html',
  styleUrl: './clinic-tab.component.css'
})
export class ClinicTabComponent {
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent
  selectedTab: string = 'prescription'; // Default tab

  onClose() {
    this.closeTab.emit(); // Emit the event
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
