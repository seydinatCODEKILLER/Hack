import { useState } from 'react';
import { PanoramaCard } from '../components/PanoramaCard';
import { PanoramaFilters } from '../components/PanoramaFilters';
import { AdminPanoramaViewer } from '../components/AdminPanoramaViewer';
import { CreateHotspotModal } from '../components/CreateHotspotModal';
import { useAdminPanoramas, usePanoramaHotspots } from '../hooks/useHotspots';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { PanoramaForAdmin } from '@/types/pano.type';

export default function HotspotsManagementPage() {
  const [filters, setFilters] = useState({
    search: '',
  });
  
  const [selectedPanorama, setSelectedPanorama] = useState<PanoramaForAdmin | null>(null);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null);

  const { data: panoramas, isLoading } = useAdminPanoramas(filters);
  const { data: hotspots } = usePanoramaHotspots(selectedPanorama?.id || '');

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handlePositionClick = (position: { x: number; y: number }) => {
    setClickedPosition(position);
  };

  const handleCloseViewer = () => {
    setSelectedPanorama(null);
    setClickedPosition(null);
  };

  if (selectedPanorama) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleCloseViewer}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedPanorama.title}</h1>
            <p className="text-muted-foreground">Gestion des hotspots</p>
          </div>
        </div>

        <AdminPanoramaViewer
          panorama={selectedPanorama}
          hotspots={hotspots || []}
          onPositionClick={handlePositionClick}
        />

        <CreateHotspotModal
          open={!!clickedPosition}
          onOpenChange={(open) => !open && setClickedPosition(null)}
          panoramaId={selectedPanorama.id}
          position={clickedPosition}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Hotspots</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les points d'intérêt dans vos panoramas
          </p>
        </div>
      </div>

      <PanoramaFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      ) : panoramas && panoramas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {panoramas.map((panorama) => (
            <PanoramaCard
              key={panorama.id}
              panorama={panorama}
              onSelect={setSelectedPanorama}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {filters.search
              ? 'Aucun panorama trouvé avec ces critères'
              : 'Aucun panorama disponible'}
          </p>
        </div>
      )}
    </div>
  );
}