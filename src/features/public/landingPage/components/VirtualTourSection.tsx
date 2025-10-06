import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Move3d, Navigation } from 'lucide-react';

export function VirtualTourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animation de la section
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

      // Animation des cartes en stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    initAnimations();
  }, []);

  const features = [
    {
      icon: Move3d,
      title: 'Visite Immersive 360°',
      description: 'Explorez le musée comme si vous y étiez avec notre technologie de visionnage à 360°'
    },
    {
      icon: Navigation,
      title: 'Navigation Intuitive',
      description: 'Déplacez-vous facilement entre les différentes salles avec les hotspots interactifs'
    },
    {
      icon: Eye,
      title: 'Découverte Interactive',
      description: 'Cliquez sur les œuvres pour obtenir des informations détaillées et des médias associés'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visite Virtuelle Immersive
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Plongez au cœur de l'art avec une expérience de visite unique et interactive
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/explore" className="flex items-center gap-2">
              <Move3d className="w-5 h-5" />
              Démarrer l'expérience 360°
            </Link>
          </Button>
        </div>

        {/* Preview Image */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl p-8 text-center aspect-video flex items-center justify-center">
            <div className="text-center">
              <Move3d className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aperçu de la visite 360° - Fonctionnalité à implémenter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}