import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useCreateHotspot } from '../hooks/useHotspots';
import { useArtworks } from '@/features/admin/artworks/hooks/useArtworks';
import { useAdminPanoramas } from '../hooks/useHotspots';
import { Search } from 'lucide-react';
import type { Artwork } from '@/types/artwork.type';
import type { HotspotCreateData } from '@/types/pano.type';
import { toast } from 'sonner';

interface CreateHotspotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panoramaId: string;
  position: { x: number; y: number } | null;
}

export function CreateHotspotModal({ 
  open, 
  onOpenChange, 
  panoramaId, 
  position 
}: CreateHotspotModalProps) {
  const createMutation = useCreateHotspot();
  const [formData, setFormData] = useState<Partial<HotspotCreateData>>({
    targetType: 'PANORAMA', // Par défaut vers le panorama actuel
    hotspotType: 'INFO',
    label: '',
  });

  // États pour les recherches
  const [artworkSearch, setArtworkSearch] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedTargetPanorama, setSelectedTargetPanorama] = useState<string>(panoramaId);

  // Données pour les selects
  const { data: artworks } = useArtworks(1, 10, { search: artworkSearch });
  const { data: panoramas } = useAdminPanoramas();

  // Réinitialiser quand le modal s'ouvre
  useEffect(() => {
    if (open) {
      setFormData({
        targetType: 'PANORAMA',
        hotspotType: 'INFO',
        label: '',
      });
      setSelectedArtwork(null);
      setSelectedTargetPanorama(panoramaId);
      setArtworkSearch('');
    }
  }, [open, panoramaId]);

  // Déduire le targetType du hotspotType
  useEffect(() => {
    if (formData.hotspotType === 'ARTWORK') {
      setFormData(prev => ({ ...prev, targetType: 'ARTWORK' }));
    } else if (formData.hotspotType === 'NAVIGATION') {
      setFormData(prev => ({ ...prev, targetType: 'PANORAMA' }));
    } else {
      // Pour INFO, on peut garder PANORAMA ou ARTWORK selon le besoin
      setFormData(prev => ({ ...prev, targetType: 'PANORAMA' }));
    }
  }, [formData.hotspotType]);

  const normalizeLongitude = (lon: number) => {
  let normalized = lon % 360;
  if (normalized > 180) normalized -= 360;
  if (normalized < -180) normalized += 360;
  return normalized;
};

const normalizeLatitude = (lat: number) => {
  return Math.max(-90, Math.min(90, lat));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!position) return;

    // Validation selon le type
    if (formData.hotspotType === 'ARTWORK' && !selectedArtwork) {
      toast.error("Veuillez sélectionner une œuvre");
      return;
    }

    if (formData.hotspotType === 'NAVIGATION' && !selectedTargetPanorama) {
      toast.error("Veuillez sélectionner une panorama");
      return;
    }

    // Déterminer le targetId
    let targetId: string;
    if (formData.hotspotType === 'ARTWORK') {
      targetId = selectedArtwork!.id;
    } else if (formData.hotspotType === 'NAVIGATION') {
      targetId = selectedTargetPanorama;
    } else {
      // Pour INFO, on utilise le panorama actuel
      targetId = panoramaId;
    }

    const submitData: HotspotCreateData = {
      panoramaId,
      x: normalizeLongitude(position.x),
      y: normalizeLatitude(position.y),
      targetType: formData.targetType!,
      targetId,
      label: formData.label || undefined,
      hotspotType: formData.hotspotType!,
    };

    await createMutation.mutateAsync(submitData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const isFormValid = () => {
    if (formData.hotspotType === 'ARTWORK') return !!selectedArtwork;
    if (formData.hotspotType === 'NAVIGATION') return !!selectedTargetPanorama;
    return true; // INFO est toujours valide
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un hotspot</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Position */}
          {position && (
            <div className="grid grid-cols-2 gap-4 text-sm p-3 bg-muted/30 rounded-lg">
              <div>
                <Label className="text-xs">Position X</Label>
                <div className="text-sm font-medium">{position.x.toFixed(2)}°</div>
              </div>
              <div>
                <Label className="text-xs">Position Y</Label>
                <div className="text-sm font-medium">{position.y.toFixed(2)}°</div>
              </div>
            </div>
          )}

          {/* Type de hotspot */}
          <div>
            <Label>Type de hotspot *</Label>
            <Select
              value={formData.hotspotType}
              onValueChange={(value: 'NAVIGATION' | 'ARTWORK' | 'INFO') =>
                setFormData(prev => ({ ...prev, hotspotType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INFO">📍 Information</SelectItem>
                <SelectItem value="ARTWORK">🖼️ Œuvre d'art</SelectItem>
                <SelectItem value="NAVIGATION">🚪 Navigation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sélection d'œuvre pour ARTWORK */}
          {formData.hotspotType === 'ARTWORK' && (
            <div>
              <Label>Œuvre cible *</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher une œuvre..."
                    value={artworkSearch}
                    onChange={(e) => setArtworkSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {selectedArtwork ? (
                  <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{selectedArtwork.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedArtwork.artist?.prenom} {selectedArtwork.artist?.nom}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedArtwork(null)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ) : artworks?.artworks && artworks.artworks.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto border rounded-lg">
                    {artworks.artworks.map((artwork) => (
                      <button
                        key={artwork.id}
                        type="button"
                        onClick={() => setSelectedArtwork(artwork)}
                        className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0"
                      >
                        <p className="font-medium text-sm">{artwork.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {artwork.artist?.prenom} {artwork.artist?.nom}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : artworkSearch ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Aucune œuvre trouvée
                  </p>
                ) : null}
              </div>
            </div>
          )}

          {/* Sélection de panorama pour NAVIGATION */}
          {formData.hotspotType === 'NAVIGATION' && (
            <div>
              <Label>Panorama cible *</Label>
              <Select
                value={selectedTargetPanorama}
                onValueChange={setSelectedTargetPanorama}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {panoramas?.map((panorama) => (
                    <SelectItem key={panorama.id} value={panorama.id}>
                      {panorama.title} 
                      <span className="text-muted-foreground ml-2">
                        ({panorama.roomType === 'MODERN_ART' ? 'Art Moderne' : 'Histoire'})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Label optionnel */}
          <div>
            <Label>Label (optionnel)</Label>
            <Input
              placeholder="Texte affiché dans le tooltip..."
              value={formData.label || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Laissez vide pour un label automatique
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={createMutation.isPending}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={createMutation.isPending || !isFormValid()}
            >
              {createMutation.isPending ? 'Création...' : 'Créer le hotspot'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}