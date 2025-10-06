import { useParams } from 'react-router-dom';
import { useArtwork } from '../hooks/useArtwork';
import { ArtworkHero } from '../components/ArtworkHero';
import { ArtistInfo } from '../components/ArtistInfo';
import { MediaGallery } from '../components/MediaGallery';
import { Translations } from '../components/Translations';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useArtworkPageTitle } from '@/hooks/usePageTitle';

export default function ArtworkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: artwork, isLoading, error } = useArtwork(id!);

  useArtworkPageTitle(artwork?.title);

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Œuvre non trouvée</h1>
          <Button onClick={() => navigate('/gallery')}>
            Retour à la galerie
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !artwork) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 pt-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/gallery')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la galerie
        </Button>
      </div>

      {/* Hero Section avec l'image */}
      <ArtworkHero artwork={artwork} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Translations */}
            <Translations artwork={artwork} />

            {/* Media Gallery */}
            <MediaGallery artwork={artwork} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations de l'artiste */}
            <ArtistInfo artist={artwork.artist} />

            {/* Informations supplémentaires */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type de salle:</span>
                  <span>
                    {artwork.roomType === 'MODERN_ART' ? 'Art Moderne' : 
                     artwork.roomType === 'HISTORY' ? 'Histoire' : 'Non classé'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vues:</span>
                  <span>{artwork.viewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ajoutée le:</span>
                  <span>{new Date(artwork.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}