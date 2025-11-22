import { PetSpecies } from '@/types/pet/pet-enums';
import type { Breed, GroomingNeeds, ExerciseNeeds, BreedsResponse } from '@/types/pet/breed';
import type {
  BreedResult,
  QuestionnaireAnswers,
  Vibe,
  Grooming,
  Activity,
} from '../types/questionnaire';

// Map API grooming needs to questionnaire grooming
const mapGroomingNeeds = (apiGrooming: GroomingNeeds): Grooming[] => {
  switch (apiGrooming) {
    case 'low':
      return ['low'];
    case 'moderate':
      return ['medium'];
    case 'high':
      return ['high'];
    default:
      return ['low', 'medium', 'high'];
  }
};

// Map API exercise needs to questionnaire activity
const mapExerciseNeeds = (apiExercise: ExerciseNeeds): Activity[] => {
  switch (apiExercise) {
    case 'low':
      return ['low'];
    case 'moderate':
      return ['medium'];
    case 'high':
      return ['high'];
    default:
      return ['low', 'medium', 'high'];
  }
};

// Map size category to space score ranges
const mapSizeToSpaceScore = (
  sizeCategory: string,
): Array<1 | 2 | 3 | 4 | 5> => {
  switch (sizeCategory) {
    case 'tiny':
      return [1, 2, 3]; // Works well in small spaces
    case 'small':
      return [1, 2, 3, 4];
    case 'medium':
      return [2, 3, 4, 5];
    case 'large':
      return [3, 4, 5]; // Needs more space
    case 'giant':
      return [4, 5]; // Definitely needs large space
    default:
      return [1, 2, 3, 4, 5];
  }
};

// Extract vibe from temperament description
const extractVibeFromTemperament = (temperament: string): Vibe[] => {
  const lowerTemperament = temperament.toLowerCase();
  const vibes: Vibe[] = [];

  // Check for cuddly indicators
  if (
    lowerTemperament.includes('affectionate') ||
    lowerTemperament.includes('gentle') ||
    lowerTemperament.includes('calm') ||
    lowerTemperament.includes('docile') ||
    lowerTemperament.includes('sweet') ||
    lowerTemperament.includes('cuddly') ||
    lowerTemperament.includes('loving')
  ) {
    vibes.push('cuddly');
  }

  // Check for playful indicators
  if (
    lowerTemperament.includes('playful') ||
    lowerTemperament.includes('active') ||
    lowerTemperament.includes('energetic') ||
    lowerTemperament.includes('curious') ||
    lowerTemperament.includes('merry') ||
    lowerTemperament.includes('social')
  ) {
    vibes.push('playful');
  }

  // Check for independent indicators
  if (
    lowerTemperament.includes('independent') ||
    lowerTemperament.includes('reserved') ||
    lowerTemperament.includes('quiet') ||
    lowerTemperament.includes('aloof') ||
    lowerTemperament.includes('self-sufficient')
  ) {
    vibes.push('independent');
  }

  // Default to playful if no matches found
  if (vibes.length === 0) {
    vibes.push('playful');
  }

  return vibes;
};

// Check if breed is suitable for allergy sufferers
const isHypoallergenic = (breed: Breed): boolean => {
  const lowerName = breed.name.toLowerCase();
  const lowerDescription = breed.description.toLowerCase();
  const lowerTemperament = breed.temperament.toLowerCase();

  // Common hypoallergenic breeds or keywords
  const hypoallergenicKeywords = [
    'poodle',
    'sphynx',
    'devon rex',
    'cornish rex',
    'russian blue',
    'bengal',
    'hypoallergenic',
    'hairless',
    'curly',
    'low-shedding',
  ];

  return (
    hypoallergenicKeywords.some(keyword =>
      lowerName.includes(keyword) ||
      lowerDescription.includes(keyword) ||
      lowerTemperament.includes(keyword),
    ) || breed.grooming_needs === 'low' // Low grooming often means low shedding
  );
};

// Calculate compatibility score between answers and breed
function calculateBreedScore(
  answers: QuestionnaireAnswers,
  breed: Breed,
): number {
  let score = 0;

  // Dealbreaker: High allergies - breed must be hypoallergenic
  if (answers.allergy === 'high' && !isHypoallergenic(breed)) {
    return -1000;
  }

  // Space score matching (weighted heavily)
  const breedSpaceScores = mapSizeToSpaceScore(breed.size_category);
  if (breedSpaceScores.includes(answers.spaceScore)) {
    score += 30; // High weight for space
  } else {
    // Partial credit for close matches
    const distance = Math.min(
      ...breedSpaceScores.map(pref => Math.abs(pref - answers.spaceScore)),
    );
    if (distance === 1) {
      score += 15;
    }
  }

  // Grooming matching (weighted)
  const breedGrooming = mapGroomingNeeds(breed.grooming_needs);
  if (breedGrooming.includes(answers.grooming)) {
    score += 25;
  } else {
    // Partial credit for adjacent levels
    const groomingValues: Grooming[] = ['low', 'medium', 'high'];
    const userIndex = groomingValues.indexOf(answers.grooming);
    const breedIndex = groomingValues.indexOf(breedGrooming[0]);
    if (Math.abs(userIndex - breedIndex) === 1) {
      score += 12;
    }
  }

  // Activity matching (weighted)
  const breedActivity = mapExerciseNeeds(breed.exercise_needs);
  if (breedActivity.includes(answers.activity)) {
    score += 25;
  } else {
    // Partial credit for adjacent levels
    const activityValues: Activity[] = ['low', 'medium', 'high'];
    const userIndex = activityValues.indexOf(answers.activity);
    const breedIndex = activityValues.indexOf(breedActivity[0]);
    if (Math.abs(userIndex - breedIndex) === 1) {
      score += 12;
    }
  }

  // Vibe matching
  const breedVibes = extractVibeFromTemperament(breed.temperament);
  if (breedVibes.includes(answers.vibe)) {
    score += 20;
  }

  // Allergy matching bonus
  if (answers.allergy === 'high' && isHypoallergenic(breed)) {
    score += 30; // Big bonus for hypoallergenic breeds when needed
  } else if (answers.allergy === 'none' && !isHypoallergenic(breed)) {
    score += 10; // Small bonus - not critical but nice
  }

  // Kid level matching (based on size and temperament)
  if (answers.kidLevel === 'toddlers') {
    // Prefer medium-sized, gentle breeds for toddlers
    if (
      (breed.size_category === 'small' || breed.size_category === 'medium') &&
      breed.temperament.toLowerCase().includes('gentle')
    ) {
      score += 20;
    }
    // Penalize large/giant breeds with toddlers (safety concern)
    if (breed.size_category === 'large' || breed.size_category === 'giant') {
      score -= 10;
    }
  } else if (answers.kidLevel === 'none') {
    // Seniors/adults only - any size works
    score += 10;
  }

  return score;
}

