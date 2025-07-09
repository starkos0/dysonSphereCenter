import { effect, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  public selectedTheme = signal<'light' | 'dark'>('dark');

  constructor() {
    this.initPreferredTheme();

    effect(() => {
      const selectedTheme = this.selectedTheme();
      const element = document.querySelector('html');
      if (element) {
        element.classList.toggle('dark', selectedTheme === 'dark');
        element.classList.toggle('light', selectedTheme === 'light');
      }
      localStorage.setItem('theme', this.selectedTheme());

    })
  }

  initPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      this.selectedTheme.set(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      
      this.selectedTheme.update((_ ) =>  prefersDark ? 'dark' : 'light');
    }
  }

  toggleDarkMode() {
    this.selectedTheme.update((state) => (state === 'dark' ? 'light' : 'dark'));
  }

  isDarkMode(): boolean {
    return this.selectedTheme() === 'dark';
  }
}
