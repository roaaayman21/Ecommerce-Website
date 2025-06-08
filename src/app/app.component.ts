import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'store';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initialize theme on app start
    this.themeService.darkMode$.subscribe(isDark => {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });
  }
}
