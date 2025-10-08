import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';

interface ArtworkMediaHeaderProps {
  onAddMedia: () => void;
  selectedArtwork: Artwork | null;
}

export function ArtworkMediaHeader({ onAddMedia, selectedArtwork }: ArtworkMediaHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Médias</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les médias associés aux œuvres
        </p>
        {selectedArtwork && (
          <p className="text-sm text-primary mt-1">
            Œuvre sélectionnée : <strong>{selectedArtwork.title}</strong>
          </p>
        )}
      </div>
      <Button 
        onClick={onAddMedia} 
        className="flex items-center gap-2"
        disabled={!selectedArtwork}
      >
        <Plus className="w-4 h-4" />
        Ajouter un média
      </Button>
    </div>
  );
}