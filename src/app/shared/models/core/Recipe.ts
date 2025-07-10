export interface Recipe {
  ID: number
  Type: string
  name: string
  index: number
  description: string
  madeFromString: string
  productive: boolean
  NonProductive: boolean
  Handcraft: boolean
  Explicit: boolean
  hasIcon: boolean
  TimeSpend: number
  GridIndex: number
  IconPath: string
  preTech: PreTech
  Items: number[]
  ItemCounts: number[]
  Results: number[]
  ResultCounts: number[]
}

export interface PreTech {
  ID: number
}
