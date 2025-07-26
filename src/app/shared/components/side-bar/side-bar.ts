import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { SideBarControl } from '../../services/sideBarControl/side-bar-control';
import { Theme } from '../../services/theme/theme';
import { RecipeTreeGenerator } from '../../services/recipeTreeGenerator/recipe-tree-generator';
import { ItemSelector } from '../../../pages/calculator/components/item-selector/item-selector';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { Configuration } from '../../services/configuration/configuration';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-side-bar',
  imports: [
    DrawerModule,
    MenuModule,
    ButtonModule,
    ConfirmDialog,
    TieredMenuModule,
    PanelMenuModule,
    CommonModule,
    ItemSelector,
    InputNumberModule,
    FloatLabel,
    FormsModule,
    DividerModule,
    SelectModule
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  public sideBarControl = inject(SideBarControl);
  public themeService = inject(Theme);
  public recipeTreeGenerator = inject(RecipeTreeGenerator);
  public open = signal(false);
  public configService = inject(Configuration);

  constructor() {
    effect(() => {
      if (!this.open()) {
      }
    });
  }

  
}
