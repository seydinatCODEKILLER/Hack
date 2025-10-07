import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, X } from 'lucide-react';
import { useArtists } from '@/features/admin/artists/hooks/useArtists';
import type { Artist } from '@/types/artist.type';

interface ArtistSearchProps {
  selectedArtist: Artist | null;
  onArtistSelect: (artist: Artist | null) => void;
}

export function ArtistSearch({ selectedArtist, onArtistSelect }: ArtistSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: artists, isLoading } = useArtists(1, 10, { search: searchQuery });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSearching(!!searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleArtistSelect = (artist: Artist) => {
    onArtistSelect(artist);
    setSearchQuery('');
    setIsSearching(false);
  };

  const clearSelection = () => {
    onArtistSelect(null);
    setSearchQuery('');
  };

  const getInitials = (artist: Artist) => {
    return `${artist.prenom.charAt(0)}${artist.nom.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Artiste *</label>
      
      {selectedArtist ? (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              {selectedArtist.avatar ? (
                <AvatarImage 
                  src={selectedArtist.avatar} 
                  alt={`${selectedArtist.prenom} ${selectedArtist.nom}`}
                />
              ) : null}
              <AvatarFallback className="text-xs">
                {getInitials(selectedArtist)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">
                {selectedArtist.prenom} {selectedArtist.nom}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedArtist.statut === 'actif' ? 'Actif' : 'Inactif'}
              </p>
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
            placeholder="Rechercher un artiste..."
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
          ) : artists?.artists && artists.artists.length > 0 ? (
            artists.artists.map((artist) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => handleArtistSelect(artist)}
                className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    {artist.avatar ? (
                      <AvatarImage 
                        src={artist.avatar} 
                        alt={`${artist.prenom} ${artist.nom}`}
                      />
                    ) : null}
                    <AvatarFallback className="text-xs">
                      {getInitials(artist)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {artist.prenom} {artist.nom}
                    </p>
                    {artist.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {artist.bio}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucun artiste trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}