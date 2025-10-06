import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {  getDynamicPageTitle } from '@/routes/pageTitles';

// Hook pour utiliser le titre de page avec données dynamiques
export const usePageTitle = (dynamicData?: { title?: string; name?: string }) => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const setTitle = () => {
      const path = location.pathname;
      
      // Utiliser la fonction de titre dynamique
      const title = getDynamicPageTitle(path, dynamicData);
      document.title = title;
    };

    setTitle();
  }, [location.pathname, params, dynamicData]);
};

// Hook spécifique pour les pages de détail d'œuvre
export const useArtworkPageTitle = (artworkTitle?: string) => {
  return usePageTitle(artworkTitle ? { title: artworkTitle } : undefined);
};

// Hook spécifique pour les pages d'édition admin
export const useAdminEditPageTitle = (itemName?: string) => {
  return usePageTitle(itemName ? { name: itemName } : undefined);
};