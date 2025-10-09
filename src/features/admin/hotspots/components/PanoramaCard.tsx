import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MapPin } from 'lucide-react';
import type { PanoramaForAdmin } from '@/types/pano.type';

interface PanoramaCardProps {
  panorama: PanoramaForAdmin;
  onSelect: (panorama: PanoramaForAdmin) => void;
}

export function PanoramaCard({ panorama, onSelect }: PanoramaCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="aspect-video bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
          <img
            src={panorama.imageUrl}
            alt={panorama.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1 mr-2">
            {panorama.title}
          </h3>
          <Badge variant="secondary">
            {panorama.roomType === 'MODERN_ART' ? 'Art Moderne' : 'Histoire'}
          </Badge>
        </div>
        
        {panorama.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {panorama.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{panorama.hotspotsCount} hotspots</span>
          </div>
          <span>
            {new Date(panorama.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onSelect(panorama)}
          className="w-full flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Gérer les hotspots
        </Button>
      </CardFooter>
    </Card>
  );
}