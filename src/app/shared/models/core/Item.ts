export interface Item {
  Type: string
  StackSize: number
  IconPath: string
  HpMax: number
  GridIndex: number
  Productive: boolean
  MechaMaterialID: number
  DescFields: number[]
  isRaw: boolean
  maincraft: Maincraft
  maincraftProductCount: number
  recipes: Recipe[]
  rawMats: RawMat[]
  preTech: PreTech
  prefabDesc: PrefabDesc
  ID: number
  description: string
  index: number
  iconSprite: string
  propertyIconSprite: string
  propertyIconSpriteSmall: string
  propertyName: string
  typeString: string
  fuelTypeString: string
  name: string
}

export interface Maincraft {
  ID: number
  name: string
}

export interface Recipe {
  ID: number
  name: string
}

export interface RawMat {
  id: number
  count: number
}

export interface PreTech {
  ID: number
  name: string
}

export interface PrefabDesc {
  startInstCapacity: number
  batchCapacity: number
  anim_working_length: number
  selectSize: SelectSize
  selectDistance: number
}

export interface SelectSize {
  x: number
  y: number
  z: number
}
