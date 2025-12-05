import { httpClient } from '../../../services/http-client';
import {
    CompleteTrainingDto,
    CreateTrainingAssignmentDto,
    DailyTrainingAssignment,
    DailyTrainingStats,
    ModuleDetailResponse,
    ModulesListResponse,
    ModuleWithProgress,
    PetSpecies,
    TrainingActivity,
    UserChallengeProgress,
    UserTrainingProfile,
    WeeklyChallenge,
} from '../types';

class TrainingService {
  /**
   * Get today's training assignments for the current user
   */
  async getTodayAssignments(): Promise<DailyTrainingAssignment[]> {
    const response = await httpClient.get<DailyTrainingAssignment[]>('/v1/training/daily');
    return response;
  }

  /**
   * Create a manual training assignment
   */
  async createAssignment(dto: CreateTrainingAssignmentDto): Promise<DailyTrainingAssignment> {
    const response = await httpClient.post<DailyTrainingAssignment>('/v1/training/daily', dto);
    return response;
  }

  /**
   * Mark a training assignment as completed
   */
  async completeAssignment(
    assignmentId: string,
    dto: CompleteTrainingDto
  ): Promise<DailyTrainingAssignment> {
    const response = await httpClient.patch<DailyTrainingAssignment>(
      `/v1/training/daily/${assignmentId}/complete`,
      dto
    );
    return response;
  }

  /**
   * Get training history
   */
  async getTrainingHistory(limit = 50): Promise<DailyTrainingAssignment[]> {
    const response = await httpClient.get<DailyTrainingAssignment[]>(`/v1/training/history?limit=${limit}`);
    return response;
  }

  /**
   * Get training statistics
   */
  async getTrainingStats(): Promise<DailyTrainingStats> {
    const response = await httpClient.get<DailyTrainingStats>('/v1/training/stats');
    return response;
  }

  /**
   * Search for training activities
   */
  async searchActivities(
    query: string,
    species?: PetSpecies,
    tags?: string[],
    difficulty?: string
  ): Promise<TrainingActivity[]> {
    const params: Record<string, string> = { q: query };
    if (species) params.species = species;
    if (tags && tags.length) params.tags = tags.join(',');
    if (difficulty) params.difficulty = difficulty;

    const queryString = new URLSearchParams(params).toString();
    const response = await httpClient.get<TrainingActivity[]>(`/v1/training/search?${queryString}`);
    return response;
  }

  // ============================================
  // Training Modules API
  // ============================================

  /**
   * Get all training modules with optional filters
   */
  async getModules(species?: PetSpecies): Promise<ModulesListResponse> {
    const params = species ? `?species=${species}` : '';
    const response = await httpClient.get<ModulesListResponse>(`/v1/training/modules${params}`);
    return response;
  }

  /**
   * Get all modules with user progress
   */
  async getModulesWithProgress(): Promise<ModuleWithProgress[]> {
    const response = await httpClient.get<ModuleWithProgress[]>('/v1/training/modules/with-progress');
    return response;
  }

  /**
   * Get a single module by ID with full details
   */
  async getModuleById(moduleId: string): Promise<ModuleDetailResponse> {
    const response = await httpClient.get<ModuleDetailResponse>(`/v1/training/modules/${moduleId}`);
    return response;
  }

  /**
   * Start a training module (creates user progress)
   */
  async startModule(moduleId: string): Promise<void> {
    await httpClient.post(`/v1/training/modules/${moduleId}/start`);
  }

  /**
   * Complete a training step
   */
  async completeStep(moduleId: string, stepId: string, timeSpentSeconds?: number): Promise<void> {
    await httpClient.post(`/v1/training/modules/${moduleId}/steps/${stepId}/complete`, {
      time_spent_seconds: timeSpentSeconds,
    });
  }

  // ============================================
  // User Profile & Progress API
  // ============================================

  /**
   * Get user's training profile with level and stats
   */
  async getUserProfile(): Promise<UserTrainingProfile> {
    const response = await httpClient.get<UserTrainingProfile>('/v1/training/profile');
    return response;
  }

  // ============================================
  // Weekly Challenges API
  // ============================================

  /**
   * Get the active weekly challenge
   */
  async getActiveChallenge(): Promise<WeeklyChallenge | null> {
    try {
      const response = await httpClient.get<WeeklyChallenge>('/v1/training/challenges/active');
      return response;
    } catch {
      // No active challenge
      return null;
    }
  }

  /**
   * Get user's progress on the active challenge
   */
  async getChallengeProgress(challengeId: string): Promise<UserChallengeProgress | null> {
    try {
      const response = await httpClient.get<UserChallengeProgress>(
        `/v1/training/challenges/${challengeId}/progress`
      );
      return response;
    } catch {
      return null;
    }
  }

  /**
   * Accept a weekly challenge
   */
  async acceptChallenge(challengeId: string): Promise<UserChallengeProgress> {
    const response = await httpClient.post<UserChallengeProgress>(
      `/v1/training/challenges/${challengeId}/accept`
    );
    return response;
  }

  /**
   * Complete a challenge step
   */
  async completeChallengeStep(challengeId: string, stepId: string): Promise<void> {
    await httpClient.post(`/v1/training/challenges/${challengeId}/steps/${stepId}/complete`);
  }
}

export const trainingService = new TrainingService();
