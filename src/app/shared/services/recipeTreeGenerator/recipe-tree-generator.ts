import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MapData } from '../mapData/map-data';
import { Item } from '../../models/core/Item';
import { DataTree } from '../../models/core/DataTree';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class RecipeTreeGenerator {
  public mapDataService = inject(MapData);
  public selectedItem = signal<Item | null>(null);
  public selectedQuantity = signal<number>(0);
  public recipeTree = signal<DataTree | null>(null);

  constructor() {
    effect(() => {
      const selectedItem = this.selectedItem();
      const selectedQuantity = this.selectedQuantity();
      if (selectedItem && selectedQuantity > 0) {
        console.log(
          `Selected item: ${selectedItem.name}, Quantity: ${this.selectedQuantity()}`,
        );
      }
    });
  }

  public recipeTreeTreeNode = computed(() => {
    const dt = this.recipeTree();
    return dt ? [this.mapTreeToTreeNode(dt)] : [];
  });

  public checkRecipeAndQuantitySelection() {
    if (!this.selectedItem() || this.selectedQuantity() <= 0) {
      console.error('Invalid item or quantity for tree generation');
      return;
    }
    this.buildRecipeTree();
    console.log('Generated recipe tree:', this.recipeTree());
  }

  public buildRecipeTree() {
    const rootItem = this.mapDataService
      .itemsWithRecipes()
      .get(this.selectedItem()!.ID);

    // Function called in checkRecipeAndQuantitySelection so we can ensure that the selected item and quantity are not empty or undefined
    // but for comodity, we check it here so i don't need to use assertions
    if (!rootItem) return;

    const rootNode: DataTree = {
      key: `${rootItem.ID}-${rootItem.name}`,
      itemName: rootItem.name,
      itemId: rootItem.ID,
      iconPath: rootItem.IconPath,
      quantity: this.selectedQuantity(),
      children: [],
      recipe: rootItem.selectedRecipe,
    };

    const stack: DataTree[] = [rootNode];

    while (stack.length > 0) {
      const currentNode = stack.pop()!;

      // If no recipe, then it doens't have any child === ore item
      if (!currentNode.recipe) continue;

      for (let i = 0; i < currentNode.recipe?.Items.length; i++) {
        // This is because Items[] and ItemCounts[] are parallel arrays
        const childId = currentNode.recipe.Items[i];
        const childCount = currentNode.recipe.ItemCounts[i];

        const childData = this.mapDataService.itemsWithRecipes().get(childId);

        if (!childData) continue;

        const childNode: DataTree = {
          key: `${childData.ID}-${childData.name}`,
          itemName: childData.name,
          itemId: childData.ID,
          iconPath: childData.IconPath,
          quantity: childCount * currentNode.quantity, // This is wrong, will need extra fuction to calculate the actual quantity
          children: [],
          parent: currentNode,
          recipe: childData.selectedRecipe,
        };

        currentNode.children!.push(childNode);
        stack.push(childNode);
      }
    }
    this.recipeTree.set(rootNode);
  }

  mapTreeToTreeNode(root: DataTree): TreeNode<DataTree> {
    const rootNode: TreeNode = {
      data: {
        itemName: root.itemName,
        quantity: root.quantity,
        recipeName: root.recipe?.name ?? '—',
        iconPath: root.iconPath,
      },
      children: [],
      leaf: !root.children || root.children.length === 0,
      expanded: true
    };

    const stack: [DataTree, TreeNode][] = [[root, rootNode]];

    while (stack.length > 0) {
      const [dt, tn] = stack.pop()!;
      for (const child of dt.children ?? []) {
        const childTN: TreeNode = {
          data: {
            itemName: child.itemName,
            quantity: child.quantity,
            recipeName: child.recipe?.name ?? '—',
            iconPath: child.iconPath,
          },
          children: [],
          leaf: !child.children || child.children.length === 0,
          expanded: true
        };
        tn.children!.push(childTN);
        stack.push([child, childTN]);
      }
    }

    return rootNode;
  }
}
