export enum ResourceType {
  VIDEO = 'video',
  DISCORD = 'discord',
  AUDIO = 'audio',
}

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description?: string;
  url: string;
  is_active: boolean;
  cover?: string;
  created_at: string;
  updated_at: string;
}
