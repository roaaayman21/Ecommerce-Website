import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="(isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'">
      <i class="fas" [class.fa-sun]="isDarkMode$ | async" [class.fa-moon]="!(isDarkMode$ | async)"></i>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--text-primary);
      font-size: 1.2rem;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--surface-color);
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode$: any;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
