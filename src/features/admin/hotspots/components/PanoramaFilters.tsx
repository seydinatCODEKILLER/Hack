import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PanoramaFiltersProps {
  filters: {
    search: string;
  };
  onFiltersChange: (filters: { search: string;  }) => void;
}

export function PanoramaFilters({ filters, onFiltersChange }: PanoramaFiltersProps) {
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


  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange({
      search: '',
    });
  };


  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un panorama..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>


        {filters.search && (
          <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Effacer les filtres
          </Button>
        )}
      </div>
    </div>
  );
}