import { Component } from '@angular/core';
import { NavBar } from "../../shared/components/nav-bar/nav-bar";
import { SideBar } from "../../shared/components/side-bar/side-bar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavBar, SideBar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
