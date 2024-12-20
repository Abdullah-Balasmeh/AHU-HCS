import { AfterViewInit, Component, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { SharedService } from './services/shared.service';
import { HeaderComponent } from './components/main-component/header/header.component';
import { NavBarComponent } from './components/main-component/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly sharedService = inject(SharedService);
  private readonly destroy$ = new Subject<void>();

  roles = signal<string[] | string>([]);

  constructor() {
    this.sharedService.roles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles) => this.roles.set(roles));
  }

  ngAfterViewInit(): void {
    const userID = this.sharedService.getCurrentUserID();

  if (!userID && !this.router.url.startsWith('/home')) {
    this.router.navigate(['/home']);
  }
  }

  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }
  logout(): void {
    const confirmLogout = confirm('هل أنت متأكد من تسجيل الخروج؟');
    if (confirmLogout) {
      this.sharedService.logout();
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
