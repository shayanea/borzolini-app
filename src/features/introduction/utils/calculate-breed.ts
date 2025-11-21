import { PetSpecies } from '@/types/pet/pet-enums';
import { breedProfiles, type BreedProfile } from '../constants/breed-profiles';
import type {
    BreedResult,
    QuestionnaireAnswers,
} from '../types/questionnaire';

function calculateBreedScore(
  answers: QuestionnaireAnswers,
  breed: BreedProfile,
): number {
  let score = 0;

  // Dealbreaker: High allergies
  if (answers.allergy === 'high' && !breed.preferences.allergy.includes('high')) {
    return -1000;
  }

  // Kid level matching
  if (breed.preferences.kidLevel.includes(answers.kidLevel)) {
    score += breed.weights.kidLevel;
  }

  // Space score matching
  if (breed.preferences.spaceScore.includes(answers.spaceScore)) {
    score += breed.weights.spaceScore;
  } else {
    // Partial credit for close matches
    const distance = Math.min(
      ...breed.preferences.spaceScore.map(pref =>
        Math.abs(pref - answers.spaceScore),
      ),
    );
    if (distance === 1) {
      score += breed.weights.spaceScore * 0.5;
    }
  }

  // Allergy matching (high priority)
  if (breed.preferences.allergy.includes(answers.allergy)) {
    score += breed.weights.allergy;
  }

  // Vibe matching
  if (breed.preferences.vibe.includes(answers.vibe)) {
    score += breed.weights.vibe;
  }

  // Grooming matching
  if (breed.preferences.grooming.includes(answers.grooming)) {
    score += breed.weights.grooming;
  }

  // Activity matching
  if (breed.preferences.activity.includes(answers.activity)) {
    score += breed.weights.activity;
  }

  return score;
}

export function calculateBreedResult(
  answers: QuestionnaireAnswers,
  species?: PetSpecies,
): BreedResult {
  const scores: Array<{ breed: string; score: number }> = [];

  // Filter by species if provided
  const filteredProfiles = species
    ? Object.entries(breedProfiles).filter(([, profile]) => 
        profile.species === species
      )
    : Object.entries(breedProfiles);

  // Calculate score for each breed
  for (const [breedKey, breedProfile] of filteredProfiles) {
    const score = calculateBreedScore(answers, breedProfile);
    scores.push({ breed: breedKey, score });
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Get top match
  const topMatch = scores[0];
  const breedProfile = breedProfiles[topMatch.breed];

  // Calculate fit score percentage (normalize to 0-100)
  const maxPossibleScore = Object.values(breedProfile.weights).reduce(
    (sum, weight) => sum + weight,
    0,
  );
  const fitScore = Math.round((topMatch.score / maxPossibleScore) * 100);

  return {
    name: breedProfile.name,
    fitScore: Math.max(60, fitScore), // Minimum 60% match
    why: breedProfile.why,
    tags: breedProfile.tags,
  };
}

