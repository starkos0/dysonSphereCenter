import {
  computed,
  effect,
  inject,
  Injectable,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { Item } from '../../models/core/Item';
import { Tech } from '../../models/core/Tech';
import { Recipe } from '../../models/core/Recipe';
import { HttpClient } from '@angular/common/http';
import { forkJoin, retry } from 'rxjs';
import { ItemWithRecipes } from '../../models/core/ItemWithRecipe';



@Injectable({
  providedIn: 'root',
})
export class MapData {
  public http = inject(HttpClient);

  public items = signal(new Map<number, Item>());
  public recipes = signal(new Map<number, Recipe>());
  public techs = signal(new Map<number, Tech>());
  public mainDataLoaded = signal(false);
  public buildings = signal(new Map<number, Item>());
  constructor() {
    effect(() => {
      if (
        this.items().size > 0 &&
        this.recipes().size > 0 &&
        this.techs().size > 0
      ) {
        this.mainDataLoaded.set(true);
      } else {
        this.mainDataLoaded.set(false);
      }
      const itemsWithRecipes = this.itemsWithRecipes();
      console.log('Items with recipes:', itemsWithRecipes);
    });
  }

  public storeItems(items: Item[]) {
    const newMap = new Map<number, Item>();
    items.forEach((item) => {
      newMap.set(item.ID, item);
    });

    this.items.set(newMap);

    this.extractBuildings()
  }

  public extractBuildings() {
    const filtered = new Map(
      [...this.items().entries()].filter(
        ([_, item]) => item.prefabDesc.colliders !== undefined,
      ),
    );
    this.buildings.set(filtered);
  }

  public storeRecipes(recipes: Recipe[]) {
    const newMap = new Map<number, Recipe>();
    recipes.forEach((recipe) => {
      newMap.set(recipe.ID, recipe);
    });

    this.recipes.set(newMap);
  }

  public storeTechs(techs: Tech[]) {
    const newMap = new Map<number, Tech>();
    techs.forEach((tech) => {
      newMap.set(tech.ID, tech);
    });

    this.techs.set(newMap);
  }

  public loadAllData() {
    this.items.set(new Map<number, Item>());
    this.recipes.set(new Map<number, Recipe>());
    this.techs.set(new Map<number, Tech>());

    return forkJoin({
      items: this.http.get<Item[]>('data/ItemProtoSet.json'),
      recipes: this.http.get<Recipe[]>('data/RecipeProtoSet.json'),
      techs: this.http.get<Tech[]>('data/TechProtoSet.json'),
    })
      .pipe(retry(2))
      .subscribe({
        next: ({ items, recipes, techs }) => {
          this.storeItems(items);
          this.storeRecipes(recipes);
          this.storeTechs(techs);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public itemsWithRecipes = computed(() => {
    const items = this.items();
    const recipes = this.recipes();
    const map = new Map<number, ItemWithRecipes>();

    for(const item of items.values()) {
      const itemRecipes = Array.from(recipes.values()).filter(recipe => 
        item.recipes?.some(r => r.ID === recipe.ID)
      ) || [];


      const defaultRecipe = itemRecipes.length > 1 
        ? itemRecipes.find(r => r.name.toLowerCase().includes('advanced'))
        : itemRecipes[0];

      map.set(item.ID, {
        ...item,
        allRecipes: itemRecipes,
        selectedRecipe: defaultRecipe,
      });
    }

    return map;
  })
}
