import { apiClient, type ApiResponse } from '@/api/client';
import type { Artist, ArtistListResponse } from '@/types/artist.type';

export const artistsApi = {
  // Récupérer les artistes pour la landing page (3 maximum)
  getFeatured: async (): Promise<Artist[]> => {
    const response = await apiClient.get<ApiResponse<ArtistListResponse>>(
      '/artists?page=1&pageSize=4&statut=actif'
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des artistes');
    }

    return response.data.data.artists;
  },

  // Récupérer tous les artistes
  getAll: async (page: number = 1, pageSize: number = 12): Promise<ArtistListResponse> => {
    const response = await apiClient.get<ApiResponse<ArtistListResponse>>(
      `/artists?page=${page}&pageSize=${pageSize}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des artistes');
    }

    return response.data.data;
  },

  // Récupérer un artiste spécifique
  getById: async (id: string): Promise<Artist> => {
    const response = await apiClient.get<ApiResponse<Artist>>(`/artists/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération de l\'artiste');
    }

    return response.data.data;
  },
};