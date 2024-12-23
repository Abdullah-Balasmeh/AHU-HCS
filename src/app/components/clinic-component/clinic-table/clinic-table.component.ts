import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-clinic-table',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent],
  templateUrl: './clinic-table.component.html',
  styleUrl: './clinic-table.component.css'
})
export class ClinicTableComponent implements AfterViewInit {
  patients: any[] = []; // Holds the patient data
  @Output() viewDetails = new EventEmitter<void>(); 
  isLoading = true;
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

  onViewDetails() {
    this.viewDetails.emit(); // Emit the event
  }
}
