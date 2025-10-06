import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { artistsApi } from '@/api/endpoints/artists';
import type { Artist } from '@/types/artist.type';

export const useFeaturedArtists = (): UseQueryResult<Artist[], Error> => {
  return useQuery({
    queryKey: ['artists', 'featured'],
    queryFn: () => artistsApi.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useArtist = (id: string): UseQueryResult<Artist, Error> => {
  return useQuery({
    queryKey: ['artists', 'detail', id],
    queryFn: () => artistsApi.getById(id),
    enabled: !!id,
  });
};