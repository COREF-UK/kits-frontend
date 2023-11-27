export const EntityType = [
  "hardwares",
  "softwares",
  "infrastructures",
  "skills",
] as const;
export type EntityTypeType = (typeof EntityType)[number];

export const MaturityLevels = [
  "Basic",
  "Advanced",
  "World-Class",
  "Future",
] as const;
export type TypeMaturityLevels = (typeof MaturityLevels)[number];

export interface ITechnologyEntity {
  type: EntityTypeType;
  entity: any;
}

export interface IMaturityLevel {
  description: string;
  entities: ITechnologyEntity[];
}

export interface ITechnologyData {
  title: string;
  description: string;
  theme: string;
  Basic: IMaturityLevel;
  Advanced: IMaturityLevel;
  "World-Class": IMaturityLevel;
  Future: IMaturityLevel;
}

export interface ICellIdentifier {
  id: number;
  entityType: EntityTypeType;
  maturityLevel: TypeMaturityLevels;
}
