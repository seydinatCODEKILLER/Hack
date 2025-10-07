import { z } from 'zod';

export const artworkFormSchema = z.object({
  title: z.string()
    .min(1, 'Le titre est requis')
    .max(100, 'Le titre ne doit pas dépasser 100 caractères'),
  artistId: z.string()
    .min(1, 'L\'artiste est requis'),
  roomType: z.enum(['MODERN_ART', 'HISTORY']).optional(),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;