import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ArtistsHeaderProps {
  onAddArtist: () => void;
}

export function ArtistsHeader({ onAddArtist }: ArtistsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Artistes</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les artistes de votre collection
        </p>
      </div>
      <Button onClick={onAddArtist} className="flex items-center gap-2 hover:cursor-pointer">
        <Plus className="w-4 h-4" />
        Ajouter un artiste
      </Button>
    </div>
  );
}