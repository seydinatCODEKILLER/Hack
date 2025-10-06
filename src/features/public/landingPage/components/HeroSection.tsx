import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (titleRef.current && subtitleRef.current && ctaRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }

    // Animation des éléments flottants
    floatingRefs.current.forEach((el, i) => {
      gsap.to(el, {
        y: Math.random() * 60 - 30, // amplitude verticale plus grande
        x: Math.random() * 60 - 30, // amplitude horizontale plus grande
        rotation: Math.random() * 45 - 22, // rotation plus dynamique
        duration: 2 + Math.random() * 2, // durée réduite → mouvement plus rapide
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2, // décalage pour que ce ne soit pas synchronisé
      });
    });
  }, []);

  // Palette de couleurs pour les flottants
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6FFF"];

  // Clear refs before rendering to avoid duplicates
  floatingRefs.current = [];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted overflow-hidden"
    >
      {/* Floating elements */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) floatingRefs.current.push(el);
          }}
          className="absolute rounded-full opacity-60"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            zIndex: 1,
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Explorez le musée{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            autrement
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Découvrez les œuvres d'art à travers une visite virtuelle immersive à
          360°
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/explore" className="flex items-center gap-2">
              Commencer la visite
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 border-white/70"
          >
            <Link to="/gallery" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Voir la galerie
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
