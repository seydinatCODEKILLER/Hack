import { z } from 'zod';

export const mediaFormSchema = z.object({
  type: z.enum(['AUDIO', 'IMAGE', 'VIDEO']),
  file: z.instanceof(File, {
    message: 'Un fichier est requis',
  }).refine(
    (file) => {
      if (!file) return false;
      return file.size <= 50 * 1024 * 1024;
    },
    {
      message: 'Le fichier ne doit pas dépasser 50MB',
    }
  ),
});

export type MediaFormValues = z.infer<typeof mediaFormSchema>;