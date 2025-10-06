import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    isAdmin: user?.role === 'admin',
  };
};