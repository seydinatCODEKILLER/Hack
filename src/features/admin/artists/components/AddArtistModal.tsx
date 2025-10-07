import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtistForm } from './ArtistForm';
import { useCreateArtist } from '../hooks/useArtists';
import type { ArtistFormValues } from '../validations/artist.schema';

interface AddArtistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddArtistModal({ open, onOpenChange }: AddArtistModalProps) {
  const createMutation = useCreateArtist();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArtistFormValues) => {
    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync(data);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un artiste</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer un nouveau profil d'artiste.
          </DialogDescription>
        </DialogHeader>
        <ArtistForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}