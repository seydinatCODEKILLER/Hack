import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const artistFormSchema = z.object({
  nom: z
    .string()
    .min(1, 'Le nom est requis')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  prenom: z
    .string()
    .min(1, 'Le prénom est requis')
    .max(50, 'Le prénom ne doit pas dépasser 50 caractères'),
  bio: z
    .string()
    .max(500, 'La biographie ne doit pas dépasser 500 caractères')
    .optional()
    .or(z.literal('')),

  avatar: z
    .union([
      z.instanceof(File),
      z.string().optional(), // autorise une URL existante
    ])
    .optional()
    .refine(
      (value) =>
        !value ||
        typeof value === 'string' ||
        (value instanceof File && value.size <= MAX_FILE_SIZE),
      'La taille de l\'image ne doit pas dépasser 5MB'
    )
    .refine(
      (value) =>
        !value ||
        typeof value === 'string' ||
        (value instanceof File && ACCEPTED_IMAGE_TYPES.includes(value.type)),
      'Format d\'image non supporté (JPEG, PNG, WEBP)'
    ),
});

export type ArtistFormValues = z.infer<typeof artistFormSchema>;
