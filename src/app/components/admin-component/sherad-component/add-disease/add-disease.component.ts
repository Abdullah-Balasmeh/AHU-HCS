import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-disease',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule],
  templateUrl: './add-disease.component.html',
  styleUrl: './add-disease.component.css'
})
export class AddDiseaseComponent {
isLoading=false;
}
