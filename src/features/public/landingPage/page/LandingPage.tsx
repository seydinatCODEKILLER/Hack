import { useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from '../components/HeroSection';
import { VirtualTourSection } from '../components/VirtualTourSection';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';
import { GalleryPreview } from '../components/GalleryPreview';
import { ArtistsSection } from '../components/ArtistsSection';

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations seront ajoutées ici
    const initAnimations = async () => {
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animation simple pour démarrer
      gsap.fromTo(mainRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
    };

    initAnimations();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <GalleryPreview />
        <VirtualTourSection />
        <ArtistsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}