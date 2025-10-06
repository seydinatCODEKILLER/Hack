import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Palette, Award } from 'lucide-react';
import { useFeaturedArtists } from '../hooks/useArtists';

export function ArtistsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: artists, isLoading, error } = useFeaturedArtists();

  useEffect(() => {
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
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [isLoading]);

  if (error) console.error('Error loading artists:', error);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos artistes exposés
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les talents exceptionnels qui font vivre notre musée
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : artists && artists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {artists.slice(0, 4).map((artist) => (
              <Card
                key={artist.id}
                className="relative overflow-hidden rounded-xl group cursor-pointer shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="w-full h-72 bg-primary/10 flex items-center justify-center overflow-hidden">
                  {artist.avatar ? (
                    <img
                      src={artist.avatar}
                      alt={artist.nom}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <User className="w-16 h-16 text-primary" />
                  )}
                </div>

                {/* Overlay infos */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center text-white p-4 transition-opacity duration-500">
                  <h3 className="font-bold text-lg mb-2">{artist.prenom} {artist.nom}</h3>
                  <p className="text-sm mb-2">{artist.bio || 'Artiste talentueux'}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Palette className="w-3 h-3" />
                    <span>{artist.artworksCount || 0} œuvres</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun artiste à afficher pour le moment</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline">
            <Link to="/gallery/artists" className="flex items-center gap-2">
              Découvrir tous les artistes
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
