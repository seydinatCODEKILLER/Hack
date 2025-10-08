import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TranslationForm } from './TranslationForm';
import { useUpdateArtworkTranslation } from '../hooks/useArtworkTranslations';
import { Skeleton } from '@/components/ui/skeleton';
import type { TranslationFormValues } from '../validations/translation.schema';
import type { ArtworkTranslationForAdmin } from '@/types/artwork.type';

interface EditTranslationModalProps {
  translation: ArtworkTranslationForAdmin | null;
  onOpenChange: (open: boolean) => void;
}

export function EditTranslationModal({ translation, onOpenChange }: EditTranslationModalProps) {
  const updateMutation = useUpdateArtworkTranslation();

  const handleSubmit = async (data: TranslationFormValues) => {
    if (!translation?.id) return;
    
    try {
      await updateMutation.mutateAsync({
        id: translation.id,
        data,
      });
      onOpenChange(false);
    } catch (error) {
        console.error("Failed to update translation:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const defaultValues = translation ? {
    lang: translation.lang,
    title: translation.title || '',
    description: translation.description,
    status: translation.status,
  } : undefined;

  return (
    <Dialog open={!!translation} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la traduction</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la traduction.
          </DialogDescription>
        </DialogHeader>
        
        {!translation ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <TranslationForm
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
            onCancel={handleCancel}
            defaultValues={defaultValues}
            mode="edit"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}