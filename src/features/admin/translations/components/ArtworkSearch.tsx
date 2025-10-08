import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, X, Palette, Languages } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';
import { useArtworks } from '../../artworks/hooks/useArtworks';

interface ArtworkSearchProps {
  selectedArtwork: Artwork | null;
  onArtworkSelect: (artwork: Artwork | null) => void;
}

export function ArtworkSearch({ selectedArtwork, onArtworkSelect }: ArtworkSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: artworks, isLoading } = useArtworks(1, 10, { search: searchQuery });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSearching(!!searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleArtworkSelect = (artwork: Artwork) => {
    onArtworkSelect(artwork);
    setSearchQuery('');
    setIsSearching(false);
  };

  const clearSelection = () => {
    onArtworkSelect(null);
    setSearchQuery('');
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Rechercher une œuvre</label>
      
      {selectedArtwork ? (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                <Palette className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {selectedArtwork.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Par {selectedArtwork.artist.prenom} {selectedArtwork.artist.nom}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  {selectedArtwork.translations.length} traduction{selectedArtwork.translations.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSelection}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher une œuvre par titre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Résultats de recherche */}
      {isSearching && (
        <div className="border rounded-lg max-h-48 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Recherche en cours...
            </div>
          ) : artworks?.artworks && artworks.artworks.length > 0 ? (
            artworks.artworks.map((artwork) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => handleArtworkSelect(artwork)}
                className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Palette className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {artwork.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Par {artwork.artist.prenom} {artwork.artist.nom}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Languages className="w-3 h-3" />
                        {artwork.translations.length} traduction{artwork.translations.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucune œuvre trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}