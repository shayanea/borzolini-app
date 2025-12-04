import { createStandardMutationHook, QUERY_KEYS } from '@/hooks/utils';
import { AnalyzeSkinRequest, SkinAnalysisResult } from '@/types/ai-vision';
import { httpClient } from './http-client';

// API functions
const aiVisionApi = {
  analyzeSkin: (data: AnalyzeSkinRequest): Promise<SkinAnalysisResult> =>
    httpClient.post<SkinAnalysisResult>('/v1/ai-vision/analyze-skin', data, 'Failed to analyze skin'),
};

// Hooks
export function useAnalyzeSkin() {
  return createStandardMutationHook(
    aiVisionApi.analyzeSkin,
    {
      context: 'Analyze Skin',
      errorMessage: 'Failed to analyze skin image',
      invalidateQueries: [QUERY_KEYS.aiVision.all],
    }
  )();
}

export { aiVisionApi };
