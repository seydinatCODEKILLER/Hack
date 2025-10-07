import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArtistsFiltersProps {
  filters: {
    search: string;
    statut: string;
  };
  onFiltersChange: (filters: { search: string; statut: string }) => void;
}

export function ArtistsFilters({ filters, onFiltersChange }: ArtistsFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: localSearch,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, onFiltersChange]);

  const handleStatutChange = (statut: string) => {
    onFiltersChange({
      ...filters,
      statut,
    });
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange({
      search: '',
      statut: '',
    });
  };

  const hasActiveFilters = localSearch || filters.statut;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher un artiste..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.statut} onValueChange={handleStatutChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="actif">Actif</SelectItem>
          <SelectItem value="inactif">Inactif</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      )}
    </div>
  );
}