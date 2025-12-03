import { httpClient } from '../../../services/http-client';
import { Resource, ResourceType } from '../types';

class ResourcesService {
  /**
   * Get all active resources
   */
  async getActiveResources(search?: string): Promise<Resource[]> {
    const url =
      search && search.trim().length > 0
        ? `/v1/resources?search=${encodeURIComponent(search.trim())}`
        : '/v1/resources';

    const response = await httpClient.get<Resource[]>(url);
    return response;
  }

  /**
   * Get resources by type
   */
  async getResourcesByType(type: ResourceType): Promise<Resource[]> {
    const response = await httpClient.get<Resource[]>(`/v1/resources/type/${type}?activeOnly=true`);
    return response;
  }
}

export const resourcesService = new ResourcesService();
