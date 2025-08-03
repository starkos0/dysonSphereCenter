import { Component, inject, OnInit } from '@angular/core';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { SideBar } from '../../shared/components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { SideBarControl } from '../../shared/services/sideBarControl/side-bar-control';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TreeTableCellEditor, TreeTableModule } from 'primeng/treetable';
import { TableModule  } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TotalBuildings } from '../../shared/components/total-buildings/total-buildings';
import { TotalItems } from '../../shared/components/total-items/total-items';
import { TreeNode } from 'primeng/api';
import { RecipeTreeGenerator } from '../../shared/services/recipeTreeGenerator/recipe-tree-generator';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DataTree } from '../../shared/models/core/DataTree';
import { InputNumberModule } from 'primeng/inputnumber';
import { MapData } from '../../shared/services/mapData/map-data';
import { TypedTemplateDirective } from '../../shared/models/TypedTemplate.directive';
import { TreeTableBodyCtx } from '../../shared/models/TreeTableBodyCtx';
import { RecipesWithIcons } from '../../shared/models/core/ItemWithRecipe';
import { RippleModule } from 'primeng/ripple';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Configuration } from '../../shared/services/configuration/configuration';

@Component({
  selector: 'app-calculator', imports: [
    NavBar,
    SideBar,
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    CommonModule,
    TotalBuildings,
    TotalItems,
    TreeTableModule,
    TooltipModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    TableModule,
    TypedTemplateDirective,
    RippleModule,
    OverlayBadgeModule
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator implements OnInit{
  public sideBarService = inject(SideBarControl);
  public recipeTreeGenerator = inject(RecipeTreeGenerator);
  public mapData = inject(MapData);
  public configService = inject(Configuration);
  typedTree = {} as TreeTableBodyCtx;


  visible = false;

  files!: TreeNode[];

  ngOnInit(): void {
  }

  onQuantityChange(node: TreeNode<DataTree>, qty: number) {
    
    console.log(node, qty)
  }


  getRecipes(itemId: number): RecipesWithIcons[] | null {
    const itemWithRecipes = this.mapData.itemsWithRecipes().get(itemId);
    if (!itemWithRecipes || !itemWithRecipes.selectedRecipe) {
      return null;
    }
    return itemWithRecipes.allRecipes
  }

  getBuildingIcon(madeFromString: string | undefined): string {
    if (!madeFromString) {
      return '';
    }

    const madeFromStrings = this.mapData.recipesMadeFromString();

    const index = madeFromStrings.indexOf(madeFromString);
    if (index === -1) {
      return '';
    }
    
    switch (madeFromString) {
      case "Assembler":
        return this.configService.userConfig().buildings.assembler?.IconPath ?? '';
      case "Smelting Facility":
        return this.configService.userConfig().buildings.smelter?.IconPath ?? '';
      case "Chemical Facility":
        return this.configService.userConfig().buildings.chemicalPlant?.IconPath ?? '';
      case "Refining Facility":
        return this.configService.userConfig().buildings.oilRefinery?.IconPath ?? '';
      case "Fractionation Facility":
        return this.configService.userConfig().buildings.fractionator?.IconPath ?? '';
      case "Research Facility":
        return this.configService.userConfig().buildings.matrixLab?.IconPath ?? '';
      case "Particle Collider":
        return this.configService.userConfig().buildings.miniatureParticleCollider?.IconPath ?? '';
      default:
        return '';
    }
  }

}
