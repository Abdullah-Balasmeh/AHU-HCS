import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrescriptionComponent } from "../prescription/prescription.component";
import { ClinicProcedureComponent } from "../clinic-procedure/clinic-procedure.component";
import { ReportSectionComponent } from "../report-section/report-section.component";
import { PatientInfoClinicComponent } from "../../shared/patient-info-clinic/patient-info-clinic.component";
import { Patient } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-clinic-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-tab.component.html',
  styleUrl: './clinic-tab.component.css'
})
export class ClinicTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>(); // Event emitter to notify parent

  closeTab(): void {
    this.close.emit(); // Emit the close event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab); // Emit the selected tab to the parent
  }
}
