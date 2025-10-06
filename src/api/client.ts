import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: 'https://api-hackthon.onrender.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};
    const currentPath = window.location.pathname;
    const isAdminArea = currentPath.startsWith('/admin'); // 🔒 à adapter selon ton routing
    const { logout } = useAuthStore.getState();

    // 🌐 Erreurs réseau ou timeout
    if (!error.response) {
      toast.warning('Connexion lente ou serveur injoignable', {
        description: 'Veuillez vérifier votre connexion internet.',
      });
      return Promise.reject(error);
    }

    // 🚫 Non autorisé
    if (status === 401) {
      // Si on est dans l’espace public → on ne fait rien
      if (!isAdminArea) {
        console.warn('401 intercepté côté public — ignoré');
        return Promise.reject(error);
      }

      // Si admin connecté → on le déconnecte proprement
      if (useAuthStore.getState().isAuthenticated) {
        logout('Votre session a expiré. Veuillez vous reconnecter.');
      }

      // Redirection uniquement si on est bien dans l’espace admin
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }

      return Promise.reject(error);
    }

    // ❌ Accès refusé
    if (status === 403) {
      const errorMessage = data?.message || 'Accès interdit.';
      toast.error('Accès refusé', { description: errorMessage });
    }

    // 🧾 Erreurs de validation
    if (status === 422 && data?.errors) {
      const errorMessages = Object.values(data.errors).flat().join(', ');
      toast.error('Erreur de validation', { description: errorMessages });
    }

    // 💥 Erreurs serveur
    if (status >= 500) {
      const errorMessage = data?.message || 'Une erreur serveur est survenue.';
      toast.error('Erreur serveur', { description: errorMessage });
    }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    pageSize: number;
  };
}