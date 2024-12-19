import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-reception-table',
  standalone: true,
  imports: [CommonModule, EditDialogComponent, LoadingImageComponent],
  templateUrl: './reception-table.component.html',
  styleUrls: ['./reception-table.component.css'],
})
export class ReceptionTableComponent {
  patients: any[] = []; // Holds the patient data
  selectedPatient: any = null; // Holds the patient selected for editing
  isEditModalOpen = false; // Tracks whether the edit modal is open
  isLoading = true;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPatients(); // Load patients on component initialization
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

  openEditModal(index: number): void {
    this.selectedPatient = { ...this.patients[index] }; // Clone the selected patient
    this.isEditModalOpen = true; // Open the modal
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedPatient = null; // Reset the selected patient
  }

  saveUpdatedPatient(updatedPatient: any): void {
    const index = this.patients.findIndex((p) => p.id === updatedPatient.id);
    if (index > -1) {
      this.patients[index] = updatedPatient; // Update the local array
    }
    this.loadPatients(); 
    this.closeEditModal(); // Close the modal
  }

  deletePatient(index: number): void {
    const patient = this.patients[index];
    if (confirm(`هل أنت متأكد من حذف المريض/ة ${patient.name}`)) {
      this.apiService.deletePatient(patient.id).subscribe({
        next: () => {
          this.loadPatients(); // Reload patients after deletion
        },
        error: (err) => console.error('Error deleting patient:', err),
      });
    }
  }
}
