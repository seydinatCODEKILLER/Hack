import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin";
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      // Si pas authentifié, redirige vers login
      if (!isAuthenticated) {
        navigate("/login", { state: { from: location }, replace: true });
        return;
      }

      // Si rôle requis et rôle incorrect, redirige vers unauthorized
      if (requiredRole && user?.role !== requiredRole) {
        navigate("/unauthorized", { replace: true });
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, navigate, location]);

  // Affiche loader uniquement pendant l'initialisation
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground mt-2">Chargement de la session...</p>
      </div>
    );
  }

  // Dès que isLoading=false et que l'utilisateur est autorisé, on rend le contenu
  return <>{children}</>;
};
