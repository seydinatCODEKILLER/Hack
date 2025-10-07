export interface Artist {
  id: string;
  nom: string;
  prenom: string;
  bio?: string;
  avatar?: string;
  date_creation: string;
  statut: 'actif' | 'inactif';
  artworksCount?: number;
}

export interface ArtistListResponse {
  artists: Artist[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ArtistFormData {
  nom: string;
  prenom: string;
  bio?: string;
  avatar?: File | string;
}