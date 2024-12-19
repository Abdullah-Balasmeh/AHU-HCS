import { Component, EventEmitter, Output,} from '@angular/core';


@Component({
  selector: 'app-nav-tab',
  standalone: true,

  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent  {
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: string) {
      this.tabChange.emit(tab); // Emit the selected tab to the parent
  }
}
