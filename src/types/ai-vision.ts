// AI Vision Types

export interface AnalyzeSkinRequest {
  image: string; // base64 encoded image
  petId?: string;
}

export interface SkinCondition {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface SkinAnalysisResult {
  confidence: number;
  conditions: SkinCondition[];
  recommendations: string[];
  overallHealth: 'normal' | 'concern' | 'critical';
  message?: string;
}

export type InsightStatus = 'normal' | 'good' | 'warning' | 'critical';
export type InsightType = 'body_condition' | 'coat_quality' | 'hydration' | 'activity' | 'nutrition';

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  status: InsightStatus;
}

export interface MetricData {
  value: number;
  unit: string;
  status: string;
}

export interface RealTimeMetrics {
  heartRate: MetricData;
  bodyTemp: MetricData;
}

export interface ScanResult {
  id: string;
  petId: string;
  petName: string;
  scanDate: string;
  analysisResult: SkinAnalysisResult;
  metrics: RealTimeMetrics;
  insights: AIInsight[];
}
