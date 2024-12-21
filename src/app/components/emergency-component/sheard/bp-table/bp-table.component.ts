import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../../interfaces/users.interface';
import { ApiService } from '../../../../services/api.service';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bp-table',
  standalone: true,
  imports: [LoadingImageComponent , ReactiveFormsModule ,CommonModule],
  templateUrl: './bp-table.component.html',
  styleUrl: './bp-table.component.css'
})
export class BpTableComponent {
  // Inject ApiService
  private apiService = inject(ApiService);

  // Input to receive selected patient
  @Input() patient!: Patient;

  // FormGroup for BP inputs
  bpForm = new FormGroup({
    bpUp: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(50, 300), ]),
    bpDown: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/) ,this.rangeValidator(20, 200), ]),
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
  addBpReading(): void {
    if (this.bpForm.invalid) {
      alert('يرجى ملئ قراءات ضغط الدم');
      return;
    }

    const bpUp = this.bpForm.get('bpUp')?.value ?? '';
    const bpDown = this.bpForm.get('bpDown')?.value ?? '';
    const note = this.bpForm.get('note')?.value ?? '';

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

    const newBpEntry = {
      'BP-Up': bpUp,
      'BP-Down': bpDown,
      date: {
        day: day,
        dayDate: date,
        Time: time,
      },
      note: note,
    };

    this.patient.medicalRecord.followReadings.BP.push(newBpEntry);
    
    this.bpForm.reset();
    // Update the patient record in the database
    this.apiService.updatePatient(this.patient.id, this.patient).subscribe({
      error: () => alert('Error while adding BP reading.'),
    });
  }


  deleteBpReading(index: number): void {
    // Show confirmation dialog first
    const confirmed = confirm('هل أنت متأكد من حذف هذه القراءة؟');
    if (confirmed) {
      // If confirmed, delete the BP reading
      this.patient.medicalRecord.followReadings.BP.splice(index, 1);
  
      // Update the patient record in the database
      this.apiService.updatePatient(this.patient.id, this.patient).subscribe({
        next: () => alert('تم حذف القراءة بنجاح'),
        error: () => alert('حدث خطأ أثناء حذف القراءة'),
      });
    }
  }
  
}
