import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { artworksApi } from '@/api/endpoints/artworks';
import type { Artwork } from '@/types/artwork.type';

export const useLatestArtworks = (limit: number = 3): UseQueryResult<Artwork[], Error> => {
  return useQuery({
    queryKey: ['artworks', 'latest', limit],
    queryFn: () => artworksApi.getLatest(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useArtwork = (id: string): UseQueryResult<Artwork, Error> => {
  return useQuery({
    queryKey: ['artworks', 'detail', id],
    queryFn: () => artworksApi.getById(id),
    enabled: !!id,
  });
};