import { Component } from '@angular/core';
import { PharmacyTabComponent } from "../../components/pharmacy-component/pharmacy-tab/pharmacy-tab.component";
import { PharmacyPrescriptionComponent } from "../../components/pharmacy-component/pharmacy-prescription/pharmacy-prescription.component";
import { PharmacyOrderComponent } from "../../components/pharmacy-component/pharmacy-order/pharmacy-order.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-page',
  standalone: true,
  imports: [PharmacyTabComponent, PharmacyPrescriptionComponent, PharmacyOrderComponent , CommonModule],
  templateUrl: './pharmacy-page.component.html',
  styleUrl: './pharmacy-page.component.css'
})
export class PharmacyPageComponent {
  selectedTab: string = 'prescription';

  onTabChange(tab: string) {
      this.selectedTab = tab;
  }
}
