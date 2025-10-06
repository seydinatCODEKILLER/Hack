import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { gsap } from "gsap";
import { Lang, type Artwork } from '@/types/artwork.type';

interface TranslationsProps {
  artwork: Artwork;
}

export function Translations({ artwork }: TranslationsProps) {
  const [selectedLang, setSelectedLang] = useState<Lang>(Lang.FR);
  const contentRef = useRef<HTMLDivElement>(null);

  // Trouver la traduction pour la langue sélectionnée
  const currentTranslation = artwork.translations?.find(t => t.lang === selectedLang) || 
    artwork.translations?.find(t => t.lang === Lang.FR); // Fallback sur FR

  const defaultTitle = artwork.title;
  const defaultDescription = "Description non disponible dans cette langue";

  useEffect(() => {
    const initAnimation = async () => {
      if (!contentRef.current) return;

      
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }
      );
    };

    initAnimation();
  }, [selectedLang]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Description de l'œuvre
        </CardTitle>
        <Select value={selectedLang} onValueChange={(value: Lang) => setSelectedLang(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Lang.FR}>Français</SelectItem>
            <SelectItem value={Lang.EN}>English</SelectItem>
            <SelectItem value={Lang.WO}>Wolof</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent ref={contentRef}>
        <h2 className="text-2xl font-bold mb-4">
          {currentTranslation?.title || defaultTitle}
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {currentTranslation?.description || defaultDescription}
          </p>
        </div>
        
        {/* Indicateur de statut de traduction */}
        {currentTranslation && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Traduction {currentTranslation.status === 'published' ? 'publiée' : 'brouillon'} 
              en {selectedLang === Lang.FR ? 'français' : selectedLang === Lang.EN ? 'anglais' : 'wolof'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}