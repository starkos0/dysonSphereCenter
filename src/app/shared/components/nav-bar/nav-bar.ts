import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Theme } from '../../services/theme/theme';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SideBarControl } from '../../services/sideBarControl/side-bar-control';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, ButtonModule, RatingModule, FormsModule, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  public sideBarControl = inject(SideBarControl);
    public themeService = inject(Theme);

  value: number = 0
}
