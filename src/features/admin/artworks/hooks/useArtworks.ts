import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artworksApi } from '@/api/endpoints/artworks';
import type { ArtworkFormData } from '@/types/artwork.type';
import { toast } from 'sonner';

export const useArtworks = (
  page: number = 1,
  pageSize: number = 12,
  filters: { search?: string; artistSearch?: string; includeInactive?: boolean } = {}
) => {
  return useQuery({
    queryKey: ['artworks', 'list', page, pageSize, filters],
    queryFn: () => artworksApi.getAllForAdmin(page, pageSize, filters.search, filters.artistSearch, filters.includeInactive),
    staleTime: 5 * 60 * 1000,
  });
};

export const useArtwork = (id: string) => {
  return useQuery({
    queryKey: ['artworks', 'detail', id],
    queryFn: () => artworksApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArtworkFormData) => artworksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      toast.success('Œuvre créée avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la création', {
        description: error.message,
      });
    },
  });
};

export const useUpdateArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArtworkFormData }) =>
      artworksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      toast.success('Œuvre modifiée avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la modification', {
        description: error.message,
      });
    },
  });
};

export const useDeactivateArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => artworksApi.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      toast.success('Œuvre désactivée avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la désactivation', {
        description: error.message,
      });
    },
  });
};

export const useRestoreArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => artworksApi.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      toast.success('Œuvre restaurée avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la restauration', {
        description: error.message,
      });
    },
  });
};