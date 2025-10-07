import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, RotateCcw } from 'lucide-react';
import type { Artist } from '@/types/artist.type';

interface ArtistCardProps {
  artist: Artist;
  onEdit: () => void;
  onDeactivate: () => void;
  onRestore: () => void;
  isDeactivating?: boolean;
  isRestoring?: boolean;
}

export function ArtistCard({
  artist,
  onEdit,
  onDeactivate,
  onRestore,
  isDeactivating,
  isRestoring,
}: ArtistCardProps) {
  const isActive = artist.statut === 'actif';
  const initials = `${artist.prenom.charAt(0)}${artist.nom.charAt(0)}`.toUpperCase();

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${
      !isActive ? 'opacity-60' : ''
    }`}>
      <CardContent className="p-6">
        {/* Header avec avatar et statut */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2">
            {artist.avatar ? (
              <AvatarImage 
                src={artist.avatar} 
                alt={`${artist.prenom} ${artist.nom}`}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {artist.prenom} {artist.nom}
            </h3>
            <Badge variant={isActive ? "default" : "secondary"} className="mt-1">
              {isActive ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
        </div>

        {/* Bio */}
        {artist.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {artist.bio}
          </p>
        )}

        {/* Date de création */}
        <div className="text-xs text-muted-foreground">
          Ajouté le {new Date(artist.date_creation).toLocaleDateString('fr-FR')}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {isActive ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Modifier
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDeactivate}
              disabled={isDeactivating}
              className="text-destructive border-destructive hover:bg-destructive hover:text-white hover:cursor-pointer"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Désactiver
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onRestore}
            disabled={isRestoring}
            className="flex-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Restaurer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}