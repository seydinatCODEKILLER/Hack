import type { Artwork } from "./artwork.type";
import type { Hotspot, Panorama } from "./panorama.types";

// Extension des types panorama
export interface PanoramaForAdmin extends Panorama {
  hotspotsCount: number;
}

export interface HotspotCreateData {
  panoramaId: string;
  x: number;
  y: number;
  targetType: 'PANORAMA' | 'ARTWORK';
  targetId: string;
  label?: string;
  hotspotType: 'NAVIGATION' | 'ARTWORK' | 'INFO';
  artworkId?: string;
}

export interface HotspotWithDetails extends Hotspot {
  panorama: Panorama;
  artwork?: Artwork;
}