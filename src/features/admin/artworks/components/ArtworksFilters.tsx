import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArtworksFiltersProps {
  filters: {
    search: string;
    artistSearch: string;
    includeInactive: boolean;
  };
  onFiltersChange: (filters: { search: string; artistSearch: string; includeInactive: boolean }) => void;
}

export function ArtworksFilters({ filters, onFiltersChange }: ArtworksFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [localArtistSearch, setLocalArtistSearch] = useState(filters.artistSearch);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: localSearch,
        artistSearch: localArtistSearch,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, localArtistSearch, onFiltersChange]);

  const handleIncludeInactiveChange = (includeInactive: boolean) => {
    onFiltersChange({
      ...filters,
      includeInactive,
    });
  };

  const clearFilters = () => {
    setLocalSearch('');
    setLocalArtistSearch('');
    onFiltersChange({
      search: '',
      artistSearch: '',
      includeInactive: false,
    });
  };

  const hasActiveFilters = localSearch || localArtistSearch || filters.includeInactive;

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher une œuvre..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher par artiste..."
            value={localArtistSearch}
            onChange={(e) => setLocalArtistSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="include-inactive" className="flex-1">
            Inclure les œuvres inactives
          </Label>
          <Switch
            id="include-inactive"
            checked={filters.includeInactive}
            onCheckedChange={handleIncludeInactiveChange}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={clearFilters} size="sm">
            <X className="w-4 h-4 mr-2" />
            Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  );
}