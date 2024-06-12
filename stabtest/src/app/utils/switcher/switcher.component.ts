import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnInit {

  theme: any;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('theme') == null) {
      if (this.theme == null) {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const isDarkMode = darkModeMediaQuery.matches;
        // set to local storage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      }
    }
    this.theme = localStorage.getItem('theme');

    this.applyTheme();
  }

  toggleTheme() {
    localStorage.setItem('theme', this.theme === 'light' ? 'dark' : 'light');
    this.ngOnInit();
  }

  applyTheme() {
    if (this.theme != null && this.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else if (this.theme != null && this.theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }

}
