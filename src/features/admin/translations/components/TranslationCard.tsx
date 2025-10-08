import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, FileText, Globe } from 'lucide-react';
import type { ArtworkTranslationForAdmin } from '@/types/artwork.type';
import { Lang, TranslationStatus } from '@/types/artwork.type';

interface TranslationCardProps {
  translation: ArtworkTranslationForAdmin | undefined;
  lang: Lang;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export function TranslationCard({ translation, lang, onEdit, onDelete, isDeleting }: TranslationCardProps) {
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

  const isTranslated = !!translation;
  const isPublished = translation?.status === TranslationStatus.PUBLISHED;

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${
      !isTranslated ? 'opacity-60 border-dashed' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-lg">
              {getLanguageLabel(lang)}
            </h3>
            <span className="text-2xl">{getLanguageFlag(lang)}</span>
          </div>
          {isTranslated ? (
            <Badge variant={isPublished ? "default" : "secondary"}>
              {isPublished ? 'Publié' : 'Brouillon'}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Non traduit
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {isTranslated ? (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Titre</h4>
              <p className="text-sm line-clamp-2">
                {translation.title || 'Titre original utilisé'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p className="text-sm line-clamp-3 text-muted-foreground">
                {translation.description}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Mis à jour le {new Date(translation.updatedAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Aucune traduction disponible
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        {isTranslated ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Modifier
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Ajouter
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}