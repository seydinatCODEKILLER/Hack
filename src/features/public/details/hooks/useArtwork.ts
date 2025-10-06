import { useQuery } from '@tanstack/react-query';
import { artworksApi } from '@/api/endpoints/artworks';

export const useArtwork = (id: string) => {
  return useQuery({
    queryKey: ['artworks', 'detail', id],
    queryFn: () => artworksApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};