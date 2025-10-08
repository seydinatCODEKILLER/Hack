import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artworkTranslationsApi } from '@/api/endpoints/artwork-translations';
import type { ArtworkTranslationFormData } from '@/types/artwork.type';
import { toast } from 'sonner';
import { apiUtils } from '@/utils/apiUtils';

export const useArtworkTranslations = (artworkId: string) => {
  return useQuery({
    queryKey: ['artwork-translations', artworkId],
    queryFn: () => artworkTranslationsApi.getByArtworkId(artworkId),
    enabled: !!artworkId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateArtworkTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ artworkId, data }: { artworkId: string; data: ArtworkTranslationFormData }) => 
      artworkTranslationsApi.create(artworkId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['artwork-translations', variables.artworkId] });
      toast.success('Traduction ajoutée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de l\'ajout de la traduction', {
        description: errorMessage,
      });
    },
  });
};

export const useUpdateArtworkTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArtworkTranslationFormData }) =>
      artworkTranslationsApi.update(id, data),
    onSuccess: () => {
      // Invalider le cache pour toutes les œuvres (car on ne sait pas l'artworkId)
      queryClient.invalidateQueries({ queryKey: ['artwork-translations'] });
      toast.success('Traduction modifiée avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la modification de la traduction', {
        description: errorMessage,
      });
    },
  });
};

export const useDeleteArtworkTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => artworkTranslationsApi.delete(id),
    onSuccess: () => {
      // Invalider le cache pour toutes les œuvres
      queryClient.invalidateQueries({ queryKey: ['artwork-translations'] });
      toast.success('Traduction supprimée avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la suppression de la traduction', {
        description: error.message,
      });
    },
  });
};