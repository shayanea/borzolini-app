import { ToxicityItem, ToxicitySeverity, ToxicityType } from '../types';

// Mock data for toxic foods
const TOXIC_FOODS: ToxicityItem[] = [
  {
    id: '1',
    name: 'Chocolate',
    type: ToxicityType.FOOD,
    severity: ToxicitySeverity.SEVERE,
    description: 'Contains theobromine and caffeine, which dogs cannot metabolize effectively.',
    symptoms: ['Vomiting', 'Diarrhea', 'Rapid breathing', 'Seizures'],
    safeAlternative: 'Carob treats',
  },
  {
    id: '2',
    name: 'Grapes & Raisins',
    type: ToxicityType.FOOD,
    severity: ToxicitySeverity.FATAL,
    description: 'Even small amounts can cause sudden kidney failure in dogs.',
    symptoms: ['Kidney failure', 'Vomiting', '+1 more'],
    safeAlternative: 'Blueberries or apple slices',
  },
  {
    id: '3',
    name: 'Xylitol',
    type: ToxicityType.FOOD,
    severity: ToxicitySeverity.SEVERE,
    description: 'Artificial sweetener found in gum, peanut butter, and sugar-free candy.',
    symptoms: ['Hypoglycemia', 'Liver failure', '+1 more'],
    safeAlternative: 'Natural peanut butter',
  },
  {
    id: '4',
    name: 'Onions & Garlic',
    type: ToxicityType.FOOD,
    severity: ToxicitySeverity.MODERATE,
    description: 'Can damage red blood cells. Cats are more susceptible than dogs.',
    symptoms: ['Anemia', 'Pale gums', '+1 more'],
    safeAlternative: 'Pet-safe herbs',
  },
  {
    id: '5',
    name: 'Avocado',
    type: ToxicityType.FOOD,
    severity: ToxicitySeverity.MODERATE,
    description: 'Contains persin, which can cause stomach upset.',
    symptoms: ['Vomiting', 'Diarrhea'],
    safeAlternative: 'Pumpkin puree',
  },
];

// Mock data for toxic plants
const TOXIC_PLANTS: ToxicityItem[] = [
  {
    id: '6',
    name: 'Sago Palm',
    scientificName: 'Cycas revoluta',
    type: ToxicityType.PLANT,
    severity: ToxicitySeverity.FATAL,
    description: 'Every part of the plant is toxic, especially the seeds.',
    symptoms: ['Liver failure', 'Vomiting', '+1 more'],
    safeAlternative: 'Areca Palm',
  },
  {
    id: '7',
    name: 'Lilies',
    type: ToxicityType.PLANT,
    severity: ToxicitySeverity.FATAL,
    description: 'Extremely toxic to cats. Even pollen or water from the vase can be fatal.',
    symptoms: ['Kidney failure', 'Vomiting'],
    safeAlternative: 'Roses or orchids',
  },
  {
    id: '8',
    name: 'Aloe Vera',
    type: ToxicityType.PLANT,
    severity: ToxicitySeverity.MILD,
    description: 'The gel is edible, but the outer skin contains saponins which are toxic.',
    symptoms: ['Vomiting', 'Diarrhea', '+1 more'],
    safeAlternative: 'Spider Plant',
  },
  {
    id: '9',
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    type: ToxicityType.PLANT,
    severity: ToxicitySeverity.MILD,
    description: 'Contains insoluble calcium oxalates causing mouth pain.',
    symptoms: ['Oral irritation', 'Drooling', 'Vomiting'],
    safeAlternative: 'Spider Plant',
  },
];

class ToxicityService {
  /**
   * Get all toxic foods
   */
  async getToxicFoods(): Promise<ToxicityItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return TOXIC_FOODS;
  }

  /**
   * Get all toxic plants
   */
  async getToxicPlants(): Promise<ToxicityItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return TOXIC_PLANTS;
  }

  /**
   * Search toxic items
   */
  async searchToxicItems(query: string, type?: ToxicityType): Promise<ToxicityItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const allItems = type === ToxicityType.FOOD 
      ? TOXIC_FOODS 
      : type === ToxicityType.PLANT 
        ? TOXIC_PLANTS 
        : [...TOXIC_FOODS, ...TOXIC_PLANTS];

    if (!query.trim()) {
      return allItems;
    }

    const lowerQuery = query.toLowerCase();
    return allItems.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.symptoms.some(symptom => symptom.toLowerCase().includes(lowerQuery)) ||
      (item.scientificName && item.scientificName.toLowerCase().includes(lowerQuery))
    );
  }
}

export const toxicityService = new ToxicityService();
