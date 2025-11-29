export enum ActivityDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  ADVANCED = 'advanced',
}

export enum PetSpecies {
  DOG = 'dog',
  CAT = 'cat',
}

export interface TrainingActivity {
  id: string;
  title: string;
  summary?: string | null;
  content_markdown: string;
  difficulty: ActivityDifficulty;
  avg_duration_minutes?: number | null;
  indoor?: boolean | null;
  equipment?: string[] | null;
  tags: string[];
  risks: string[];
  enrichment: string[];
  video_url?: string | null;
  source_primary?: string | null;
  source_name?: string | null;
  license?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyTrainingAssignment {
  id: string;
  user_id: string;
  pet_id?: string | null;
  activity_id: string;
  assignment_date: string;
  is_completed: boolean;
  completed_at?: string | null;
  notes?: string | null;
  feedback?: string | null;
  difficulty_progression?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  activity: TrainingActivity;
  pet?: {
    id: string;
    name: string;
    species: PetSpecies;
    breed?: string | null;
  };
}

export interface CreateTrainingAssignmentDto {
  pet_id?: string;
  activity_id: string;
  assignment_date?: string;
  notes?: string;
}

export interface CompleteTrainingDto {
  notes?: string;
  feedback?: string;
}

export interface DailyTrainingStats {
  total_today: number;
  completed_today: number;
  pending_today: number;
  completion_rate_today: number;
  total_this_week: number;
  completed_this_week: number;
  avg_completion_rate_week: number;
}
