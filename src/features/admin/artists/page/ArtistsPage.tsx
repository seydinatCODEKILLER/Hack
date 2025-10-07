import { useState } from "react";
import { ArtistsHeader } from "../components/ArtistsHeader";
import { ArtistsFilters } from "../components/ArtistsFilters";
import { ArtistsGrid } from "../components/ArtistsGrid";
import { AddArtistModal } from "../components/AddArtistModal";
import { EditArtistModal } from "../components/EditArtistModal";
import type { Artist } from "@/types/artist.type";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useDeactivateArtist, useRestoreArtist } from "../hooks/useArtists";

export default function ArtistsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    statut: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [artistToDeactivate, setArtistToDeactivate] = useState<Artist | null>(
    null
  );
  const [artistToRestore, setArtistToRestore] = useState<Artist | null>(null);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleEditArtist = (artist: Artist) => {
    setEditingArtist(artist);
  };

  const deactivateMutation = useDeactivateArtist();
  const restoreMutation = useRestoreArtist();

  const handleConfirmDeactivate = async () => {
    if (artistToDeactivate) {
      await deactivateMutation.mutateAsync(artistToDeactivate.id);
      setArtistToDeactivate(null);
    }
  };

  const handleConfirmRestore = async () => {
    if (artistToRestore) {
      await restoreMutation.mutateAsync(artistToRestore.id);
      setArtistToRestore(null);
    }
  };

  const handleDeactivateArtist = (artist: Artist) => {
    setArtistToDeactivate(artist);
  };

  const handleRestoreArtist = (artist: Artist) => {
    setArtistToRestore(artist);
  };

  return (
    <div className="space-y-6">
      <ArtistsHeader onAddArtist={() => setIsAddModalOpen(true)} />

      <ArtistsFilters filters={filters} onFiltersChange={handleFiltersChange} />

      <ArtistsGrid
        page={page}
        filters={filters}
        onPageChange={setPage}
        onEditArtist={handleEditArtist}
        onDeactivateArtist={handleDeactivateArtist}
        onRestoreArtist={handleRestoreArtist}
      />

      {/* Modals */}
      <AddArtistModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      <EditArtistModal
        artist={editingArtist}
        onOpenChange={(open) => !open && setEditingArtist(null)}
      />

      <ConfirmationModal
        open={!!artistToDeactivate}
        onOpenChange={(open) => !open && setArtistToDeactivate(null)}
        onConfirm={handleConfirmDeactivate}
        isPending={deactivateMutation.isPending}
        title="Désactiver l'artiste"
        description={`Êtes-vous sûr de vouloir désactiver ${artistToDeactivate?.prenom} ${artistToDeactivate?.nom} ? Cette action le rendra invisible aux visiteurs.`}
      />

      <ConfirmationModal
        open={!!artistToRestore}
        onOpenChange={(open) => !open && setArtistToRestore(null)}
        onConfirm={handleConfirmRestore}
        isPending={restoreMutation.isPending}
        title="Restaurer l'artiste"
        description={`Êtes-vous sûr de vouloir restaurer ${artistToRestore?.prenom} ${artistToRestore?.nom} ? Il redeviendra visible aux visiteurs.`}
      />
    </div>
  );
}
