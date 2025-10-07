import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit2, Trash2, RotateCcw, QrCode } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';

interface ArtworkCardProps {
  artwork: Artwork;
  onEdit: () => void;
  onDeactivate: () => void;
  onRestore: () => void;
  isDeactivating?: boolean;
  isRestoring?: boolean;
}

export function ArtworkCard({
  artwork,
  onEdit,
  onDeactivate,
  onRestore,
  isDeactivating,
  isRestoring,
}: ArtworkCardProps) {
  const isActive = artwork.isActive;
  const artistInitials = `${artwork.artist.prenom.charAt(0)}${artwork.artist.nom.charAt(0)}`.toUpperCase();

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 ${
        !isActive ? 'opacity-60' : ''
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1 mr-2">
            {artwork.title}
          </h3>
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? 'Actif' : 'Inactif'}
          </Badge>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
          <Avatar className="w-8 h-8">
            {artwork.artist.avatar && (
              <AvatarImage
                src={artwork.artist.avatar}
                alt={`${artwork.artist.prenom} ${artwork.artist.nom}`}
              />
            )}
            <AvatarFallback className="text-xs">{artistInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {artwork.artist.prenom} {artwork.artist.nom}
            </p>
            <p className="text-xs text-muted-foreground">
              {artwork.roomType === 'MODERN_ART'
                ? 'Art Moderne'
                : artwork.roomType === 'HISTORY'
                ? 'Histoire'
                : 'Non classé'}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Vues:</span>
            <span>{artwork.viewCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Créée le:</span>
            <span>{new Date(artwork.createdAt).toLocaleDateString('fr-FR')}</span>
          </div>
          {artwork.qrCodeImageUrl && (
            <div className="flex items-center gap-1 text-green-600">
              <QrCode className="w-3 h-3" />
              <span>QR Code généré</span>
            </div>
          )}
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
              className="text-destructive border-destructive hover:bg-destructive hover:text-white cursor-pointer"
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
            className="flex-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Restaurer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
