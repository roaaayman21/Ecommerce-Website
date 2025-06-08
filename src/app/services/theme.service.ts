import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.isDarkMode());
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Initialize theme from localStorage or system preference
    this.setTheme(this.isDarkMode());
  }

  private isDarkMode(): boolean {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    this.setTheme(!this.darkMode.value);
  }

  private setTheme(isDark: boolean): void {
    this.darkMode.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDark.toString());
  }
}
