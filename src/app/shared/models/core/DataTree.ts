import { Recipe } from "./Recipe";

export interface DataTree { 
    key: string;
    itemName: string
    itemId: number;
    iconPath: string;
    quantity: number;
    children?: DataTree[];
    parent?: DataTree;
    recipe?: Recipe;
    requiredBuildings: number;
    proliferator: number; // 0 nothing
    requiredBelts: number;
    power: number;
}