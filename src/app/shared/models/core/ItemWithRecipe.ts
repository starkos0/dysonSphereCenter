import { Item } from "./Item";
import { Recipe } from "./Recipe";

export type ItemWithRecipes = Item & {
  allRecipes: Recipe[];
  selectedRecipe?: Recipe;
};
