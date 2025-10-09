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
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Move3d,
      title: 'Visite Immersive 360°',
      description: 'Explorez le musée depuis chez vous avec notre technologie immersive.'
    },
    {
      icon: Navigation,
      title: 'Navigation Intuitive',
      description: 'Passez facilement d’une salle à l’autre grâce aux hotspots interactifs.'
    },
    {
      icon: Eye,
      title: 'Découverte Interactive',
      description: 'Cliquez sur chaque œuvre pour accéder à des informations enrichies et médias associés.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
            Visite Virtuelle du Musée
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Plongez dans l’univers des œuvres d’art avec une expérience immersive et interactive.
          </p>
        </div>

        {/* Features */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl text-center p-8 group hover:scale-105 transition-transform duration-500">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 py-4 rounded-full shadow-lg transition-all">
            <Link to="/explore" className="flex items-center gap-3 font-medium">
              <Move3d className="w-6 h-6" />
              Commencer l’expérience 360°
            </Link>
          </Button>
        </div>

        {/* Preview */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-primary/20 via-purple-100/20 to-purple-600/10 p-12 aspect-video flex flex-col items-center justify-center text-center">
            <Move3d className="w-20 h-20 text-primary mb-6 animate-bounce" />
            <p className="text-gray-700 text-lg md:text-xl max-w-xl">
              Aperçu de la visite immersive 360° — découvrez chaque salle et chaque œuvre comme si vous y étiez.
            </p>
          </div>
          <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
