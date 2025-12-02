import { httpClient } from '../../../services/http-client';
import {
    CompleteTrainingDto,
    CreateTrainingAssignmentDto,
    DailyTrainingAssignment,
    DailyTrainingStats,
    PetSpecies,
    TrainingActivity,
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
}

export const trainingService = new TrainingService();
