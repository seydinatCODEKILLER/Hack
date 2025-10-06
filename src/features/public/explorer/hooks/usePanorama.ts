import { useQuery } from '@tanstack/react-query';
import { panoramasApi } from '@/api/endpoints/panoramas';
import { artworksApi } from '@/api/endpoints/artworks';
import type { Panorama, PanoramaWithArtworks } from '@/types/panorama.types';

// Fonction pour enrichir les hotspots avec les données des œuvres
const enrichPanoramaWithArtworks = async (panorama: Panorama): Promise<PanoramaWithArtworks> => {
  // Vérifier que les hotspots existent
  if (!panorama.hotspots) {
    return {
      ...panorama,
      hotspotsWithData: []
    };
  }

  // Enrichir chaque hotspot avec les données de l'œuvre
  const hotspotsWithData = await Promise.all(
    panorama.hotspots.map(async (hotspot) => {
      // Si c'est un hotspot d'œuvre, récupérer les données de l'œuvre
      if (hotspot.hotspotType === 'ARTWORK' && hotspot.targetType === 'ARTWORK') {
        try {
          const artwork = await artworksApi.getById(hotspot.targetId);
          return {
            ...hotspot,
            artwork
          };
        } catch (error) {
          console.error(`Erreur lors du chargement de l'œuvre ${hotspot.targetId}:`, error);
          return hotspot;
        }
      }
      
      // Pour les autres types de hotspots, retourner tel quel
      return hotspot;
    })
  );

  return {
    ...panorama,
    hotspotsWithData
  };
};

export const usePanorama = (id?: string) => {
  return useQuery({
    queryKey: ['panorama', id || 'first-active'],
    queryFn: async () => {
      // Récupérer le panorama de base
      const panorama = id 
        ? await panoramasApi.getById(id)
        : await panoramasApi.getFirstActive();

      console.log('Panorama brut de l\'API:', panorama);
      
      // Enrichir avec les données des œuvres
      const enrichedPanorama = await enrichPanoramaWithArtworks(panorama);
      
      console.log('Panorama enrichi:', enrichedPanorama);
      return enrichedPanorama;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useAllPanoramas = () => {
  return useQuery({
    queryKey: ['panoramas'],
    queryFn: async () => {
      const response = await panoramasApi.getAll();
      // Enrichir tous les panoramas
      const enrichedPanoramas = await Promise.all(
        response.map(panorama => enrichPanoramaWithArtworks(panorama))
      );
      return enrichedPanoramas;
    },
    staleTime: 10 * 60 * 1000,
  });
};