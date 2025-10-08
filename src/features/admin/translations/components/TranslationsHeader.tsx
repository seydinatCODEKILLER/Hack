import { Button } from '@/components/ui/button';
import { Plus, Languages } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';

interface TranslationsHeaderProps {
  onAddTranslation: () => void;
  selectedArtwork: Artwork | null;
}

export function TranslationsHeader({ onAddTranslation, selectedArtwork }: TranslationsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Languages className="w-8 h-8" />
          Gestion des Traductions
        </h1>
        <p className="text-muted-foreground mt-2">
          Gérez les traductions multilingues des œuvres
        </p>
        {selectedArtwork && (
          <p className="text-sm text-primary mt-1">
            Œuvre sélectionnée : <strong>{selectedArtwork.title}</strong>
          </p>
        )}
      </div>
      <Button 
        onClick={onAddTranslation} 
        className="flex items-center gap-2"
        disabled={!selectedArtwork}
      >
        <Plus className="w-4 h-4" />
        Ajouter une traduction
      </Button>
    </div>
  );
}