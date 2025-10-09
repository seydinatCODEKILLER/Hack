import type { HotspotCreateData, HotspotWithDetails } from "@/types/pano.type";
import { apiClient, type ApiResponse } from "../client";

export const hotspotsApi = {
  create: async (data: HotspotCreateData): Promise<HotspotWithDetails> => {
    const response = await apiClient.post<ApiResponse<HotspotWithDetails>>('/hotspots', data);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de la création du hotspot');
    }
    return response.data.data;
  },
  
  getByPanorama: async (panoramaId: string): Promise<HotspotWithDetails[]> => {
    const response = await apiClient.get<ApiResponse<HotspotWithDetails[]>>(`/hotspots/panorama/${panoramaId}`);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de la récupération des hotspots');
    }
    return response.data.data;
  },
  
  delete: async (hotspotId: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/hotspots/${hotspotId}`);
  },
};