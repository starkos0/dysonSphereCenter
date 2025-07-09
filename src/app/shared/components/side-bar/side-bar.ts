import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideBarControl } from '../../services/sideBarControl/side-bar-control';
import { Theme } from '../../services/theme/theme';

@Component({
  selector: 'app-side-bar',
  imports: [DrawerModule, MenuModule, ButtonModule, ConfirmDialog, TieredMenuModule, PanelMenuModule, CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {

  public sideBarControl = inject(SideBarControl);
  public themeService = inject(Theme);
}
