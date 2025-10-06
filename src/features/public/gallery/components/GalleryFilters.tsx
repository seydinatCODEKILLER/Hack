import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface GalleryFiltersProps {
  onFiltersChange: (filters: {
    artistSearch: string;
  }) => void;
}

export function GalleryFilters({ onFiltersChange }: GalleryFiltersProps) {
  const [artistSearch, setArtistSearch] = useState('');

  useEffect(() => {
    // Debounce pour éviter trop d'appels API
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        artistSearch,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [artistSearch, onFiltersChange]);

  const clearFilters = () => {
    setArtistSearch('');
  };

  const hasActiveFilters = artistSearch;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
      {/* Recherche par artiste */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher un artiste..."
          value={artistSearch}
          onChange={(e) => setArtistSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Bouton clear */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      )}
    </div>
  );
}