import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, initialized } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    initialized,
    isAdmin: user?.role === 'admin',
  };
};