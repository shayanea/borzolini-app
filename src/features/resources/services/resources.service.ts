import { httpClient } from '../../../services/http-client';
import { Resource, ResourceType } from '../types';

class ResourcesService {
  /**
   * Get all active resources
   */
  async getActiveResources(): Promise<Resource[]> {
    const response = await httpClient.get<Resource[]>('/resources/active');
    return response;
  }

  /**
   * Get resources by type
   */
  async getResourcesByType(type: ResourceType): Promise<Resource[]> {
    const response = await httpClient.get<Resource[]>(`/resources/type/${type}?activeOnly=true`);
    return response;
  }
}

export const resourcesService = new ResourcesService();
