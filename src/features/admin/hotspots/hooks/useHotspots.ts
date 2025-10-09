import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { panoramasApi } from '@/api/endpoints/panoramas';
import { hotspotsApi } from '@/api/endpoints/hotspots';
import type { HotspotCreateData } from '@/types/pano.type';
import { apiUtils } from '@/utils/apiUtils';

export const useAdminPanoramas = (filters?: { search?: string }) => {
  return useQuery({
    queryKey: ['admin-panoramas', filters],
    queryFn: () => panoramasApi.getAllForAdmin(filters),
  });
};

export const usePanoramaHotspots = (panoramaId: string) => {
  return useQuery({
    queryKey: ['panorama-hotspots', panoramaId],
    queryFn: () => hotspotsApi.getByPanorama(panoramaId),
    enabled: !!panoramaId,
  });
};

export const useCreateHotspot = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: HotspotCreateData) => hotspotsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['panorama-hotspots', variables.panoramaId] });
      toast.success('Hotspot créé avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la création', { description: errorMessage });
    },
  });
};

export const useDeleteHotspot = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (hotspotId: string) => hotspotsApi.delete(hotspotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['panorama-hotspots'] });
      toast.success('Hotspot supprimé avec succès');
    },
    onError: (error: Error) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error('Erreur lors de la suppression', { description: errorMessage });
    },
  });
};