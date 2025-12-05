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

// ============================================
// Training Modules & User Progress Types
// ============================================

export type TrainingModuleStatus = 'in_progress' | 'not_started' | 'completed';

export interface TrainingStep {
  id: string;
  module_id: string;
  title: string;
  description?: string | null;
  order: number;
  content_markdown?: string | null;
  video_url?: string | null;
  duration_minutes?: number | null;
  created_at: string;
  updated_at: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description?: string | null;
  thumbnail_url?: string | null;
  duration_minutes: number;
  difficulty: ActivityDifficulty;
  category?: string | null;
  species: PetSpecies;
  order?: number | null;
  is_active: boolean;
  steps?: TrainingStep[];
  created_at: string;
  updated_at: string;
}

export interface UserModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  started_at: string;
  completed_at?: string | null;
  progress_percentage: number;
  completed_steps: string[];
  current_step_id?: string | null;
  notes?: string | null;
  module?: TrainingModule;
}

export interface UserStepProgress {
  id: string;
  user_id: string;
  step_id: string;
  module_progress_id: string;
  completed_at: string;
  time_spent_seconds?: number | null;
  notes?: string | null;
}

export interface UserLevel {
  level: number;
  title: string;
  total_xp: number;
  xp_to_next_level: number;
  current_xp_in_level: number;
}

export interface UserTrainingProfile {
  user_id: string;
  level: UserLevel;
  total_modules_completed: number;
  total_steps_completed: number;
  current_streak_days: number;
  longest_streak_days: number;
}

// ============================================
// Weekly Challenge Types
// ============================================

export type ChallengeStatus = 'active' | 'completed' | 'failed' | 'pending';

export interface ChallengeStep {
  id: string;
  order: number;
  title: string;
  description?: string | null;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description?: string | null;
  reward_title: string;
  reward_description?: string | null;
  reward_badge_url?: string | null;
  steps: ChallengeStep[];
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface UserChallengeProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  status: ChallengeStatus;
  accepted_at?: string | null;
  completed_at?: string | null;
  completed_steps: string[];
  challenge?: WeeklyChallenge;
}

// ============================================
// API Response Types
// ============================================

export interface ModulesListResponse {
  modules: TrainingModule[];
  total: number;
}

export interface ModuleWithProgress extends TrainingModule {
  user_progress?: UserModuleProgress | null;
}

export interface StepWithProgress extends TrainingStep {
  is_completed: boolean;
}

export interface ModuleDetailResponse {
  module: TrainingModule;
  steps: StepWithProgress[];
  user_progress?: UserModuleProgress | null;
  final_challenge?: {
    title: string;
    description: string;
    reward_title: string;
    is_locked: boolean;
  } | null;
}
