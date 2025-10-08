import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { translationFormSchema, type TranslationFormValues } from '../validations/translation.schema';
import { Lang, TranslationStatus } from '@/types/artwork.type';

interface TranslationFormProps {
  onSubmit: (data: TranslationFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  defaultValues?: Partial<TranslationFormValues>;
  mode: 'create' | 'edit';
}

export function TranslationForm({ 
  onSubmit, 
  isSubmitting, 
  onCancel, 
  defaultValues,
  mode 
}: TranslationFormProps) {
  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: defaultValues || {
      lang: Lang.FR,
      title: '',
      description: '',
      status: TranslationStatus.PUBLISHED,
    },
  });

  const getLanguageLabel = (lang: Lang) => {
    switch (lang) {
      case Lang.FR:
        return 'Français';
      case Lang.EN:
        return 'English';
      case Lang.WO:
        return 'Wolof';
      default:
        return lang;
    }
  };

  const getLanguageFlag = (lang: Lang) => {
    switch (lang) {
      case Lang.FR:
        return '🇫🇷';
      case Lang.EN:
        return '🇬🇧';
      case Lang.WO:
        return '🇸🇳';
      default:
        return '🌐';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langue *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={mode === 'edit'}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Lang.FR}>
                    <span className="flex items-center gap-2">
                      <span>{getLanguageFlag(Lang.FR)}</span>
                      <span>{getLanguageLabel(Lang.FR)}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={Lang.EN}>
                    <span className="flex items-center gap-2">
                      <span>{getLanguageFlag(Lang.EN)}</span>
                      <span>{getLanguageLabel(Lang.EN)}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={Lang.WO}>
                    <span className="flex items-center gap-2">
                      <span>{getLanguageFlag(Lang.WO)}</span>
                      <span>{getLanguageLabel(Lang.WO)}</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              {mode === 'edit' && (
                <p className="text-xs text-muted-foreground mt-1">
                  La langue ne peut pas être modifiée après création
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre traduit</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Titre de l'œuvre dans la langue sélectionnée..." 
                  {...field} 
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Optionnel - laissé vide pour utiliser le titre original</span>
                <span>{field.value?.length || 0}/100</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de l'œuvre dans la langue sélectionnée..."
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Description complète de l'œuvre</span>
                <span>{field.value?.length || 0}/2000</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Statut de publication
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  {field.value === TranslationStatus.PUBLISHED 
                    ? 'La traduction sera visible par les visiteurs'
                    : 'La traduction sera en mode brouillon'
                  }
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === TranslationStatus.PUBLISHED}
                  onCheckedChange={(checked) => 
                    field.onChange(checked ? TranslationStatus.PUBLISHED : TranslationStatus.DRAFT)
                  }
                />
              </FormControl>
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
            {isSubmitting 
              ? (mode === 'create' ? 'Ajout en cours...' : 'Modification en cours...')
              : (mode === 'create' ? 'Ajouter la traduction' : 'Modifier la traduction')
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}