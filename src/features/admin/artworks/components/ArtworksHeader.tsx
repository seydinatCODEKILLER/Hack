import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ArtworksHeaderProps {
  onAddArtwork: () => void;
}

export function ArtworksHeader({ onAddArtwork }: ArtworksHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Œuvres</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les œuvres de votre collection
        </p>
      </div>
      <Button onClick={onAddArtwork} className="flex items-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4" />
        Ajouter une œuvre
      </Button>
    </div>
  );
}