import {
  computed,
  effect,
  inject,
  Injectable,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MapData } from '../mapData/map-data';
import { Item } from '../../models/core/Item';
import {
  Buildings,
  ConfigCalc,
  ConfigCalcIDs,
} from '../../models/core/ConfigCalc';

@Injectable({
  providedIn: 'root',
})
export class Configuration implements OnInit {
  public mapDataService = inject(MapData);
  public configInitialized = false;

  constructor() {
    effect(() => {
      const config = this.userConfig();
      if (config && this.configInitialized) {
        this.saveUserConfigFirstTime();
      }
    });
  }

  public userConfig = signal<ConfigCalc>({} as ConfigCalc);

  ngOnInit(): void {
    
  }

  initConfig() {
    const storedConfig = localStorage.getItem('configCalc');
    if (storedConfig) {
      this.userConfig.set(JSON.parse(storedConfig));
      this.configInitialized = true;
    } else {
      const items = this.mapDataService.items();
      if (items.size === 0) return;

      if (this.configInitialized) return;

      this.userConfig.set({
        buildings: {
          assembler: this.assemblers()[0],
          smelter: this.smelters()[0],
          chemicalPlant: this.chemicalPlants()[0],
          oilRefinery: this.oilRefineries()[0],
          fractionator: this.fractionators()[0],
          matrixLab: this.matrixLabs()[0],
          miningMachine: this.miningMachines()[0],
          miniatureParticleCollider: this.particleColliders()[0],
          waterPump: this.waterPumps()[0],
          oilExtractor: this.oilExtractors()[0],
        },
        belt: this.belts()[0],
        proliferator: this.proliferators()[0],
      });
      this.configInitialized = true;
    }
  }

  public itemTypes: Signal<string[]> = computed(() => {
    const map = this.mapDataService.items();
    if (map.size === 0) return [];

    const seen = new Set<string>();
    const result: string[] = [];

    for (const item of map.values()) {
      const key = item.Type;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(key);
      }
    }

    return result;
  });

  public itemTypeStrings: Signal<string[]> = computed(() => {
    const map = this.mapDataService.items();
    if (map.size === 0) return [];

    const seen = new Set<string>();
    const result: string[] = [];

    for (const item of map.values()) {
      const key = item.typeString;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(key);
      }
    }

    return result;
  });

  private filterItems(predicate: (item: Item) => Boolean): Item[] {
    const items = this.mapDataService.items();
    if (items.size === 0) return [];

    return Array.from(items.values()).filter(predicate);
  }

  public oilExtractors = computed(() =>
    this.filterItems((item) => item.typeString === 'Oil Extraction Facility'),
  );

  public waterPumps = computed(() =>
    this.filterItems((item) => item.typeString === 'Fluid Pumping Facility'),
  );

  public particleColliders = computed(() =>
    this.filterItems((item) => item.typeString === 'Particle Collider'),
  );

  public proliferators = computed(() =>
    this.filterItems((item) =>
      item.name.toLocaleLowerCase().startsWith('proliferator'),
    ),
  );

  public belts = computed(() =>
    this.filterItems(
      (item) =>
        item.typeString === 'Logistics' && item.prefabDesc.isBelt === true,
    ),
  );

  public matrixLabs = computed(() =>
    this.filterItems((item) => item.typeString === 'Research Facility'),
  );

  public fractionators = computed(() =>
    this.filterItems((item) => item.typeString === 'Fractionation Facility'),
  );

  public oilRefineries = computed(() =>
    this.filterItems((item) => item.typeString === 'Refining Facility'),
  );

  public miningMachines = computed(() =>
    this.filterItems((item) => item.typeString === 'Mining Facility'),
  );

  public chemicalPlants = computed(() =>
    this.filterItems((item) => item.typeString === 'Chemical Facility'),
  );

  public smelters = computed(() =>
    this.filterItems((item) => item.typeString === 'Smelting Facility'),
  );

  public assemblers = computed(() =>
    this.filterItems((item) => item.typeString === 'Assembler'),
  );

  updateUserConfig<
    TProp extends keyof ConfigCalc,
    TKey extends keyof ConfigCalc[TProp],
  >(prop: TProp, key: TKey | undefined, event: number) {
    console.log('ID seleccionado:', event);
    const item = this.mapDataService.items().get(event);
    if (!item) return;

    const newItem = { ...item };
    if (key === undefined) {
      this.userConfig.update((cfg) => ({
        ...cfg,
        [prop]: newItem,
      }));
    } else {
      this.userConfig.update((cfg) => ({
        ...cfg,
        [prop]: {
          ...cfg[prop],
          [key]: newItem,
        },
      }));
    }
  }

  public saveConfig() {
    const config = this.userConfig();
    console.log('Saving user configuration:', config);
    localStorage.setItem('configCalc', JSON.stringify(config));
  }

  public saveUserConfigFirstTime() {
    const configCalc = localStorage.getItem('configCalc');
    if (!configCalc) {
      this.saveConfig();
    }
  }
}
