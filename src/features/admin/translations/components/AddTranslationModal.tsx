import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TranslationForm } from './TranslationForm';
import { useCreateArtworkTranslation } from '../hooks/useArtworkTranslations';
import type { TranslationFormValues } from '../validations/translation.schema';
import type { Artwork } from '@/types/artwork.type';

interface AddTranslationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedArtwork: Artwork | null;
}

export function AddTranslationModal({ open, onOpenChange, selectedArtwork }: AddTranslationModalProps) {
  const createMutation = useCreateArtworkTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TranslationFormValues) => {
    if (!selectedArtwork) return;

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        artworkId: selectedArtwork.id,
        data,
      });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une traduction</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle traduction pour l'œuvre "{selectedArtwork?.title}"
          </DialogDescription>
        </DialogHeader>
        <TranslationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
          mode="create"
        />
      </DialogContent>
    </Dialog>
  );
}