import { TranslationStatus } from '@/types/artwork.type';
import { z } from 'zod';

export const translationFormSchema = z.object({
  lang: z.enum(['FR', 'WO', 'EN']),
  title: z.string()
    .max(100, 'Le titre ne doit pas dépasser 100 caractères')
    .optional()
    .or(z.literal('')),
  description: z.string()
    .min(1, 'La description est requise')
    .max(2000, 'La description ne doit pas dépasser 2000 caractères'),
  status: z.enum([TranslationStatus.DRAFT, TranslationStatus.PUBLISHED]).optional(),
});

export type TranslationFormValues = z.infer<typeof translationFormSchema>;