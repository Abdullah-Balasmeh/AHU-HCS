import { Component } from '@angular/core';
import { PatientRegistComponent } from "../../components/reception-components/patient-regist/patient-regist.component";
import { ReceptionTableComponent } from "../../components/reception-components/reception-table/reception-table.component";
import { QrCodeComponent } from "../../components/reception-components/qr-code/qr-code.component";
import { NavTabComponent } from "../../components/reception-components/nav-tab/nav-tab.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-page',
  standalone: true,
  imports: [PatientRegistComponent, ReceptionTableComponent, QrCodeComponent, NavTabComponent ,CommonModule],
  templateUrl: './reception-page.component.html',
  styleUrl: './reception-page.component.css'
})
export class ReceptionPageComponent {
  selectedTab: string = 'register-patient'; // Default tab

  onTabChange(tab: string) {
      this.selectedTab = tab; // Update the selected tab
  }
}
