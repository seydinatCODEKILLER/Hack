import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};