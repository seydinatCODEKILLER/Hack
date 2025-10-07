import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtworkForm } from './ArtworkForm';
import { useArtwork, useUpdateArtwork } from '../hooks/useArtworks';
import { Skeleton } from '@/components/ui/skeleton';
import type { ArtworkFormValues } from '../validations/artwork.schema';
import type { Artwork } from '@/types/artwork.type';
import type { Artist } from '@/types/artist.type';

interface EditArtworkModalProps {
  artwork: Artwork | null;
  onOpenChange: (open: boolean) => void;
}

export function EditArtworkModal({ artwork, onOpenChange }: EditArtworkModalProps) {
  const { data: artworkData, isLoading } = useArtwork(artwork?.id || '');
  const updateMutation = useUpdateArtwork();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleSubmit = async (data: ArtworkFormValues) => {
    if (!artwork?.id) return;
    
    try {
      await updateMutation.mutateAsync({
        id: artwork.id,
        data,
      });
      setSelectedArtist(null);
      onOpenChange(false);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'œuvre :', error);
    }
  };

  const handleCancel = () => {
    setSelectedArtist(null);
    onOpenChange(false);
  };

  // Définir l'artiste sélectionné quand les données sont chargées
  if (artworkData && !selectedArtist) {
    setSelectedArtist(artworkData.artist);
  }

  const defaultValues = artworkData ? {
    title: artworkData.title,
    artistId: artworkData.artistId,
    roomType: artworkData.roomType,
  } : undefined;

  return (
    <Dialog open={!!artwork} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier l'œuvre</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'œuvre.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ArtworkForm
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
            onCancel={handleCancel}
            defaultValues={defaultValues}
            selectedArtist={selectedArtist}
            onArtistSelect={setSelectedArtist}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}