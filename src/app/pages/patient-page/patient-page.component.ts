import { Component, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PatientTabComponent } from "../../components/patient-component/patient-tab/patient-tab.component";
import { PatientInfoComponent } from "../../components/patient-component/patient-info/patient-info.component";
import { PatientReportTableComponent } from "../../components/patient-component/patient-report-table/patient-report-table.component";
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [PatientTabComponent, PatientInfoComponent, PatientReportTableComponent,CommonModule],
  templateUrl: './patient-page.component.html',
  styleUrl: './patient-page.component.css'
})
export class PatientPageComponent {
  selectedTab: string = 'patient-info';
  @Output() patient: any | null = null;
    private readonly sharedService = inject(SharedService);
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.patient = navigation.extras.state['patient'];
    }
  }

  onTabChange(tab: string) {
      this.selectedTab = tab;
  }
  logout(): void {
    const confirmLogout = confirm('هل أنت متأكد من تسجيل الخروج؟');
    if (confirmLogout) {
      this.sharedService.logout();
      this.router.navigate(['/login-patient']);
    }
}
}
