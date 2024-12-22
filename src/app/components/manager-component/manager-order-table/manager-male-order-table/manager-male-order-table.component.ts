import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-male-order-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule],
  templateUrl: './manager-male-order-table.component.html',
  styleUrl: './manager-male-order-table.component.css'
})
export class ManagerMaleOrderTableComponent {
  isLoading=false;
}