// Generate why description from breed data
const generateWhyDescription = (
  breed: Breed,
  answers: QuestionnaireAnswers,
): string => {
  const parts: string[] = [];

  // Add temperament-based description
  if (breed.temperament.toLowerCase().includes('gentle')) {
    parts.push('Gentle and calm');
  } else if (breed.temperament.toLowerCase().includes('playful')) {
    parts.push('Playful and energetic');
  } else if (breed.temperament.toLowerCase().includes('intelligent')) {
    parts.push('Intelligent and trainable');
  }

  // Add size-based description
  if (answers.spaceScore <= 2 && (breed.size_category === 'tiny' || breed.size_category === 'small')) {
    parts.push('perfect for small spaces');
  } else if (answers.spaceScore >= 4 && (breed.size_category === 'large' || breed.size_category === 'giant')) {
    parts.push('thrives in spacious environments');
  }

  // Add grooming-based description
  if (breed.grooming_needs === 'low' && answers.grooming === 'low') {
    parts.push('low-maintenance grooming');
  } else if (breed.grooming_needs === 'high' && answers.grooming === 'high') {
    parts.push('enjoys regular grooming sessions');
  }

  // Add activity-based description
  if (breed.exercise_needs === 'low' && answers.activity === 'low') {
    parts.push('perfect for relaxed lifestyles');
  } else if (breed.exercise_needs === 'high' && answers.activity === 'high') {
    parts.push('ideal for active families');
  }

  // Add allergy info if relevant
  if (answers.allergy === 'high' && isHypoallergenic(breed)) {
    parts.push('hypoallergenic');
  }

  // Fallback to breed description if no matches
  if (parts.length === 0) {
    return breed.description || `${breed.name} - ${breed.temperament}`;
  }

  return `${breed.name}: ${parts.join(', ')}.`;
};

// Generate tags from breed data
const generateTags = (breed: Breed): string[] => {
  const tags: string[] = [];

  // Size tags
  if (breed.size_category === 'tiny' || breed.size_category === 'small') {
    tags.push('apartment-friendly');
  }
  if (breed.size_category === 'large' || breed.size_category === 'giant') {
    tags.push('space-needer');
  }

  // Grooming tags
  if (breed.grooming_needs === 'low') {
    tags.push('low-maintenance');
  } else if (breed.grooming_needs === 'high') {
    tags.push('high-grooming');
  }

  // Activity tags
  if (breed.exercise_needs === 'high') {
    tags.push('active');
  } else if (breed.exercise_needs === 'low') {
    tags.push('relaxed');
  }

  // Temperament tags
  if (breed.temperament.toLowerCase().includes('gentle')) {
    tags.push('gentle');
  }
  if (breed.temperament.toLowerCase().includes('playful')) {
    tags.push('playful');
  }
  if (breed.temperament.toLowerCase().includes('intelligent')) {
    tags.push('smart');
  }

  // Allergy tags
  if (isHypoallergenic(breed)) {
    tags.push('hypoallergenic');
  }

  // Kid-friendly tags
  if (
    breed.temperament.toLowerCase().includes('gentle') &&
    breed.size_category !== 'giant'
  ) {
    tags.push('family-friendly');
  }

  return tags.slice(0, 5); // Limit to 5 tags
};

// Main calculation function using API breeds
export function calculateBreedResult(
  answers: QuestionnaireAnswers,
  breedsData: BreedsResponse,
  species?: PetSpecies,
): BreedResult | null {
  if (!breedsData) {
    return null;
  }

  const scores: Array<{ breed: Breed; score: number }> = [];

  // Filter breeds by species if provided
  const allBreeds: Breed[] = breedsData.breeds_by_species
    .filter(item => !species || item.species === species)
    .flatMap(item => item.breeds.filter(breed => breed.is_active));

  if (allBreeds.length === 0) {
    return null;
  }

  // Calculate score for each breed
  for (const breed of allBreeds) {
    const score = calculateBreedScore(answers, breed);
    if (score > -1000) {
      // Only include breeds that aren't dealbreakers
      scores.push({ breed, score });
    }
  }

  if (scores.length === 0) {
    return null;
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Get top match
  const topMatch = scores[0];
  const breed = topMatch.breed;

  // Calculate fit score percentage (normalize to 60-100)
  const maxPossibleScore = 160; // Sum of all possible points
  const fitScore = Math.min(
    100,
    Math.max(60, Math.round((topMatch.score / maxPossibleScore) * 100)),
  );

  return {
    name: breed.name,
    fitScore,
    why: generateWhyDescription(breed, answers),
    tags: generateTags(breed),
  };
}
