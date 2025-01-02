import { Component, EventEmitter, Output } from '@angular/core';
import { ClinicTabComponent } from "../../components/clinic-component/clinic-tab/clinic-tab.component";
import { CommonModule } from '@angular/common';
import { PatientInfoClinicComponent } from "../../components/shared/patient-info-clinic/patient-info-clinic.component";
import { PrescriptionComponent } from "../../components/clinic-component/prescription/prescription.component";
import { ClinicProcedureComponent } from "../../components/clinic-component/clinic-procedure/clinic-procedure.component";
import { ReportSectionComponent } from "../../components/clinic-component/report-section/report-section.component";
import { ApiService } from '../../services/api.service';
import { LoadingImageComponent } from "../../components/shared/loading-image/loading-image.component";

@Component({
  selector: 'app-clinic-page',
  standalone: true,
  imports: [ClinicTabComponent, CommonModule, PatientInfoClinicComponent, PrescriptionComponent, ClinicProcedureComponent, ReportSectionComponent, LoadingImageComponent],
  templateUrl: './clinic-page.component.html',
  styleUrl: './clinic-page.component.css'
})
export class ClinicPageComponent {
patients: any[] = [];
  isLoading = true;
  selectedPatient: any = null; 
  @Output() resetEvent = new EventEmitter<void>(); 
  selectedTab: string='patient-info';
  showTable: boolean = true;
  showTabs: boolean = false; 
  constructor(private readonly apiService: ApiService) {}
  ngAfterViewInit(): void {
    this.loadPatients();
  }

  
  loadPatients(): void {
    this.apiService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading = false;
      },
      error: (err) => console.error('Error loading patients:', err),
    });
  }

  get filteredPatients(): any[] {
    return this.patients.filter(
      (patient) =>
        (patient.state === 'عيادة' )
    );
  }

  onViewDetails(patient : any) {
    this.selectedTab= 'patient-info';
    this.selectedPatient=patient;
    this.selectedPatient = patient; 
    this.showTable = false;
    this.showTabs = true;
  }
  reset(): void {
    this.resetEvent.emit(); // Emit the renamed `resetEvent`
  }

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }
  closeAll(): void {
    this.showTable = true;
    this.showTabs = false;
  }
}
