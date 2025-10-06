
export interface ApiUser {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  role: 'admin';
  avatar?: string;
  statut: 'actif' | 'inactif';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: ApiUser;
  token: string;
}
