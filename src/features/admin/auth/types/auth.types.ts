import type { ApiUser } from "@/api/types/auth.type";
export interface AuthState {
  user: ApiUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
}
