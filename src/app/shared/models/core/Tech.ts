export interface Tech {
  ID: number;
  name: string;
  page: number;
  description: string;
  conclusion: string;
  nameAndLevel: string;
  nameAndMaxLevel: string;
  IconPath: string;
  Published: boolean;
  IsHiddenTech: boolean;
  Level: number;
  MaxLevel: number;
  LevelCoef1: number;
  LevelCoef2: number;
  IsLabTech: boolean;
  HashNeeded: number;
  Position: Position;
  PreItem: number[];
  PreTechs: number[];
  PreTechsImplicit: number[];
  PreTechsMax: boolean;
  Items: number[];
  ItemPoints: number[];
  PropertyOverrideItems: number[];
  PropertyItemCounts: number[];
  UnlockRecipes: number[];
  UnlockFunctions: number[];
  UnlockValues: number[];
  AddItems: number[];
  AddItemCounts: number[];
  preTechArray: PreTechArray[];
  postTechArray: PostTechArray[];
  unlockRecipeArray: UnlockRecipeArray[];
  itemArray: ItemArray[];
  unlockNeedItemArray: UnlockNeedItemArray[];
}

export interface Position {
  x: number;
  y: number;
}

export interface PreTechArray {
  ID: number;
}

export interface PostTechArray {
  ID: number;
}

export interface ItemArray {
  ID: number;
}

export interface UnlockRecipeArray {
  ID: number;
}

export interface UnlockNeedItemArray {
  id: number;
  count: number;
}
