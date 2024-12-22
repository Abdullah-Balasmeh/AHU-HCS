import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-female-order-table',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule],
  templateUrl: './manager-female-order-table.component.html',
  styleUrl: './manager-female-order-table.component.css'
})
export class ManagerFemaleOrderTableComponent {
  isLoading=false;
}
