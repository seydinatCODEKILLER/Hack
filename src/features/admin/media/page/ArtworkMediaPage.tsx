import { useState } from 'react';
import { ArtworkMediaHeader } from '../components/ArtworkMediaHeader';
import { ArtworkSearch } from '../components/ArtworkSearch';
import { MediaGrid } from '../components/MediaGrid';
import { AddMediaModal } from '../components/AddMediaModal';
import { ConfirmationModal } from '@/components/shared/ConfirmationModal';
import { useDeleteArtworkMedia } from '../hooks/useArtworkMedia';
import type { Artwork, ArtworkMedia } from '@/types/artwork.type';

export default function ArtworkMediaPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<ArtworkMedia | null>(null);

  const deleteMutation = useDeleteArtworkMedia();

  const handleArtworkSelect = (artwork: Artwork | null) => {
    setSelectedArtwork(artwork);
  };

  const handleDeleteMedia = (media: ArtworkMedia) => {
    setMediaToDelete(media); // Ouvre le modal de confirmation
  };

  const confirmDelete = async () => {
    if (!selectedArtwork || !mediaToDelete) return;

    try {
      await deleteMutation.mutateAsync({
        id: mediaToDelete.id,
        artworkId: selectedArtwork.id,
      });
    } finally {
      setMediaToDelete(null); // Ferme le modal
    }
  };

  return (
    <div className="space-y-6">
      <ArtworkMediaHeader 
        onAddMedia={() => setIsAddModalOpen(true)}
        selectedArtwork={selectedArtwork}
      />
      
      <ArtworkSearch 
        selectedArtwork={selectedArtwork}
        onArtworkSelect={handleArtworkSelect}
      />

      {selectedArtwork && (
        <MediaGrid
          artwork={selectedArtwork}
          onDeleteMedia={handleDeleteMedia}
        />
      )}

      {/* Modals */}
      <AddMediaModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        selectedArtwork={selectedArtwork}
      />

      <ConfirmationModal
        open={!!mediaToDelete}
        onOpenChange={(open) => !open && setMediaToDelete(null)}
        onConfirm={confirmDelete}
        title="Supprimer le média"
        description="Êtes-vous sûr de vouloir supprimer ce média ? Cette action est irréversible."
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
