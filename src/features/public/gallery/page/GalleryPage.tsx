import { useState, useRef, useEffect } from 'react';
import { GalleryGrid } from '../components/GalleryGrid';
import { gsap } from "gsap";
import { GalleryFilters } from '../components/GalleryFilters';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GalleryPage() {
  const [filters, setFilters] = useState({
    artistSearch: '',
  });
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAnimations = async () => {
      
      // Animation d'entrée de la page
      if (pageRef.current) {
        gsap.fromTo(pageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // Animation du header
      if (headerRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(headerRef.current.children,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.2,
            ease: "back.out(1.7)" 
          }
        );
      }
    };

    initAnimations();
  }, []);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
        {/* Header avec animations */}
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Galerie des Œuvres</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scannez les codes QR pour découvrir les détails des œuvres dans l'application
          </p>
        </div>

        {/* Filtres */}
        <GalleryFilters onFiltersChange={handleFiltersChange} />

        {/* Grille des œuvres */}
        <GalleryGrid filters={filters} />
      </div>
    </div>
  );
}