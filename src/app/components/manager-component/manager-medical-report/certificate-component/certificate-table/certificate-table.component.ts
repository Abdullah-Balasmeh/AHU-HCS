import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingImageComponent } from '../../../../shared/loading-image/loading-image.component';

@Component({
  selector: 'app-certificate-table',
  standalone: true,
  imports: [LoadingImageComponent , CommonModule],
  templateUrl: './certificate-table.component.html',
  styleUrl: './certificate-table.component.css'
})
export class CertificateTableComponent {
isLoading=false;
}
