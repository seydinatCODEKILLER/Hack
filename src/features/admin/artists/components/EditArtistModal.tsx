import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtistForm } from './ArtistForm';
import { useArtist, useUpdateArtist } from '../hooks/useArtists';
import { Skeleton } from '@/components/ui/skeleton';
import type { ArtistFormValues } from '../validations/artist.schema';
import type { Artist } from '@/types/artist.type';

interface EditArtistModalProps {
  artist: Artist | null;
  onOpenChange: (open: boolean) => void;
}

export function EditArtistModal({ artist, onOpenChange }: EditArtistModalProps) {
  const { data: artistData, isLoading } = useArtist(artist?.id || '');
  const updateMutation = useUpdateArtist();

  const handleSubmit = async (data: ArtistFormValues) => {
    if (!artist?.id) return;
    
    try {
      await updateMutation.mutateAsync({
        id: artist.id,
        data,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'artiste :", error);
    }
  };

  const defaultValues = artistData ? {
    nom: artistData.nom,
    prenom: artistData.prenom,
    bio: artistData.bio || '',
    avatar: artistData.avatar || '',
  } : undefined;

  return (
    <Dialog open={!!artist} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier l'artiste</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'artiste.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ArtistForm
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
            onCancel={() => onOpenChange(false)}
            defaultValues={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}