import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FollowingTabComponent } from "../../emergency-component/sheard/following-tab/following-tab.component";
import { BpTableComponent } from "../../emergency-component/sheard/bp-table/bp-table.component";

import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { EmergencyProcedureDialogComponent } from '../../emergency-component/sheard/emergency-procedure-dialog/emergency-procedure-dialog.component';
import { DiabetesTableComponent } from '../../emergency-component/sheard/diabetes-table/diabetes-table.component';
import { PatientInfoClinicComponent } from "../../shared/patient-info-clinic/patient-info-clinic.component";
import { EmergencyTabComponent } from "../../emergency-component/sheard/emergency-tab/emergency-tab.component";

@Component({
  selector: 'app-emergency-male-table',
  standalone: true,
  imports: [CommonModule, EmergencyProcedureDialogComponent, FollowingTabComponent, BpTableComponent, DiabetesTableComponent, LoadingImageComponent, PatientInfoClinicComponent, EmergencyTabComponent],
  templateUrl: './emergency-male-table.component.html',
  styleUrl: './emergency-male-table.component.css'
})
export class EmergencyMaleTableComponent {
  @Output() resetEvent = new EventEmitter<void>(); // Emits reset event
  patients: any[] = []; // Holds the patient data
  selectedTab: string='';
  showTable: boolean = true; // Controls visibility of the main table
  showEmergencyDialog: boolean = false; // Controls visibility of Emergency Dialog
  showFollowingTab: boolean = false; // Controls visibility of the Following Tab
  selectedPatient: any = null; // Store selected patient info
  isLoading = true;
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPatients(); // Load patients on component initialization
  }

  loadPatients(): void {
    this.apiService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading=false;
      },
      error: (err) => console.error('Error loading patients:', err),
    });
  }

  // Filter the patients to include only specific states
  get filteredPatients(): any[] {
    return this.patients.filter(
      (patient) =>
        (patient.state === 'طوارئ' || patient.state === 'متابعة الضغط/السكري') &&
        patient.gender === 'Male'
    );
  }

  // Emit the reset event when "Back" is clicked
  reset(): void {
    this.resetEvent.emit(); // Emit the renamed `resetEvent`
  }

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  // Show Emergency Dialog and hide the table
  openEmergencyDialog(patient: any): void {
    this.selectedTab= 'patient-info';
    this.selectedPatient = patient; // Set the selected patient
    this.showTable = false;
    this.showEmergencyDialog = true;
    this.showFollowingTab = false;
  }

  // Show Following Tab and hide the table
  openFollowingTab(patient: any): void {
    this.selectedTab= 'B.P';
    this.selectedPatient = patient; // Set the selected patient
    this.showTable = false;
    this.showFollowingTab = true;
    this.showEmergencyDialog = false;
  }

  // Reset to show the table and hide other sections
  closeAll(): void {
    this.showTable = true;
    this.showEmergencyDialog = false;
    this.showFollowingTab = false;
  }
}
