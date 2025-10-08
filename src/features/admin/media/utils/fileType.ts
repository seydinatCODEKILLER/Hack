import type { MediaType } from "@/types/artwork.type";

// Fonction utilitaire pour les types MIME acceptés
export function getAcceptType(mediaType: MediaType): string {
  switch (mediaType) {
    case "IMAGE":
      return 'image/jpeg,image/jpg,image/png,image/webp,image/gif';
    case "AUDIO":
      return 'audio/mpeg,audio/wav,audio/ogg,audio/mp3';
    case "VIDEO":
      return 'video/mp4,video/webm,video/ogg';
    default:
      return '*';
  }
}