import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/api/endpoints/auth";
import { toast } from "sonner";
import type { ApiUser, LoginResponse } from "@/types/auth.type";

interface AuthStore {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (data: LoginResponse) => void;
  logout: (reason?: string) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (data: LoginResponse) => {
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: (reason?: string) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        if (reason) toast.error(reason);
        else toast.info("Déconnexion réussie");
      },

      initializeAuth: async () => {
  const { token } = get();

  if (!token) {
    set({ isAuthenticated: false, isLoading: false });
    return;
  }

  const isAdminRoute = window.location.pathname.startsWith("/admin");
  if (isAdminRoute) {
    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      get().logout("Session expirée. Veuillez vous reconnecter.");
      set({ isLoading: false });
    }
  } else {
    set({ isAuthenticated: false, isLoading: false });
  }
}

,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state, error) => {
              if (error) {
                console.error("Auth rehydration error", error);
              }
              if (state?.token) {
                state.isAuthenticated = true;
                state.isLoading = false;
              }
            },
    })
);
