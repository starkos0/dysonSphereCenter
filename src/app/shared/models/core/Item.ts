export interface Item {
  Type: string
  StackSize: number
  IsEntity: boolean
  CanBuild: boolean
  IconPath: string
  ModelIndex: number
  ModelCount: number
  HpMax: number
  BuildIndex: number
  BuildMode: number
  GridIndex: number
  DescFields: number[]
  handcraft: Handcraft
  maincraft: Maincraft
  handcraftProductCount: number
  maincraftProductCount: number
  handcrafts: Handcraft2[]
  recipes?: Recipe[]
  rawMats: RawMat[]
  preTech: PreTech
  prefabDesc: PrefabDesc
  ID: number
  description: string
  index: number
  iconSprite: string
  typeString: string
  fuelTypeString: string
  name: string
}

export interface Handcraft {
  ID: number
  name: string
}

export interface Maincraft {
  ID: number
  name: string
}

export interface Handcraft2 {
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
  modelIndex: number
  hasObject: boolean
  lodCount: number
  lodDistances: number[]
  startInstCapacity: number
  batchCapacity: number
  cullingHeight: number
  castShadow: number
  recvShadow: number
  colliders: Collider[]
  hasBuildCollider: boolean
  buildCollider: BuildCollider
  buildColliders: BuildCollider2[]
  roughRadius: number
  roughHeight: number
  roughWidth: number
  colliderComplexity: number
  barWidth: number
  barHeight: number
  landPoints: LandPoint[]
  dragBuild: boolean
  dragBuildDist: DragBuildDist
  blueprintBoxSize: BlueprintBoxSize
  isAssembler: boolean
  assemblerSpeed: number
  assemblerRecipeType: string
  anim_working_length: number
  isPowerConsumer: boolean
  workEnergyPerTick: number
  idleEnergyPerTick: number
  minimapType: number
  slotPoses: SlotPose[]
  selectCenter: SelectCenter
  selectSize: SelectSize
  selectAlpha: number
  selectDistance: number
  signHeight: number
  signSize: number
  hasAudio: boolean
  audioProtoId0: number
  audioLogic: number
  audioRadius0: number
  audioRadius1: number
  audioFalloff: number
  audioVolume: number
  audioPitch: number
  audioDoppler: number
}

export interface Collider {
  idType: number
  pos: Pos
  ext: Ext
  q: Q
  shape: string
  usage?: string
  isForBuild?: boolean
  notForBuild?: boolean
}

export interface Pos {
  x: number
  y: number
  z?: number
}

export interface Ext {
  x: number
  y: number
  z: number
}

export interface Q {
  w: number
}

export interface BuildCollider {
  idType: number
  pos: Pos2
  ext: Ext2
  q: Q2
  shape: string
  usage: string
  isForBuild: boolean
}

export interface Pos2 {
  x: number
  y: number
  z: number
}

export interface Ext2 {
  x: number
  y: number
  z: number
}

export interface Q2 {
  w: number
}

export interface BuildCollider2 {
  idType: number
  pos: Pos3
  ext: Ext3
  q: Q3
  shape: string
  usage: string
  isForBuild: boolean
}

export interface Pos3 {
  x: number
  y: number
  z?: number
}

export interface Ext3 {
  x: number
  y: number
  z: number
}

export interface Q3 {
  w: number
}

export interface LandPoint {
  x: number
  y: number
  z: number
}

export interface DragBuildDist {
  x: number
  y: number
}

export interface BlueprintBoxSize {
  x: number
  y: number
}

export interface SlotPose {
  position: Position
  rotation: Rotation
  forward: Forward
  right: Right
  up: Up
}

export interface Position {
  x: number
  y: number
  z?: number
}

export interface Rotation {
  x?: number
  w?: number
  y?: number
  z?: number
}

export interface Forward {
  y: number
  z: number
  x?: number
}

export interface Right {
  x: number
  z?: number
}

export interface Up {
  y: number
  z?: number
  x?: number
}

export interface SelectCenter {
  x: number
  y: number
}

export interface SelectSize {
  x: number
  y: number
  z: number
}
