import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, ArrowRight } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLatestArtworks } from '../hooks/useArtworks';
import { getArtworkImage } from '../utils/formatters';

export function GalleryPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: artworks, isLoading, error } = useLatestArtworks(3);

  useEffect(() => {
    const initAnimations = async () => {
      if (sectionRef.current && !isLoading) {
        
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(sectionRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    initAnimations();
  }, [isLoading]);

  if (error) {
    console.error('Error loading artworks:', error);
  }

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quelques œuvres à découvrir
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez une sélection des plus belles œuvres de notre collection
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : artworks && artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {artworks.map((artwork) => (
              <Card 
                key={artwork.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/artwork/${artwork.id}`}>
                  <div className="relative overflow-hidden">
                    {artwork.media ? (
                      <img 
                        src={getArtworkImage(artwork) || ''} 
                        alt={artwork.title}
                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                        <Eye className="w-12 h-12 text-primary opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{artwork.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {artwork.artist ? `${artwork.artist.prenom} ${artwork.artist.nom}` : 'Artiste inconnu'}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune œuvre à afficher pour le moment</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/gallery" className="flex items-center gap-2">
              Voir la galerie complète
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}