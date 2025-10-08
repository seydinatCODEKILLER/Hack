import { apiClient, type ApiResponse } from '@/api/client';
import type { ArtworkMedia, ArtworkMediaFormData } from '@/types/artwork.type';

export const artworkMediaApi = {
  // Récupérer tous les médias d'une œuvre
  getByArtworkId: async (artworkId: string): Promise<ArtworkMedia[]> => {
    const response = await apiClient.get<ApiResponse<ArtworkMedia[]>>(
      `/artwork-medias/${artworkId}/media`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des médias');
    }

    return response.data.data;
  },

  // Ajouter un média à une œuvre - CORRIGÉ
  create: async (artworkId: string, data: Omit<ArtworkMediaFormData, 'artworkId'>): Promise<ArtworkMedia> => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('file', data.file);

    const response = await apiClient.post<ApiResponse<ArtworkMedia>>(
      `/artwork-medias/${artworkId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de l\'ajout du média');
    }

    return response.data.data;
  },

  // Supprimer un média
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/artwork-medias/media/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression du média');
    }
  },
};