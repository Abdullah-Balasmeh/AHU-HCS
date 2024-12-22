import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from '../../../shared/loading-image/loading-image.component';

@Component({
  selector: 'app-manager-trainee-table',
  standalone: true,
  imports: [LoadingImageComponent , CommonModule],
  templateUrl: './manager-trainee-table.component.html',
  styleUrl: './manager-trainee-table.component.css'
})
export class ManagerTraineeTableComponent {
  isLoading =false
  deleteEmployee(index:string){}
  openEditModal(index:string){}
}
