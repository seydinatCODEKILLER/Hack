import { useState } from 'react';
import { PanoramaViewer } from '../components/PanoramaViewer';
import { ArtworkModal } from '../components/ArtworkModal';
import { usePanorama } from '../hooks/usePanorama';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Compass, Navigation } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';

export default function ExplorerPage() {
  const { data: panorama, isLoading, error, refetch } = usePanorama();
  console.log('Panorama chargé :', panorama);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtworkClick = (artwork: Artwork) => {
    console.log('Œuvre sélectionnée :', artwork);
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
          <p className="text-muted-foreground mb-4">
            {error.message || 'Impossible de charger le panorama'}
          </p>
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">
            {panorama?.title || 'Explorer le Musée'}
          </h1>
          <p className="text-muted-foreground">
            {panorama?.description || 'Naviguez dans l\'espace virtuel et découvrez les œuvres'}
          </p>
        </div>
      </div>

      {/* Zone du panorama */}
      <div className="w-full h-[800px] relative">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
        ) : panorama ? (
          <>
            <PanoramaViewer 
              panorama={panorama}
              onArtworkClick={handleArtworkClick}
            />
            
            {/* Indicateur de navigation */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="w-4 h-4" />
                <span>Glissez pour naviguer • Clic sur les points rouges</span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun panorama disponible</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal d'information de l'œuvre */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}