import type { Artwork, ArtworkMedia } from "@/types/artwork.type";

export const formatArtistName = (artist: { prenom: string; nom: string }): string => {
  return `${artist.prenom} ${artist.nom}`;
};

export const getArtworkImage = (artwork: Artwork): string | null => {
  const imageMedia = artwork.media?.find((media: ArtworkMedia) => media.type === 'IMAGE');
  return imageMedia?.url || null;
};