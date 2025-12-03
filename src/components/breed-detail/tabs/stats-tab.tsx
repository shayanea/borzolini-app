import { Breed, ExerciseNeeds, GroomingNeeds } from '@/types/pet';
import { ScrollView } from 'react-native';
import { ProgressBar } from '../progress-bar';

interface StatsTabProps {
  breed: Breed;
}

// Convert exercise/grooming needs to percentage
function needsToPercentage(needs: ExerciseNeeds | GroomingNeeds): number {
  const mapping = { low: 20, moderate: 60, high: 95 };
  return mapping[needs] || 50;
}

// Calculate affectionate score from temperament
function calculateAffectionateScore(temperament: string): number {
  const lowerTemp = temperament.toLowerCase();
  const affectionateTerms = ['affectionate', 'loving', 'loyal', 'friendly', 'devoted'];
  const count = affectionateTerms.filter(term => lowerTemp.includes(term)).length;
  return Math.min(count * 25 + 50, 95);
}

// Calculate trainability from temperament
function calculateTrainability(temperament: string): number {
  const lowerTemp = temperament.toLowerCase();
  const trainableTerms = ['intelligent', 'smart', 'trainable', 'obedient', 'eager'];
  const count = trainableTerms.filter(term => lowerTemp.includes(term)).length;
  return Math.min(count * 25 + 40, 95);
}

export function StatsTab({ breed }: StatsTabProps) {
  const energyLevel = needsToPercentage(breed.exercise_needs);
  const affectionate = calculateAffectionateScore(breed.temperament || '');
  const trainability = calculateTrainability(breed.temperament || '');
  const groomingNeeds = needsToPercentage(breed.grooming_needs);

  return (
    <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
      <ProgressBar label="Energy Level" percentage={energyLevel} />
      <ProgressBar label="Affectionate" percentage={affectionate} />
      <ProgressBar label="Trainability" percentage={trainability} />
      <ProgressBar label="Grooming Needs" percentage={groomingNeeds} />
    </ScrollView>
  );
}
