import { Item } from "./Item";
import { Recipe } from "./Recipe";

export type ItemWithRecipes = Item & {
  allRecipes: RecipesWithIcons[];
  selectedRecipe?: Recipe;
};

export type RecipesWithIcons = Recipe & {
  inputIcons: string[];
  outputIcons: string[];
}