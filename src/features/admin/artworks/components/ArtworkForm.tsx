import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArtistSearch } from './ArtistSearch';
import { artworkFormSchema, type ArtworkFormValues } from '../validations/artwork.schema';
import type { Artist } from '@/types/artist.type';

interface ArtworkFormProps {
  onSubmit: (data: ArtworkFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  defaultValues?: Partial<ArtworkFormValues>;
  selectedArtist?: Artist | null;
  onArtistSelect: (artist: Artist | null) => void;
}

export function ArtworkForm({ 
  onSubmit, 
  isSubmitting, 
  onCancel, 
  defaultValues,
  selectedArtist,
  onArtistSelect 
}: ArtworkFormProps) {
  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues: defaultValues || {
      title: '',
      artistId: '',
      roomType: undefined,
    },
  });

  // Mettre à jour artistId quand un artiste est sélectionné
  const handleArtistSelect = (artist: Artist | null) => {
    onArtistSelect(artist);
    form.setValue('artistId', artist?.id || '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de l'œuvre *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Titre de l'œuvre d'art..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Recherche d'artiste */}
        <ArtistSearch
          selectedArtist={selectedArtist ?? null}
          onArtistSelect={handleArtistSelect}
        />

        {/* Champ caché pour artistId */}
        <FormField
          control={form.control}
          name="artistId"
          render={({ field }) => (
            <Input type="hidden" {...field} />
          )}
        />

        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de salle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de salle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MODERN_ART">Art Moderne</SelectItem>
                  <SelectItem value="HISTORY">Histoire</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}