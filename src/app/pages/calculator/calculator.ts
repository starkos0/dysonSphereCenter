import { Component, inject, OnInit } from '@angular/core';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { SideBar } from '../../shared/components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { SideBarControl } from '../../shared/services/sideBarControl/side-bar-control';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { CommonModule } from '@angular/common';
import { TotalBuildings } from '../../shared/components/total-buildings/total-buildings';
import { TotalItems } from '../../shared/components/total-items/total-items';
import { TreeNode } from 'primeng/api';
import { RecipeTreeGenerator } from '../../shared/services/recipeTreeGenerator/recipe-tree-generator';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-calculator',
  imports: [
    NavBar,
    SideBar,
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    CommonModule,
    TableModule,
    TotalBuildings,
    TotalItems,
    TreeTableModule,
    TooltipModule
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator implements OnInit{
  public sideBarService = inject(SideBarControl);
  public recipeTreeGenerator = inject(RecipeTreeGenerator);
  visible = false;

  files!: TreeNode[];

  ngOnInit(): void {
  }

 
}
