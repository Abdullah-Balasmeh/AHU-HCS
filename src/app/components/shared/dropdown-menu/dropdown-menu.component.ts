import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-multi-select-dropdown',
    standalone: true,
    imports:[FormsModule ,CommonModule],
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class MultiSelectDropdownComponent {
  @Input() options: string[] = []; // Input list of predefined options
    placeHolder=input.required<string>(); // Input list of predefined options
    selectedOptions: string[] = []; // Array of selected options
    customOptions: string[] = []; // Array of user-added custom options
    filteredOptions: string[] = []; // Array of filtered options
    searchTerm: string = ''; // Search input value
    isOpen: boolean = false; // Dropdown open/close state


    constructor() {
        this.filteredOptions = [...this.options]; // Initialize filtered options
    }

    // Toggles the dropdown visibility
    toggleDropdown(): void {
        this.isOpen = !this.isOpen;

        // Reset filtered options when opening
        if (this.isOpen) {
            this.filteredOptions = [...this.customOptions ,...this.options];
        }
    }

    // Toggles the selection state of an option
    toggleOption(option: string): void {
        const index = this.selectedOptions.indexOf(option);
        if (index >= 0) {
            this.selectedOptions.splice(index, 1); // Remove from selected options
        } else {
            this.selectedOptions.push(option); // Add to selected options
        }
    }

    // Filters options based on the search input
    filterOptions(): void {
        const search = this.searchTerm.toLowerCase();
        this.filteredOptions = [...this.customOptions,...this.options, ].filter((option) =>
            option.toLowerCase().includes(search)
        );
    }

    // Adds a custom option to the list
    addCustomOption(): void {
        const customOption = this.searchTerm.trim();
        if (customOption && !this.selectedOptions.includes(customOption)) {
            this.selectedOptions.push(customOption); // Add to selected options
            if (!this.options.includes(customOption)) {
                this.customOptions.push(customOption); // Track as a custom option
            }
        }
        this.searchTerm = ''; // Clear search input
        this.filterOptions(); // Update filtered options
    }

    // Removes an option (predefined or custom) from the selected list
    removeOption(option: string, event: MouseEvent): void {
        event.stopPropagation(); // Prevent triggering toggleOption
        this.selectedOptions = this.selectedOptions.filter((selected) => selected !== option);

        // If it's a custom option, remove it from the customOptions array
        if (this.customOptions.includes(option)) {
            this.customOptions = this.customOptions.filter((custom) => custom !== option);
        }

        this.filterOptions(); // Update filtered list
    }
}
