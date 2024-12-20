import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-order',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule],
  templateUrl: './pharmacy-order.component.html',
  styleUrl: './pharmacy-order.component.css'
})
export class PharmacyOrderComponent {
  isLoading=false;
}
