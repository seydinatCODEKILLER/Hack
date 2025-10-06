import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, Image } from 'lucide-react';
import { MediaType, type Artwork, type ArtworkMedia } from '@/types/artwork.type';

interface MediaGalleryProps {
  artwork: Artwork;
}

export function MediaGallery({ artwork }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<ArtworkMedia | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const mediaItems = artwork.media || [];

  useEffect(() => {
    const initAnimation = async () => {
      if (!galleryRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(galleryRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    };

    initAnimation();
  }, []);

  const handleMediaSelect = (media: ArtworkMedia) => {
    setSelectedMedia(media);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (selectedMedia?.type === MediaType.AUDIO && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (selectedMedia?.type === MediaType.VIDEO && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <Card ref={galleryRef}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Médias associés
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Media principal */}
        {selectedMedia && (
          <div className="mb-6">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {selectedMedia.type === MediaType.IMAGE && (
                <img 
                  src={selectedMedia.url} 
                  alt="Media sélectionné"
                  className="w-full h-64 object-cover"
                />
              )}
              
              {selectedMedia.type === MediaType.AUDIO && (
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                  <div className="text-center text-white">
                    <Volume2 className="w-16 h-16 mx-auto mb-4" />
                    <Button 
                      onClick={handlePlayPause}
                      variant="secondary"
                      size="lg"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Écouter'}
                    </Button>
                    <audio 
                      ref={audioRef}
                      src={selectedMedia.url}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
              
              {selectedMedia.type === MediaType.VIDEO && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={selectedMedia.url}
                    className="w-full h-64 object-cover"
                    controls={false}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <Button 
                    onClick={handlePlayPause}
                    variant="secondary"
                    size="lg"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Liste des médias */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaItems.map((media, index) => (
            <div
              key={media.id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedMedia?.id === media.id ? 'ring-2 ring-primary' : 'ring-1 ring-border'
              }`}
              onClick={() => handleMediaSelect(media)}
            >
              {media.type === MediaType.IMAGE ? (
                <img 
                  src={media.url} 
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : media.type === MediaType.AUDIO ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              )}
              
              {/* Overlay avec type */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                {media.type === MediaType.IMAGE ? 'Image' : 
                 media.type === MediaType.AUDIO ? 'Audio' : 'Vidéo'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}