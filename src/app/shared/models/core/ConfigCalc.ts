import { Item } from "./Item";

export interface ConfigCalc {
    buildings: Buildings;
    belt: Item;
    proliferator: Item;
}

export interface Buildings {
    assembler: Item | null;
    smelter: Item;
    chemicalPlant: Item;
    oilRefinery: Item;
    fractionator: Item;
    matrixLab: Item;
    miningMachine: Item;
    miniatureParticleCollider: Item;
    waterPump: Item;
    oilExtractor: Item;
}

// Derivated type to get IDs of ConfigCalc
export type ConfigCalcIDs = {
    [K in keyof ConfigCalc]: ConfigCalc[K] extends Item
        ? number
        : { [B in keyof ConfigCalc[K]]: number };

}