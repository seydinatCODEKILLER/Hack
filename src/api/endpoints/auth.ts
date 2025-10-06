import type {
  LoginCredentials,
  LoginResponse,
  ApiUser as User,
} from "@/types/auth.type";
import { apiClient, type ApiResponse } from "@/api/client";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      credentials
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la connexion");
    }

    return response.data.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");

    if (!response.data.success)
      throw new Error(
        response.data.message || "Erreur lors de la récupération du profil"
      );
    return response.data.data;
  },

};
