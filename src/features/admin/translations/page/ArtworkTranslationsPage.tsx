import { useState } from 'react';
import { TranslationsHeader } from '../components/TranslationsHeader';
import { ArtworkSearch } from '../components/ArtworkSearch';
import { TranslationsList } from '../components/TranslationsList';
import { AddTranslationModal } from '../components/AddTranslationModal';
import { EditTranslationModal } from '../components/EditTranslationModal';
import type { Artwork } from '@/types/artwork.type';
import type { ArtworkTranslationForAdmin } from '@/types/artwork.type';
import { useDeleteArtworkTranslation } from '../hooks/useArtworkTranslations';
import { ConfirmationModal } from '@/components/shared/ConfirmationModal';

export default function ArtworkTranslationsPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<ArtworkTranslationForAdmin | null>(null);
  const [translationToDelete, setTranslationToDelete] = useState<ArtworkTranslationForAdmin | null>(null);

  const deleteMutation = useDeleteArtworkTranslation();


  const handleArtworkSelect = (artwork: Artwork | null) => {
    setSelectedArtwork(artwork);
  };

  const handleEditTranslation = (translation: ArtworkTranslationForAdmin) => {
    setEditingTranslation(translation);
  };

  const handleDeleteTranslation = (translation: ArtworkTranslationForAdmin) => {
    setTranslationToDelete(translation);
  };

  return (
    <div className="space-y-6">
      <TranslationsHeader 
        onAddTranslation={() => setIsAddModalOpen(true)}
        selectedArtwork={selectedArtwork}
      />
      
      <ArtworkSearch 
        selectedArtwork={selectedArtwork}
        onArtworkSelect={handleArtworkSelect}
      />

      {selectedArtwork && (
        <TranslationsList
          artwork={selectedArtwork}
          onEditTranslation={handleEditTranslation}
          onDeleteTranslation={handleDeleteTranslation}
        />
      )}

      {/* Modals */}
      <AddTranslationModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        selectedArtwork={selectedArtwork}
      />

      <EditTranslationModal
        translation={editingTranslation}
        onOpenChange={(open) => !open && setEditingTranslation(null)}
      />

      <ConfirmationModal
  open={!!translationToDelete}
  onOpenChange={(open) => !open && setTranslationToDelete(null)}
  onConfirm={async () => {
    if (!translationToDelete) return;

    try {
      await deleteMutation.mutateAsync(translationToDelete.id);
      setTranslationToDelete(null);
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  }}
  title="Supprimer la traduction"
  description="Êtes-vous sûr de vouloir supprimer cette traduction ? Cette action est irréversible."
/>

    </div>
  );
}