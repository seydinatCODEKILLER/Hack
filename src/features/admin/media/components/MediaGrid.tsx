import { MediaCard } from './MediaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtworkMedia } from '../hooks/useArtworkMedia';
import { useDeleteArtworkMedia } from '../hooks/useArtworkMedia';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Artwork } from '@/types/artwork.type';
import type { ArtworkMedia } from '@/types/artwork.type';

interface MediaGridProps {
  artwork: Artwork;
  onDeleteMedia: (media: ArtworkMedia) => void;
}

export function MediaGrid({ artwork, onDeleteMedia }: MediaGridProps) {
  const { data: media, isLoading, error, refetch } = useArtworkMedia(artwork.id);
  const deleteMutation = useDeleteArtworkMedia();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Erreur lors du chargement des médias</p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!media || media.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun média</h3>
        <p className="text-muted-foreground mb-4">
          Aucun média n'a été ajouté à cette œuvre pour le moment.
        </p>
      </div>
    );
  }

  // Grouper les médias par type
  const mediaByType = {
    IMAGE: media.filter(m => m.type === 'IMAGE'),
    AUDIO: media.filter(m => m.type === 'AUDIO'),
    VIDEO: media.filter(m => m.type === 'VIDEO'),
  };

  return (
    <div className="space-y-8">
      {/* Images */}
      {mediaByType.IMAGE.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded"></span>
            Images ({mediaByType.IMAGE.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaByType.IMAGE.map((mediaItem) => (
              <MediaCard
                key={mediaItem.id}
                media={mediaItem}
                onDelete={() => onDeleteMedia(mediaItem)}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        </div>
      )}

      {/* Audio */}
      {mediaByType.AUDIO.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-500 rounded"></span>
            Audio ({mediaByType.AUDIO.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaByType.AUDIO.map((mediaItem) => (
              <MediaCard
                key={mediaItem.id}
                media={mediaItem}
                onDelete={() => onDeleteMedia(mediaItem)}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        </div>
      )}

      {/* Vidéos */}
      {mediaByType.VIDEO.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-red-500 rounded"></span>
            Vidéos ({mediaByType.VIDEO.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaByType.VIDEO.map((mediaItem) => (
              <MediaCard
                key={mediaItem.id}
                media={mediaItem}
                onDelete={() => onDeleteMedia(mediaItem)}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}