import type { ApiResponse } from "@/api/client";
import axios, { AxiosError } from "axios";

export const apiUtils = {
  /**
   * Gestion centralisée des erreurs API
   */
  handleApiError: (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      
      // Priorité : message de l'API, sinon Axios message
      return (
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Une erreur est survenue"
      );
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Une erreur inconnue est survenue";
  },

  /**
   * Validation type-safe de la réponse API
   */
  validateResponse: <T>(response: unknown): response is ApiResponse<T> => {
    return (
      typeof response === "object" &&
      response !== null &&
      "success" in (response as Record<string, unknown>)
    );
  },

  /**
   * Génération de query params pour filtrage/pagination
   */
  buildQueryParams: (params: Record<string, unknown>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") return;

      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  },
};
