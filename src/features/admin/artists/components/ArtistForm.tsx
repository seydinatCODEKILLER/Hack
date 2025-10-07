import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { artistFormSchema, type ArtistFormValues } from '../validations/artist.schema';

interface ArtistFormProps {
  onSubmit: (data: ArtistFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  defaultValues?: Partial<ArtistFormValues>;
}

export function ArtistForm({ onSubmit, isSubmitting, onCancel, defaultValues }: ArtistFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValues?.avatar && typeof defaultValues.avatar === 'string'
      ? defaultValues.avatar
      : null
  );

  const form = useForm<ArtistFormValues>({
    resolver: zodResolver(artistFormSchema),
    defaultValues: defaultValues || {
      nom: '',
      prenom: '',
      bio: '',
      avatar: '',
    },
  });

  /** 🔹 Gestion du changement de fichier */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('avatar', file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  /** 🔹 Suppression de l'image */
  const handleRemoveImage = () => {
    form.setValue('avatar', '');
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /** 🔹 Génération des initiales */
  const getInitials = (prenom = '', nom = '') => `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

  const currentAvatar = form.watch('avatar');
  const currentPrenom = form.watch('prenom');
  const currentNom = form.watch('nom');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* === Avatar === */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt="Preview avatar" className="object-cover" />
              ) : defaultValues?.avatar && typeof defaultValues.avatar === 'string' ? (
                <AvatarImage src={defaultValues.avatar} alt="Avatar actuel" className="object-cover" />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {getInitials(currentPrenom, currentNom)}
              </AvatarFallback>
            </Avatar>

            {(previewUrl || (currentAvatar && typeof currentAvatar !== 'string')) && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="text-center">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {previewUrl || currentAvatar ? "Changer l'image" : 'Ajouter une image'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">JPEG, PNG, WebP - 5MB max</p>
          </div>
        </div>

        {/* === Champs texte === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom *</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom de l'artiste" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'artiste" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biographie</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de l'artiste, son parcours, son style..."
                  className="min-h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Optionnel</span>
                <span>{field.value?.length || 0}/500</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* === Champ caché pour URL avatar (string uniquement) === */}
        {typeof currentAvatar === 'string' && currentAvatar && (
          <input type="hidden" name="avatar" value={currentAvatar} />
        )}

        {/* === Actions === */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
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
