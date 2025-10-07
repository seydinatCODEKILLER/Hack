import { ArtistCard } from "./ArtistCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtists } from "../hooks/useArtists";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Artist } from "@/types/artist.type";
import { PaginationControls } from "@/components/shared/PaginationControls";

interface ArtistsGridProps {
  page: number;
  filters: {
    search: string;
    statut: string;
  };
  onPageChange: (page: number) => void;
  onEditArtist: (artist: Artist) => void;
  onDeactivateArtist: (artist: Artist) => void;
  onRestoreArtist: (artist: Artist) => void;
}

export function ArtistsGrid({
  page,
  filters,
  onPageChange,
  onEditArtist,
  onDeactivateArtist,
  onRestoreArtist,
}: ArtistsGridProps) {
  const { data, isLoading, error, refetch } = useArtists(page, 12, filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des artistes
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!data?.artists || data.artists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filters.search || filters.statut
            ? "Aucun artiste trouvé avec ces critères"
            : "Aucun artiste enregistré"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onEdit={() => onEditArtist(artist)}
            onDeactivate={() => onDeactivateArtist(artist)} // ❗ juste notification
            onRestore={() => onRestoreArtist(artist)} // ❗ juste notification
          />
        ))}
      </div>

      {data.pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationControls
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
