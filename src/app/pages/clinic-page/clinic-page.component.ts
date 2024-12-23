import { Component } from '@angular/core';
import { ClinicTableComponent } from "../../components/clinic-component/clinic-table/clinic-table.component";
import { ClinicTabComponent } from "../../components/clinic-component/clinic-tab/clinic-tab.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinic-page',
  standalone: true,
  imports: [ClinicTableComponent, ClinicTabComponent , CommonModule],
  templateUrl: './clinic-page.component.html',
  styleUrl: './clinic-page.component.css'
})
export class ClinicPageComponent {
  showTable: boolean = true; // Initially show the table

  // Toggle between table and tab views
  toggleView() {
    this.showTable = !this.showTable;
  }
}
