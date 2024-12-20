import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../components/shared/loading-image/loading-image.component";
import { Patient } from '../../interfaces/users.interface';

@Component({
  selector: 'app-login-patient-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './login-patient-page.component.html',
  styleUrl: './login-patient-page.component.css'
})
export class LoginPatientPageComponent {
  isLogging = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  @Output() isLoggingChange = new EventEmitter<boolean>();
  visible = true;
  changeType = true;
  errorMessage = signal<string>('');

  private readonly apiService = inject(ApiService);
  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);
  private readonly sharedService = inject(SharedService);

  loginForm = new FormGroup({
    userID: new FormControl(''),
    password: new FormControl(''),
  });



  constructor() {
    console.log('LoginPageComponent initialized');
  }

  // Validate user ID field
  validateFieldID(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 2 || value.length > 12) {
      inputElement.setCustomValidity(
        'يرجى إدخال رقم المريض على أن لا يقل عن رقمان ولا يزيد عن 12 رقم'
      );
    } else {
      inputElement.setCustomValidity('');
    }
  }

  // Validate password field
  validateFieldPassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 4 || value.length > 26) {
      inputElement.setCustomValidity(
        'يرجى إدخال كلمة المرور على أن لا تقل عن 4 خانات ولا تزيد عن 26 خانة'
      );
    } else {
      inputElement.setCustomValidity('');
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  // Handle form submission
  onSubmit(): void {
    this.errorMessage.set('');
    const userID = this.loginForm.value.userID?.trim();
    const password = this.loginForm.value.password?.trim();

    if (!userID || !password) {
      this.errorMessage.set('Please provide a valid user ID and password.');
      return;
    }

    this.isLoading.set(true);
    this.apiService
      .getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          const user = users.find(
            (u) => u.id === userID && u.password === password
          );

          if (user) {
            this.handleSuccessfulLogin(user);
          } else {
            this.errorMessage.set('Invalid user ID or password.');
            this.isLoading.set(false);
          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.errorMessage.set('An error occurred. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  private handleSuccessfulLogin(user: Patient): void {
            this.router.navigate([`/patient`], { state: { patient: user } });
            this.isLogging.set(true);
            this.isLoading.set(false);
          }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
