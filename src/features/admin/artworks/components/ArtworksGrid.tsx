import { ArtworkCard } from './ArtworkCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtworks } from '../hooks/useArtworks';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Artwork } from '@/types/artwork.type';
import { PaginationControls } from '@/components/shared/PaginationControls';

interface ArtworksGridProps {
  page: number;
  filters: {
    search: string;
    artistSearch: string;
    includeInactive: boolean;
  };
  onPageChange: (page: number) => void;
  onEditArtwork: (artwork: Artwork) => void;
  onDeactivateArtwork: (artwork: Artwork) => void;
  onRestoreArtwork: (artwork: Artwork) => void;
  isDeactivating?: boolean;
  isRestoring?: boolean;
}

export function ArtworksGrid({
  page,
  filters,
  onPageChange,
  onEditArtwork,
  onDeactivateArtwork,
  onRestoreArtwork,
  isDeactivating,
  isRestoring,
}: ArtworksGridProps) {
  const { data, isLoading, error, refetch } = useArtworks(page, 12, filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des œuvres
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!data?.artworks || data.artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filters.search || filters.artistSearch || filters.includeInactive
            ? 'Aucune œuvre trouvée avec ces critères'
            : 'Aucune œuvre enregistrée'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onEdit={() => onEditArtwork(artwork)}
            onDeactivate={() => onDeactivateArtwork(artwork)} // ouvre le modal
            onRestore={() => onRestoreArtwork(artwork)} // ouvre le modal
            isDeactivating={isDeactivating}
            isRestoring={isRestoring}
          />
        ))}
      </div>

      {data.pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationControls
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
