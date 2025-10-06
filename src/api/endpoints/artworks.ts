import { apiClient, type ApiResponse } from '@/api/client';
import type { Artwork, ArtworkListResponse } from '@/types/artwork.type';

export const artworksApi = {
  // Récupérer les dernières œuvres pour la preview (3 maximum)
  getLatest: async (limit: number = 3): Promise<Artwork[]> => {
    const response = await apiClient.get<ApiResponse<ArtworkListResponse>>(
      `/artworks?page=1&pageSize=${limit}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des œuvres');
    }

    return response.data.data.artworks;
  },

  // Récupérer toutes les œuvres (pour la galerie complète)
    getAll: async (
    page: number = 1, 
    pageSize: number = 12,
    artistSearch?: string,
  ): Promise<ArtworkListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(artistSearch && { artistSearch }),
    });

    const response = await apiClient.get<ApiResponse<ArtworkListResponse>>(
      `/artworks?${params}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des œuvres');
    }

    return response.data.data;
  },

  // Récupérer une œuvre spécifique
  getById: async (id: string): Promise<Artwork> => {
    const response = await apiClient.get<ApiResponse<Artwork>>(`/artworks/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération de l\'œuvre');
    }

    return response.data.data;
  },
};