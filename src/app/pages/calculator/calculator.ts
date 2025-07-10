import { Component, inject } from '@angular/core';
import { NavBar } from "../../shared/components/nav-bar/nav-bar";
import { SideBar } from "../../shared/components/side-bar/side-bar";
import { RouterOutlet } from '@angular/router';
import { SideBarControl } from '../../shared/services/sideBarControl/side-bar-control';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calculator',
  imports: [NavBar, SideBar, RouterOutlet, ButtonModule, DrawerModule, CommonModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
public sideBarService = inject(SideBarControl)
  visible = false;
}
