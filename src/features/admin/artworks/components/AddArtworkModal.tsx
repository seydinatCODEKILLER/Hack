import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtworkForm } from './ArtworkForm';
import { useCreateArtwork } from '../hooks/useArtworks';
import type { ArtworkFormValues } from '../validations/artwork.schema';
import type { Artist } from '@/types/artist.type';

interface AddArtworkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddArtworkModal({ open, onOpenChange }: AddArtworkModalProps) {
  const createMutation = useCreateArtwork();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArtworkFormValues) => {
    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync(data);
      setSelectedArtist(null);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSelectedArtist(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter une œuvre</DialogTitle>
          <DialogDescription>
            Créez une nouvelle œuvre et associez-la à un artiste.
          </DialogDescription>
        </DialogHeader>
        <ArtworkForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
          selectedArtist={selectedArtist}
          onArtistSelect={setSelectedArtist}
        />
      </DialogContent>
    </Dialog>
  );
}