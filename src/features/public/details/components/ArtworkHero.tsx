import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import type { Artwork } from '@/types/artwork.type';
import { getArtworkImage } from '@/features/public/landingPage/utils/formatters';

interface ArtworkHeroProps {
  artwork: Artwork;
}

export function ArtworkHero({ artwork }: ArtworkHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageUrl = getArtworkImage(artwork);

  useEffect(() => {
    const initAnimation = async () => {
      if (!heroRef.current) return;

      
      gsap.fromTo(heroRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );
    };

    initAnimation();
  }, []);

  if (!imageUrl) {
    return (
      <div ref={heroRef} className="w-full h-96 bg-muted/30 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={heroRef} className="w-full h-96 lg:h-[500px] overflow-hidden">
      <img 
        src={imageUrl} 
        alt={artwork.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}