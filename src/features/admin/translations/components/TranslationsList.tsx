import { TranslationCard } from './TranslationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtworkTranslations } from '../hooks/useArtworkTranslations';
import { useDeleteArtworkTranslation } from '../hooks/useArtworkTranslations';
import { RefreshCw, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lang, type Artwork } from '@/types/artwork.type';
import type { ArtworkTranslationForAdmin } from '@/types/artwork.type';

interface TranslationsListProps {
  artwork: Artwork;
  onEditTranslation: (translation: ArtworkTranslationForAdmin) => void;
  onDeleteTranslation: (translation: ArtworkTranslationForAdmin) => void;
}

export function TranslationsList({ artwork, onEditTranslation, onDeleteTranslation }: TranslationsListProps) {
  const { data: translations, isLoading, error, refetch } = useArtworkTranslations(artwork.id);
  const deleteMutation = useDeleteArtworkTranslation();

  const handleDelete = async (translation: ArtworkTranslationForAdmin) => {
    onDeleteTranslation(translation);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Erreur lors du chargement des traductions</p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!translations || translations.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Languages className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucune traduction</h3>
        <p className="text-muted-foreground mb-4">
          Aucune traduction n'a été ajoutée à cette œuvre pour le moment.
        </p>
      </div>
    );
  }

  // Grouper les traductions par langue
  const translationsByLang = {
    [Lang.FR]: translations.find(t => t.lang === Lang.FR),
    [Lang.EN]: translations.find(t => t.lang === Lang.EN),
    [Lang.WO]: translations.find(t => t.lang === Lang.WO),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(translationsByLang).map(([lang, translation]) => (
          <TranslationCard
            key={lang}
            translation={translation}
            lang={lang as Lang}
            onEdit={() => translation && onEditTranslation(translation)}
            onDelete={() => translation && handleDelete(translation)}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      </div>
    </div>
  );
}