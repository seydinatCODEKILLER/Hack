import { apiClient, type ApiResponse } from '@/api/client';
import type { Artwork, ArtworkFormData, ArtworkListResponse } from '@/types/artwork.type';

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

    getAllForAdmin: async (
    page: number = 1,
    pageSize: number = 12,
    search?: string,
    artistSearch?: string,
    includeInactive?: boolean
  ): Promise<ArtworkListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(search && { search }),
      ...(artistSearch && { artistSearch }),
      ...(includeInactive && { includeInactive: 'true' }),
    });

    const response = await apiClient.get<ApiResponse<ArtworkListResponse>>(
      `/artworks?${params}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des œuvres');
    }

    return response.data.data;
  },

  create: async (data: ArtworkFormData): Promise<Artwork> => {
    const response = await apiClient.post<ApiResponse<Artwork>>('/artworks', data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la création de l\'œuvre');
    }

    return response.data.data;
  },

  update: async (id: string, data: ArtworkFormData): Promise<Artwork> => {
    const response = await apiClient.put<ApiResponse<Artwork>>(`/artworks/${id}`, data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour de l\'œuvre');
    }

    return response.data.data;
  },

  deactivate: async (id: string): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(`/artworks/${id}/delete`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la désactivation de l\'œuvre');
    }
  },

  restore: async (id: string): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(`/artworks/${id}/restore`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la restauration de l\'œuvre');
    }
  },
};