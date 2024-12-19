import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from './../../../services/api.service';
import { LoadingImageComponent } from '../../shared/loading-image/loading-image.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingImageComponent , CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  @Input() patient: any; // Input to receive the selected patient
  @Output() save = new EventEmitter<any>(); // Event to emit when saving changes
  @Output() close = new EventEmitter<void>(); // Event to emit when closing the dialog
  saving = signal(false);
  private readonly apiService=inject(ApiService);
  editForm: FormGroup;
  isDisabled: boolean = true; // Set to true to disable the inputs
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required], // Read-only field
      name: ['', Validators.required],
      state: ['', Validators.required],
      type: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges(): void {
    if (this.patient) {
      this.editForm.patchValue(this.patient); // Populate the form with the patient data
    }
  }

  saveChanges(): void {
    this.saving.set(true);
    if (this.editForm.valid) {
      const updatedPatient = { ...this.patient, ...this.editForm.getRawValue() };
      this.apiService.updatePatient( updatedPatient.id ,updatedPatient).subscribe({
        next: () => {
          this.saving.set(false);
          this.closeDialog();
          this.save.emit(updatedPatient); // Emit the updated patient
        },
        error: () => {
          this.saving.set(false);
          alert('حدث خطأ أثناء الحفظ');
        },
        complete: () => {
          this.saving.set(false);
        }
      }
        
      )
    }
  }

  closeDialog(): void {
    this.close.emit(); // Emit the close event
  }
}
