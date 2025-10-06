import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Palette } from 'lucide-react';
import type { Artist } from '@/types/artwork.type';
import { gsap } from "gsap";

interface ArtistInfoProps {
  artist: Artist;
}

export function ArtistInfo({ artist }: ArtistInfoProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      if (!cardRef.current) return;

      
      gsap.fromTo(cardRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
      );
    };

    initAnimation();
  }, []);

  return (
    <Card ref={cardRef}>
      <CardHeader className="flex flex-row items-center space-x-2 space-y-0">
        <User className="w-5 h-5" />
        <CardTitle>À propos de l'artiste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          {artist.avatar ? (
            <img 
              src={artist.avatar} 
              alt={`${artist.prenom} ${artist.nom}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">
              {artist.prenom} {artist.nom}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Palette className="w-3 h-3" />
              <span>Artiste</span>
            </div>
          </div>
        </div>

        {artist.bio && (
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>
        )}

        <div className="pt-4 border-t text-xs text-muted-foreground">
          <p>Membre depuis {new Date(artist.date_creation).getFullYear()}</p>
        </div>
      </CardContent>
    </Card>
  );
}