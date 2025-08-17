import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MapData } from '../mapData/map-data';
import { Item } from '../../models/core/Item';
import { DataTree } from '../../models/core/DataTree';
import { TreeNode } from 'primeng/api';
import { Recipe } from '../../models/core/Recipe';

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

      const recipeTreeTreeNode = this.recipeTreeTreeNode();
      console.warn('recipetree node: ', recipeTreeTreeNode);
    });
  }

  // Mapped tree for primeNG treetable, we use computed signal
  public recipeTreeTreeNode = computed(() => {
    const dt = this.recipeTree();
    return dt ? [this.mapTreeToTreeNode(dt)] : [];
  });

  public nodeMap = computed(() => {
    const tree = this.recipeTree();
    if (!tree) {
      return new Map<string, DataTree>();
    }
    const map = new Map<string, DataTree>();
    this.buildMap(tree, map);
    return map;
  });

  private buildMap(node: DataTree, map: Map<string, DataTree>) {
    map.set(node.key, node);
    for (const child of node.children ?? []) {
      this.buildMap(child, map);
    }
  }

  onRecipeChange(rowNode: DataTree, newRecipeId: number) {
    if (rowNode && newRecipeId) {
      const recipes = this.mapDataService
        .itemsWithRecipes()
        .get(rowNode.itemId)?.allRecipes;
      const selectedRecipe = recipes?.find((r) => r.ID === newRecipeId);

      if (!selectedRecipe) {
        console.error(
          `Recipe with ID ${newRecipeId} not found for item ${rowNode.itemName}`,
        );
        return;
      }

      const tree = this.recipeTree();

      if (!tree) {
        console.error('Recipe tree is not initialized');
        return;
      }

      // 1. Get the new children. We pass a temporary object to rebuildSubTree
      //    so it can calculate the new children based on the new recipe.
      const temporaryNodeWithNewRecipe = { ...rowNode, recipe: selectedRecipe };
      const newChildren = this.rebuildSubTree(temporaryNodeWithNewRecipe);

      // 2. Call the generic inmutable update function to create a new tree
      //    with the updated recipe AND the new children.
      const newTree = this.updateSpecificNode(tree, rowNode.key, {
        recipe: selectedRecipe,
        children: newChildren,
      });

      if (newTree) {
        this.recipeTree.set(newTree);
      }
    }
  }

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
      requiredBuildings: 0,
      proliferator: 0,
      requiredBelts: 0,
      power: 0
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
          requiredBuildings: 0,
          proliferator: 0,
          requiredBelts: 0,
          power: 0
        };

        currentNode.children!.push(childNode);
        stack.push(childNode);
      }
    }
    this.recipeTree.set(rootNode);
  }

  mapTreeToTreeNode(root: DataTree): TreeNode<DataTree> {
    const rootNode: TreeNode<DataTree> = {
      data: {
        itemName: root.itemName,
        quantity: root.quantity,
        recipe: root.recipe,
        iconPath: root.iconPath,
        key: root.key,
        itemId: root.itemId,
        requiredBuildings: 0,
        proliferator: 0,
        requiredBelts: 0,
        power: 0
      },
      children: [],
      leaf: !root.children || root.children.length === 0,
      expanded: true,
    };

    const stack: [DataTree, TreeNode][] = [[root, rootNode]];

    while (stack.length > 0) {
      const [dt, tn] = stack.pop()!;
      for (const child of dt.children ?? []) {
        const childTN: TreeNode<DataTree> = {
          data: {
            itemName: child.itemName,
            quantity: child.quantity,
            recipe: child.recipe,
            iconPath: child.iconPath,
            key: child.key,
            itemId: child.itemId,
            requiredBuildings: 0,
            proliferator: 0,
            requiredBelts: 0,
            power: 0
          },
          children: [],
          leaf: !child.children || child.children.length === 0,
          expanded: true,
        };
        tn.children!.push(childTN);
        stack.push([child, childTN]);
      }
    }

    return rootNode;
  }

  private updateSpecificNode(
    tree: DataTree | null,
    key: string,
    partialUpdate: Partial<DataTree>,
  ): DataTree | null {
    if (!tree) {
      return null;
    }

    // Si encontramos el nodo, devolvemos una copia con las nuevas propiedades
    if (tree.key === key) {
      return { ...tree, ...partialUpdate };
    }

    // Recursivamente, si un hijo cambia, creamos una nueva copia de los hijos
    const updatedChildren = tree.children?.map((child) =>
      this.updateSpecificNode(child, key, partialUpdate),
    );

    // Si los hijos no han cambiado, devolvemos el mismo nodo
    if (updatedChildren?.every((child, i) => child === tree.children![i])) {
      return tree;
    }

    // Si al menos un hijo ha cambiado, devolvemos una copia del nodo con los nuevos hijos
    return { ...tree, children: updatedChildren as DataTree[] };
  }

  // rebuild tree partially starting with a specific node
  rebuildSubTree(parentNode: DataTree): DataTree[] {
    const newChildren: DataTree[] = [];

    if(!parentNode.recipe) {
      console.warn(`No recipe found for item ${parentNode.itemName}`);
      return newChildren;
    }

    for (let i = 0; i < parentNode.recipe.Items.length; i++) {
      const childId = parentNode.recipe.Items[i];
      const childCount = parentNode.recipe.ItemCounts[i];

      const childData = this.mapDataService.itemsWithRecipes().get(childId);

      if(!childData) continue;

      const childNode: DataTree = {
        key: `${childData.ID}-${childData.name}`,
        itemName: childData.name,
        itemId: childData.ID,
        iconPath: childData.IconPath,
        quantity: childCount * parentNode.quantity,
        children: [],
        recipe: childData.selectedRecipe,
        requiredBuildings: 0,
        proliferator: 0,
        requiredBelts: 0,
        power: 0
      };

      childNode.children = this.rebuildSubTree({...childNode});

      newChildren.push(childNode);
    }

    return newChildren;
  }
}
