export const pageTitles: Record<string, string> = {
  "/": "Hackathon 2024",
  "/gallery": "Galerie",
  "/explore": "Explorer",
  "/login": "Connexion",
  "/admin/dashboard": "Dashboard",
  "/admin/artists": "Gestion des artistes",
  "/artwork/*": "Détails de l'œuvre - Hackathon 2024",
};

export const getDynamicPageTitle = (path: string, data?: { title?: string; name?: string }) => {
  const baseTitle = pageTitles[path] || 'Hackathon 2024';
  
  if (data?.title && path.startsWith('/artwork/')) {
    return `${data.title} - Hackathon 2024`;
  }
  
  if (data?.name && (path.startsWith('/admin/artists/') || path.startsWith('/admin/artwork/'))) {
    return `${data.name} - Hackathon 2024`;
  }
  
  return baseTitle;
};