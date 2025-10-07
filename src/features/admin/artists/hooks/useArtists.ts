import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artistsApi } from '@/api/endpoints/artists';
import type { ArtistFormData } from '@/types/artist.type';
import { toast } from 'sonner';

export const useArtists = (
  page: number = 1,
  pageSize: number = 12,
  filters: { search?: string; statut?: string } = {}
) => {
  return useQuery({
    queryKey: ['artists', 'list', page, pageSize, filters],
    queryFn: () => artistsApi.getAll(page, pageSize, filters.search, filters.statut),
    staleTime: 5 * 60 * 1000,
  });
};

export const useArtist = (id: string) => {
  return useQuery({
    queryKey: ['artists', 'detail', id],
    queryFn: () => artistsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArtistFormData) => artistsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      toast.success('Artiste créé avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la création', {
        description: error.message,
      });
    },
  });
};

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArtistFormData }) =>
      artistsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      toast.success('Artiste modifié avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la modification', {
        description: error.message,
      });
    },
  });
};

export const useDeactivateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => artistsApi.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      toast.success('Artiste désactivé avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la désactivation', {
        description: error.message,
      });
    },
  });
};

export const useRestoreArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => artistsApi.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      toast.success('Artiste restauré avec succès');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la restauration', {
        description: error.message,
      });
    },
  });
};