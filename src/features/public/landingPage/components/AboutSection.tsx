import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Users, Target } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Animation du contenu
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(elements,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    initAnimations();
  }, []);

  const values = [
    {
      icon: Globe,
      title: 'Accessibilité Mondiale',
      description: 'Rendre l\'art accessible à tous, partout dans le monde'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Créer une communauté d\'amoureux de l\'art connectée'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Utiliser la technologie pour enrichir l\'expérience culturelle'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              À propos du musée virtuel
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ce musée virtuel a pour objectif de rendre l'art accessible à tous, partout dans le monde, 
              grâce à la technologie 360°. Nous croyons que la culture devrait être à la portée de tous, 
              sans barrières géographiques ou physiques.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-muted/30 rounded-2xl text-center">
            <h4 className="font-semibold text-lg mb-3">Notre Mission</h4>
            <p className="text-muted-foreground">
              Transformer la façon dont les gens découvrent et interagissent avec l'art, 
              en créant des expériences immersives qui inspirent et éduquent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}