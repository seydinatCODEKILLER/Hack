import { apiClient, type ApiResponse } from '@/api/client';
import type { Artist, ArtistFormData, ArtistListResponse } from '@/types/artist.type';

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
  getAll: async (
    page: number = 1,
    pageSize: number = 12,
    search?: string,
    statut?: string
  ): Promise<ArtistListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(search && { search }),
      ...(statut && { statut }),
    });

    const response = await apiClient.get<ApiResponse<ArtistListResponse>>(
      `/artists?${params}`
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

    // Créer un nouvel artiste avec FormData
  create: async (data: ArtistFormData): Promise<Artist> => {
    const formData = new FormData();
    
    // Ajouter les champs texte
    formData.append('nom', data.nom);
    formData.append('prenom', data.prenom);
    if (data.bio) {
      formData.append('bio', data.bio);
    }
    
    // Gérer l'avatar si c'est un fichier
    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    } else if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await apiClient.post<ApiResponse<Artist>>('/artists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la création de l\'artiste');
    }

    return response.data.data;
  },

  // Mettre à jour un artiste existant avec FormData
  update: async (id: string, data: ArtistFormData): Promise<Artist> => {
    const formData = new FormData();
    
    // Ajouter les champs texte
    formData.append('nom', data.nom);
    formData.append('prenom', data.prenom);
    if (data.bio) {
      formData.append('bio', data.bio);
    }
    
    // Gérer l'avatar
    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    } else if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await apiClient.put<ApiResponse<Artist>>(`/artists/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour de l\'artiste');
    }

    return response.data.data;
  },

    // Désactiver un artiste
  deactivate: async (id: string): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(`/artists/${id}/delete`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la désactivation de l\'artiste');
    }
  },

  // Restaurer un artiste
  restore: async (id: string): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(`/artists/${id}/restore`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Erreur lors de la restauration de l\'artiste');
    }
  },
};