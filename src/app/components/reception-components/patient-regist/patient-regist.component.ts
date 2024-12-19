import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from './../../../services/api.service';
import { LoadingImageComponent } from '../../shared/loading-image/loading-image.component';
import { Patient } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-patient-regist',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingImageComponent, CommonModule],
  templateUrl: './patient-regist.component.html',
  styleUrls: ['./patient-regist.component.css'],
})
export class PatientRegistComponent {
  private readonly apiService = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);
  rigest = signal(false);
  success = signal(false);
  errorMessage = '';
  error = false;

  registForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    patientName: new FormControl('', Validators.required),
    patientState: new FormControl('عيادة', Validators.required),
    patientType: new FormControl('طالب', Validators.required),
  });

  newPatient: Patient = this.getEmptyPatient();

  private getEmptyPatient(): Patient {
    return {
      id: '',
      name: '',
      gender: 'Male',
      state: '',
      status: '',
      type: '',
      date: {
        enterDate: '',
        leaveDate: '',
      },
      medicalRecord: {
        bloodType: '',
        medicalHistory: [],
        allergies: [],
        medications: [],
        clinicProcedures: [],
        emergencyProcedures: {
          BP: { 'BP-Up': '', 'BP-Down': '' },
          temp: '',
          pulse: '',
          resp: '',
          procedures: [],
        },
        followReadings: {
          BP: [],
          diabetes: [],
        },
        prescription: {
          medicalCondition: [],
          medicine: [],
          dosage: '',
        },
        medicalReport: {
          reportName: '',
          medicalCondition: [],
          recommendations: [],
        },
      },
    };
  }

  checkPatient() {
    const patientId = this.registForm.get('patientId')?.value;
    const patientType = this.registForm.get('patientType')?.value;

    if (!patientId) {
      this.setError(
        patientType === 'طالب' ? 'يرجى إدخال رقم الطالب' : 'يرجى إدخال رقم الموظف'
      );
      return;
    }

    if (patientType === 'طالب' && patientId.length === 12) {
      this.getStudentName(patientId);
    } else if (patientType === 'طالب' && patientId.length < 12) {
      this.setError('رقم الطالب يجب أن يتكون من 12 رقم');
    } else if (patientType === 'موظف' && patientId.length < 2) {
      this.setError('رقم الموظف يجب أن يتكون من رقمان او أكثر');
    } else if (patientType === 'موظف') {
      this.getEmpName(patientId);
    }
  }

  private getStudentName(id: string) {
    const subscription = this.apiService.getStudentById(id).subscribe({
      next: (student) => {
        if (student) {
          this.clearError();
          this.updatePatientDetails(student, 'طالب');
        }
      },
      error: () => this.setError('الطالب غير موجود'),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private getEmpName(id: string) {
    const subscription = this.apiService.getEmpById(id).subscribe({
      next: (emp) => {
        if (emp) {
          this.clearError();
          this.updatePatientDetails(emp, 'موظف');
        }
      },
      error: () => this.setError('الموظف غير موجود'),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private updatePatientDetails(person: any, type: string) {
    this.registForm.patchValue({ patientName: person.name });
    this.newPatient = {
      ...this.newPatient,
      id: this.registForm.get('patientId')?.value ?? '',
      name: person.name,
      gender: person.gender,
      type,
      status: person.status,
    };

    if (this.newPatient.status === '0') {
      this.handleInactivePerson(type);
    }
  }

  private handleInactivePerson(type: string) {
    const alertMessage =
      type === 'طالب'
        ? 'هذا الطالب/ة مؤجل/ة ولا يمكن إضافته'
        : 'هذا الموظف/ة ليس على رأس عمله';
    alert(alertMessage);
    if (type === 'طالب') this.error = true;
  }

  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  private clearError() {
    this.error = false;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.registForm.invalid) {
      this.setError('يرجى إدخال رقم المريض/ة بشكل صحيح');
      return;
    }

    const patientId = this.registForm.get('patientId')?.value ?? '';
    const state = this.registForm.get('patientState')?.value ?? '';

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date());

    const newPatient: Patient = {
      ...this.newPatient,
      id: patientId,
      state,
    };

    const subscription = this.apiService.addPatient(newPatient).subscribe({
      next: () => {
        this.success.set(true);
        this.resetForm();
      },
      error: () => this.setError('حدث خطأ أثناء إضافة المريض الجديد'),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private resetForm() {
    this.registForm.reset({
      patientId: '',
      patientName: '',
      patientState: 'عيادة',
      patientType: 'طالب',
    });
    this.newPatient = this.getEmptyPatient();
    this.clearError();
    setTimeout(() => this.success.set(false), 2000);
  }
}
