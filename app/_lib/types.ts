export const EntityType = [
  "hardwares",
  "softwares",
  "infrastructures",
  "skills",
] as const;
export type IEntityType = (typeof EntityType)[number];

export const MaturityLevels = [
  "Basic",
  "Advanced",
  "World-Class",
  "Future",
] as const;
export type IMaturityLevel = (typeof MaturityLevels)[number];

export interface ITechnologyEntity {
  entity: any;
  type: IEntityType;
}

export interface ITechnologyData {
  title: string;
  description: string;
  Basic: ITechnologyEntity[];
  Advanced: ITechnologyEntity[];
  "World-Class": ITechnologyEntity[];
  Future: ITechnologyEntity[];
}

export interface ICellIdentifier {
  id: number;
  entityType: IEntityType;
  maturityLevel: IMaturityLevel;
}
