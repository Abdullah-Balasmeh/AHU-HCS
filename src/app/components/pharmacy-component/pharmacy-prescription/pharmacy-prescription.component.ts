import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PrescriptionDialogComponent } from "../prescription-dialog/prescription-dialog.component";
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-pharmacy-prescription',
  standalone: true,
  imports: [CommonModule, PrescriptionDialogComponent, LoadingImageComponent],
  templateUrl: './pharmacy-prescription.component.html',
  styleUrl: './pharmacy-prescription.component.css'
})
export class PharmacyPrescriptionComponent {
  patients: any[] = [];
  showTab: boolean = true;
  showPrescriptionDialog: boolean = false;
  selectedPatient: any = null;
  isLoading = true;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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

  // Filter the patients to include only specific states
  get filteredPatients(): any[] {
    return this.patients.filter(patient =>
    ( patient.state === 'عيادة')
    );
  }

  openPrescriptionDialog(patient: any): void {
    this.selectedPatient = patient;
    this.showTab = false;
    this.showPrescriptionDialog = true;
  }

  closeAll(): void {
    this.showPrescriptionDialog = false;
    this.showTab = true;
  }
}
