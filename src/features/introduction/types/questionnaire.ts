export type KidLevel = 'toddlers' | 'school' | 'teens' | 'none';
export type SpaceScore = 1 | 2 | 3 | 4 | 5;
export type Allergy = 'high' | 'none' | 'otherPets';
export type Vibe = 'cuddly' | 'playful' | 'independent';
export type Grooming = 'low' | 'medium' | 'high';
export type Activity = 'low' | 'medium' | 'high';

export interface QuestionnaireAnswers {
  kidLevel: KidLevel;
  spaceScore: SpaceScore;
  allergy: Allergy;
  vibe: Vibe;
  grooming: Grooming;
  activity: Activity;
}

export interface BreedResult {
  name: string;
  fitScore: number;
  why: string;
  tags: string[];
}

