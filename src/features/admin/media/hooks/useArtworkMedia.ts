import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artworkMediaApi } from '@/api/endpoints/artwork-media';
import type { ArtworkMediaFormData } from '@/types/artwork.type';
import { toast } from 'sonner';

export const useArtworkMedia = (artworkId: string) => {
  return useQuery({
    queryKey: ['artwork-media', artworkId],
    queryFn: () => artworkMediaApi.getByArtworkId(artworkId),
    enabled: !!artworkId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateArtworkMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ artworkId, data }: { artworkId: string; data: Omit<ArtworkMediaFormData, 'artworkId'> }) => 
      artworkMediaApi.create(artworkId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['artwork-media', variables.artworkId] });
      toast.success('Média ajouté avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de l\'ajout du média', {
        description: error.message,
      });
    },
  });
};

export const useDeleteArtworkMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; artworkId: string }) =>
      artworkMediaApi.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['artwork-media', variables.artworkId] });
      toast.success('Média supprimé avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la suppression du média', {
        description: error.message,
      });
    },
  });
};