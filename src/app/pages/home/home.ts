import { Component, inject } from '@angular/core';
import { NavBar } from "../../shared/components/nav-bar/nav-bar";
import { SideBar } from "../../shared/components/side-bar/side-bar";
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideBarControl } from '../../shared/services/sideBarControl/side-bar-control';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavBar, SideBar, RouterOutlet, ButtonModule, DrawerModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
}
