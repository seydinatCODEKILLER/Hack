export type RoomType = 'MODERN_ART' | 'HISTORY';
export type TranslationStatus = 'draft' | 'published';

export const Lang = {
  FR: 'FR',
  EN: 'EN',
  WO: 'WO'
} as const;

export type Lang = typeof Lang[keyof typeof Lang];

export const MediaType = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];

export interface ArtworkMedia {
  id: string;
  artworkId: string;
  type: MediaType;
  url: string;
  createdAt: string;
}

export interface ArtworkMediaFormData {
  type: MediaType;
  file: File;
}
export interface Artist {
  id: string;
  nom: string;
  prenom: string;
  bio?: string;
  avatar?: string;
  date_creation: string;
  statut: 'actif' | 'inactif';
}

export interface ArtworkTranslation {
  id: string;
  lang: Lang;
  title?: string;
  description: string;
  status: TranslationStatus;
}

export interface ArtworkMedia {
  id: string;
  type: MediaType;
  url: string;
}

export interface Artwork {
  id: string;
  title: string;
  qrCode: string;
  qrCodeImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  artistId: string;
  artist: Artist;
  roomType?: RoomType;
  viewCount: number;
  lastViewedAt?: string;
  
  translations: ArtworkTranslation[];
  media: ArtworkMedia[];
}

export interface ArtworkListResponse {
  artworks: Artwork[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ArtworkFormData {
  title: string;
  artistId: string;
  roomType?: 'MODERN_ART' | 'HISTORY';
}