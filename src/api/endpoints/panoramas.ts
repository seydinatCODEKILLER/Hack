import { apiClient, type ApiResponse } from '@/api/client';
import type { PanoramaForAdmin } from '@/types/pano.type';
import type { Panorama, PanoramaResponse } from '@/types/panorama.types';

export const panoramasApi = {

  getAllForAdmin: async (filters?: { search?: string }): Promise<PanoramaForAdmin[]> => {
  const response = await apiClient.get<ApiResponse<{ panoramas: PanoramaForAdmin[], pagination: any }>>(
    '/panoramas',
    { params: filters }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || 'Erreur lors de la récupération des panoramas pour admin');
  }

  // ✅ On renvoie le tableau de panoramas uniquement
  return response.data.data.panoramas;
},
  // Récupérer tous les panoramas actifs
  getAll: async (): Promise<Panorama[]> => {
    const response = await apiClient.get<ApiResponse<PanoramaResponse>>('/panoramas?isActive=true');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des panoramas');
    }

    return response.data.data.panoramas;
  },

  // Récupérer un panorama par son ID
  getById: async (id: string): Promise<Panorama> => {
    const response = await apiClient.get<ApiResponse<Panorama>>(`/panoramas/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération du panorama');
    }

    return response.data.data;
  },

  // Récupérer le premier panorama actif
  getFirstActive: async (): Promise<Panorama> => {
    const response = await apiClient.get<ApiResponse<PanoramaResponse>>(
      '/panoramas?page=1&pageSize=1&isActive=true'
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération du panorama');
    }

    const panoramas = response.data.data.panoramas;

    if (!panoramas || panoramas.length === 0) {
      throw new Error('Aucun panorama actif trouvé');
    }

    return panoramas[0];
  },
};