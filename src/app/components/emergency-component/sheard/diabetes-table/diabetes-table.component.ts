import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from '../../../shared/loading-image/loading-image.component';
import { Patient } from '../../../../interfaces/users.interface';
import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-diabetes-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './diabetes-table.component.html',
  styleUrl: './diabetes-table.component.css'
})
export class DiabetesTableComponent {
ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  // Inject ApiService
  private apiService = inject(ApiService);

  // Input to receive selected patient
  @Input() patient!: Patient;

  // FormGroup for BP inputs
  diabetesForm = new FormGroup({
    FBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 100),]),
    RBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 140),]),
    note: new FormControl(''),
  });

  // Flag to track loading state
  isLoading = true;

  rangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = +control.value; // Convert to number
      if (value < min || value > max) {
        return { rangeError: `القيمة يجب أن تكون بين ${min} و ${max}` };
      }
      return null; // Valid value
    };
  }
  ngOnInit(): void {
    if (this.patient?.id) {
      this.loadPatientData();
    }
  }

  /**
   * Fetches the patient data from the database.
   */
  loadPatientData(): void {
    this.isLoading = true;
    this.apiService.getPatientById(this.patient.id).subscribe({
      next: (data: Patient) => {
        this.patient = data; // Update patient with fresh data
        this.isLoading = false;
      },
      error: () => {
        alert('Failed to load patient data.');
        this.isLoading = false;
      },
    });
  }

  /**
   * Adds a new BP reading to the patient's medical record.
   */
  addDiabetesReading(): void {
    if (this.diabetesForm.invalid) {
      alert('يرجى ملئ قراءات السكري');
      return;
    }

    const FBS = this.diabetesForm.get('FBS')?.value ?? '';
    const RBS = this.diabetesForm.get('RBS')?.value ?? '';
    const note = this.diabetesForm.get('note')?.value ?? '';

    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace('AM', 'ص').replace('PM', 'م');
    const day = now.toLocaleDateString('ar-EG', { weekday: 'long' });

    const newDiabetesEntry = {
      'FBS': FBS,
      'RBS': RBS,
      date: {
        day: day,
        dayDate: date,
        Time: time,
      },
      note: note,
    };

    this.patient.medicalRecord.followReadings.diabetes.push(newDiabetesEntry);

    this.diabetesForm.reset();
    // Update the patient record in the database
    this.apiService.updatePatient(this.patient.id, this.patient).subscribe({
      error: () => alert('Error while adding diabetes reading.'),
    });
  }


  deleteDiabetesReading(index: number): void {
    // Show confirmation dialog first
    const confirmed = confirm('هل أنت متأكد من حذف هذه القراءة؟');
    if (confirmed) {
      // If confirmed, delete the BP reading
      this.patient.medicalRecord.followReadings.diabetes.splice(index, 1);

      // Update the patient record in the database
      this.apiService.updatePatient(this.patient.id, this.patient).subscribe({
        next: () => alert('تم حذف القراءة بنجاح'),
        error: () => alert('حدث خطأ أثناء حذف القراءة'),
      });
    }
  }

}
