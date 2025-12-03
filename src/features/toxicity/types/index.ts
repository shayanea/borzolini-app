export enum ToxicitySeverity {
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SEVERE = 'Severe',
  FATAL = 'Fatal',
}

export enum ToxicityType {
  FOOD = 'food',
  PLANT = 'plant',
}

export interface ToxicityItem {
  id: string;
  name: string;
  scientificName?: string;
  type: ToxicityType;
  severity: ToxicitySeverity;
  description: string;
  symptoms: string[];
  safeAlternative?: string;
}
