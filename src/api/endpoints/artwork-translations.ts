import { apiClient, type ApiResponse } from '@/api/client';
import type { ArtworkTranslationForAdmin, ArtworkTranslationFormData } from '@/types/artwork.type';

export const artworkTranslationsApi = {
    
  // Récupérer toutes les traductions d'une œuvre
  getByArtworkId: async (artworkId: string): Promise<ArtworkTranslationForAdmin[]> => {
    const response = await apiClient.get<ApiResponse<ArtworkTranslationForAdmin[]>>(
      `/artwork-translations/${artworkId}/translations`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la récupération des traductions');
    }

    return response.data.data;
  },

  // Ajouter une traduction à une œuvre
  create: async (artworkId: string, data: ArtworkTranslationFormData): Promise<ArtworkTranslationForAdmin> => {
    const response = await apiClient.post<ApiResponse<ArtworkTranslationForAdmin>>(
      `/artwork-translations/${artworkId}`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de l\'ajout de la traduction');
    }

    return response.data.data;
  },

  // Mettre à jour une traduction
  update: async (id: string, data: ArtworkTranslationFormData): Promise<ArtworkTranslationForAdmin> => {
    const response = await apiClient.put<ApiResponse<ArtworkTranslationForAdmin>>(
      `/artwork-translations/${id}`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour de la traduction');
    }

    return response.data.data;
  },

  // Supprimer une traduction
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/artwork-translations/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la suppression de la traduction');
    }
  },
};