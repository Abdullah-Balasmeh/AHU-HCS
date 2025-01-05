import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { User } from '../../interfaces/users.interface';
import { LoadingImageComponent } from '../../components/shared/loading-image/loading-image.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingImageComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'], 
})
export class LoginPageComponent {
  isLogging = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  @Output() isLoggingChange = new EventEmitter<boolean>();
  visible = true;
  changeType = true;
  errorMessage =signal<string> ('');
  roles: string[] = [];

  private readonly apiService = inject(ApiService);
  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);
  private readonly sharedService = inject(SharedService);

  loginForm = new FormGroup({
    userID: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly roleNameMapping: { [key: string]: string } = {
    Admin: 'admin',
    Manager: 'manager',
    Receptionist: 'reception',
    Doctor: 'clinic',
    NurseM: 'emergency-male',
    NurseF: 'emergency-female',
    Pharmacist: 'pharmacy',
  };

  constructor() {
    console.log('LoginPageComponent initialized');
  }

  // Validate user ID field
  validateFieldID(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 2 || value.length > 12) {
      inputElement.setCustomValidity(
        'يرجى إدخال رقم المستخدم على أن لا يزيد عن 12 رقم'
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
    debugger;
    this.errorMessage.set('');
    const userID = this.loginForm.value.userID?.trim();
    const password = this.loginForm.value.password?.trim();

    if (!userID || !password) {
      this.errorMessage.set('Please provide a valid user ID and password.');
      return;
    }

    this.isLoading.set(true);
    this.apiService
      .getUsers()
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

  private handleSuccessfulLogin(user: User): void {
    const roleIDs = Array.isArray(user.roleID) ? user.roleID : [user.roleID];
    if (!roleIDs.length) {
      this.errorMessage.set('No roles assigned to this user.');
      this.isLoading.set(false);
      return;
    }

    this.sharedService.setCurrentUserID(user.id);
    this.sharedService.setRolesData(roleIDs);

    this.apiService
      .getRolesByIDs(roleIDs)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (roles) => {
          const roleNames = roles.map((role) => this.roleNameMapping[role.roleName]);
          if (roleNames.length) {
            this.router.navigate([`/${roleNames[0]}`], { state: { roles: roleIDs } });
            this.isLogging.set(true);
            this.sharedService.updateIsLogging(this.isLogging());
          } else {
            this.errorMessage.set('No roles assigned to this user.');
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
          this.errorMessage.set('Failed to fetch roles.');
          this.isLoading.set(false);
        },
      });
  }

  // Cleanup subscriptions on destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
