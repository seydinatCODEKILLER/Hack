import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Image, Music, Video, Download, Eye } from 'lucide-react';
import type { ArtworkMedia } from '@/types/artwork.type';
import { MediaType } from '@/types/artwork.type';

interface MediaCardProps {
  media: ArtworkMedia;
  onDelete: () => void;
  isDeleting?: boolean;
}

export function MediaCard({ media, onDelete, isDeleting }: MediaCardProps) {
  const getMediaIcon = () => {
    switch (media.type) {
      case MediaType.IMAGE:
        return <Image className="w-6 h-6" />;
      case MediaType.AUDIO:
        return <Music className="w-6 h-6" />;
      case MediaType.VIDEO:
        return <Video className="w-6 h-6" />;
      default:
        return <Image className="w-6 h-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (media.type) {
      case MediaType.IMAGE:
        return 'Image';
      case MediaType.AUDIO:
        return 'Audio';
      case MediaType.VIDEO:
        return 'Vidéo';
      default:
        return 'Média';
    }
  };

  const getTypeColor = () => {
    switch (media.type) {
      case MediaType.IMAGE:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case MediaType.AUDIO:
        return 'bg-green-100 text-green-800 border-green-200';
      case MediaType.VIDEO:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileExtension = (url: string) => {
    return url.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const isImage = media.type === MediaType.IMAGE;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        {/* Preview du média */}
        <div className="aspect-square bg-muted/30 relative group">
          {isImage ? (
            <img
              src={media.url}
              alt={`Média ${media.id}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                  {getMediaIcon()}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getFileExtension(media.url)}
                </Badge>
              </div>
            </div>
          )}
          
          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                asChild
              >
                <a href={media.url} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-3 h-3 mr-1" />
                  Voir
                </a>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                asChild
              >
                <a href={media.url} download>
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-3">
        {/* Informations du média */}
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className={getTypeColor()}>
            {getTypeLabel()}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('fr-FR')}
          </span>
        </div>

        {/* Actions */}
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          {isDeleting ? 'Suppression...' : 'Supprimer'}
        </Button>
      </CardFooter>
    </Card>
  );
}