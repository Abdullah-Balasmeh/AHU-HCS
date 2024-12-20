import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.css'
})
export class DropdownListComponent {
  @Input() options: string[] = []; // Predefined options
  placeHolder = input.required<string>(); // Placeholder text
  selectedOptions: string[] = []; // Selected option
  filteredOptions: string[] = []; // Filtered options
  searchTerm: string = ''; // Search term
  isOpen: boolean = false; // Dropdown open/close state
  
  constructor() {
      this.filteredOptions = [...this.options]; // Initialize filtered options
  }
  
  // Toggles the dropdown visibility
  toggleDropdown(): void {
      this.isOpen = !this.isOpen;
  
      // Reset filtered options when opening
      if (this.isOpen) {
          this.filteredOptions = [...this.options];
      }
  }
  
  // Selects a single option
  toggleOption(option: string): void {
      this.selectedOptions = [option]; // Allow only one selection
      this.isOpen = false; // Close dropdown after selection
  }
  
  // Filters options based on the search term
  filterOptions(): void {
      const search = this.searchTerm.toLowerCase();
      this.filteredOptions = this.options.filter((option) =>
          option.toLowerCase().includes(search)
      );
  }
  
  // Getter for selected option display
  get selectedOption(): string {
      return this.selectedOptions.length > 0 ? this.selectedOptions[0] : "إختر " + this.placeHolder();
  }
  
}
