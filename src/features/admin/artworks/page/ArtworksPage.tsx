import { useState } from 'react';
import { ArtworksHeader } from '../components/ArtworksHeader';
import { ArtworksFilters } from '../components/ArtworksFilters';
import { ArtworksGrid } from '../components/ArtworksGrid';
import { AddArtworkModal } from '../components/AddArtworkModal';
import { EditArtworkModal } from '../components/EditArtworkModal';
import { ConfirmationModal } from '@/components/modal/ConfirmationModal';
import { useDeactivateArtwork, useRestoreArtwork } from '../hooks/useArtworks';
import type { Artwork } from '@/types/artwork.type';

export default function ArtworksPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    artistSearch: '',
    includeInactive: false,
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [artworkToDeactivate, setArtworkToDeactivate] = useState<Artwork | null>(null);
  const [artworkToRestore, setArtworkToRestore] = useState<Artwork | null>(null);

  const deactivateMutation = useDeactivateArtwork();
  const restoreMutation = useRestoreArtwork();

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleEditArtwork = (artwork: Artwork) => setEditingArtwork(artwork);

  const handleDeactivateArtwork = (artwork: Artwork) => setArtworkToDeactivate(artwork);

  const handleRestoreArtwork = (artwork: Artwork) => setArtworkToRestore(artwork);

  const handleConfirmDeactivate = async () => {
    if (!artworkToDeactivate) return;
    await deactivateMutation.mutateAsync(artworkToDeactivate.id);
    setArtworkToDeactivate(null);
  };

  const handleConfirmRestore = async () => {
    if (!artworkToRestore) return;
    await restoreMutation.mutateAsync(artworkToRestore.id);
    setArtworkToRestore(null);
  };

  return (
    <div className="space-y-6">
      <ArtworksHeader onAddArtwork={() => setIsAddModalOpen(true)} />

      <ArtworksFilters filters={filters} onFiltersChange={handleFiltersChange} />

      <ArtworksGrid
        page={page}
        filters={filters}
        onPageChange={setPage}
        onEditArtwork={handleEditArtwork}
        onDeactivateArtwork={handleDeactivateArtwork}
        onRestoreArtwork={handleRestoreArtwork}
        isDeactivating={deactivateMutation.isPending}
        isRestoring={restoreMutation.isPending}
      />

      {/* Modals */}
      <AddArtworkModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      <EditArtworkModal
        artwork={editingArtwork}
        onOpenChange={(open) => !open && setEditingArtwork(null)}
      />

      {/* Désactivation */}
      <ConfirmationModal
        open={!!artworkToDeactivate}
        onOpenChange={(open) => !open && setArtworkToDeactivate(null)}
        onConfirm={handleConfirmDeactivate}
        title="Désactiver l'œuvre"
        description={`Êtes-vous sûr de vouloir désactiver "${artworkToDeactivate?.title}" ?`}
        isPending={deactivateMutation.isPending}
      />

      {/* Restauration */}
      <ConfirmationModal
        open={!!artworkToRestore}
        onOpenChange={(open) => !open && setArtworkToRestore(null)}
        onConfirm={handleConfirmRestore}
        title="Restaurer l'œuvre"
        description={`Êtes-vous sûr de vouloir restaurer "${artworkToRestore?.title}" ?`}
        isPending={restoreMutation.isPending}
      />
    </div>
  );
}
