import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { LoginCredentials, LoginResponse } from "@/types/auth.type";
import { authApi } from "@/api/endpoints/auth";
import { apiUtils } from "@/utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { redirectToDashboard } from "../utils/roleUtils";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),

    onSuccess: (data) => {
      setUser(data);
      toast.success("Connexion réussie", {
        description: `Bienvenue ${data.user.prenom} !`,
      });
      redirectToDashboard(data.user.role, navigate);
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error("Erreur de connexion", {
        description: errorMessage,
      });
    },
  });
};
