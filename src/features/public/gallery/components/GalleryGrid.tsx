import { useInfiniteArtworks } from '../hooks/useArtworks';
import { ArtworkCard } from './ArtworkCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, RefreshCw } from 'lucide-react';

interface GalleryGridProps {
  filters: {
    artistSearch: string;
  };
}

export function GalleryGrid({ filters }: GalleryGridProps) {
  const { 
    data, 
    isLoading, 
    isError, 
    hasNextPage, 
    isFetchingNextPage,
    refetch,
    fetchNextPage
  } = useInfiniteArtworks(6, filters);

  const allArtworks = data?.pages.flatMap(page => page.artworks) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Erreur lors du chargement des œuvres</p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (allArtworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune œuvre trouvée</p>
      </div>
    );
  }

  return (
    <>
      {/* Grille des œuvres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {allArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>

      {/* Bouton Voir plus */}
      {hasNextPage && (
        <div className="text-center">
          <Button 
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            className="min-w-32"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Chargement...
              </>
            ) : (
              'Voir plus'
            )}
          </Button>
        </div>
      )}

      {/* Message si toutes les œuvres sont chargées */}
      {!hasNextPage && allArtworks.length > 0 && (
        <div className="text-center py-4">
          <p className="text-muted-foreground">
            Toutes les œuvres ont été chargées
          </p>
        </div>
      )}
    </>
  );
}