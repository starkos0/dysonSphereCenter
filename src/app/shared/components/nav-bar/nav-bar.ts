import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Theme } from '../../services/theme/theme';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, ButtonModule, RatingModule, FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  public themeService = inject(Theme);
  value: number = 0
}
