import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { artworksApi } from '@/api/endpoints/artworks';

export const useInfiniteArtworks = (
  pageSize: number = 6,
  filters: {
    artistSearch: string;
  } = { artistSearch: '' }
) => {
  return useInfiniteQuery({
    queryKey: ['artworks', 'gallery', pageSize, filters],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      artworksApi.getAll(pageParam, pageSize, filters.artistSearch),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.pagination.totalPages ? nextPage : undefined;
    },
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