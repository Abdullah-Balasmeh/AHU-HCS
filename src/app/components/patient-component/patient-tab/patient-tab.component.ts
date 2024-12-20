import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-patient-tab',
  standalone: true,
  imports: [],
  templateUrl: './patient-tab.component.html',
  styleUrl: './patient-tab.component.css'
})
export class PatientTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Input() patient: any | null = null;

  constructor(){
    console.log(this.patient)
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
