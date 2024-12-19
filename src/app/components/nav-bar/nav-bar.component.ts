import { AfterViewInit, Component, inject,signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'], // Fixed typo from `styleUrl` to `styleUrls`
})
export class NavBarComponent implements AfterViewInit {
  private sharedService = inject(SharedService);
  roles = signal<string[]>([]); // Reactive roles signal

  ngAfterViewInit(): void {
    this.sharedService.roles$.subscribe({
      next: (roles) => {
        this.roles.set(Array.isArray(roles) ? roles : [roles]);
      },
      error: (err) => {
        console.error('Error fetching roles in NavBar:', err);
      },
    });
  }
}
