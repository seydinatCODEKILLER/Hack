import type { Artwork } from "./artwork.type";

export type TargetType = 'PANORAMA' | 'ARTWORK';

export const TargetType = {
  PANORAMA: 'PANORAMA' as TargetType,
  ARTWORK: 'ARTWORK' as TargetType
};

export type HotspotType = 'NAVIGATION' | 'ARTWORK' | 'INFO';

export const HotspotType = {
  NAVIGATION: 'NAVIGATION' as HotspotType,
  ARTWORK: 'ARTWORK' as HotspotType,
  INFO: 'INFO' as HotspotType
};

export interface Hotspot {
  id: string;
  panoramaId: string;
  x: number; // Position horizontale (-180 à 180)
  y: number; // Position verticale (-90 à 90)
  targetType: TargetType;
  targetId: string; // ID de la cible (artworkId ou panoramaId)
  label?: string;
  hotspotType: HotspotType;
  createdAt: string;
}

export interface Panorama {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  roomType: 'MODERN_ART' | 'HISTORY';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hotspots: Hotspot[];
}

export interface PanoramaWithArtworks extends Panorama {
  hotspotsWithData: (Hotspot & {
    artwork?: Artwork;
    targetPanorama?: Panorama;
  })[];
}

export interface PanoramaResponse {
    panoramas: Panorama[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }
}