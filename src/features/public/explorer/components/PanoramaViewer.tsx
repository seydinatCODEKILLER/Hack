import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import type { PanoramaWithArtworks } from '@/types/panorama.types';
import type { Artwork } from '@/types/artwork.type';

interface PanoramaViewerProps {
  panorama: PanoramaWithArtworks;
  onArtworkClick: (artwork: Artwork) => void;
}

export function PanoramaViewer({ panorama, onArtworkClick }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const markersPluginRef = useRef<MarkersPlugin | null>(null);

  useEffect(() => {
    if (!containerRef.current || !panorama) return;

    // Détruire un ancien viewer si présent
    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
      markersPluginRef.current = null;
    }

    // Temporisation courte pour s'assurer que le DOM est rendu
    const timeout = setTimeout(() => {
      if (!containerRef.current) return;

      const viewer = new Viewer({
        container: containerRef.current,
        panorama: panorama.imageUrl,
        caption: panorama.title,
        loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
        defaultYaw: 0,
        navbar: ['zoom', 'move', 'caption', 'fullscreen'],
        touchmoveTwoFingers: true,
        plugins: [[MarkersPlugin, {}]],
      });

      viewerRef.current = viewer;
      const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;
      markersPluginRef.current = markersPlugin;

      viewer.addEventListener('ready', () => {
        // Recalcule de la taille
        if (!panorama.hotspotsWithData || !Array.isArray(panorama.hotspotsWithData)) return;

        panorama.hotspotsWithData.forEach((hotspot) => {
          if (hotspot.hotspotType === 'ARTWORK' && hotspot.artwork) {
            addArtworkMarker(markersPlugin, hotspot, hotspot.artwork);
          } else if (hotspot.hotspotType === 'INFO') {
            addInfoMarker(markersPlugin, hotspot);
          }
        });
      });

      // Click sur markers
      markersPlugin.addEventListener('select-marker', (event) => {
        const artwork = event.marker.config.data?.artwork;
        if (artwork) onArtworkClick(artwork);
      });
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
        markersPluginRef.current = null;
      }
    };
  }, [panorama, onArtworkClick]);

  const addArtworkMarker = (
    markersPlugin: MarkersPlugin,
    hotspot: PanoramaWithArtworks['hotspotsWithData'][0],
    artwork: Artwork
  ) => {
    const yaw = (hotspot.x * Math.PI) / 180;
    const pitch = (-hotspot.y * Math.PI) / 180;

    markersPlugin.addMarker({
      id: `artwork-${hotspot.id}`,
      position: { yaw, pitch },
      tooltip: {
        content: `
          <div class="p-2">
            <strong>${artwork.title}</strong><br/>
            <span class="text-sm">${artwork.artist ? `${artwork.artist.prenom} ${artwork.artist.nom}` : 'Artiste inconnu'}</span><br/>
            <span class="text-xs text-blue-300">Cliquez pour voir les détails</span>
          </div>
        `,
        position: 'top center',
      },
      html: `
        <div class="artwork-marker">
          <div class="w-6 h-6 bg-red-500 rounded-full cursor-pointer hover:scale-150 transition-transform duration-200 shadow-lg border-2 border-white flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      `,
      anchor: 'center center',
      size: { width: 24, height: 24 },
      data: { artwork, hotspot },
    });
  };

  const addInfoMarker = (
    markersPlugin: MarkersPlugin,
    hotspot: PanoramaWithArtworks['hotspotsWithData'][0]
  ) => {
    const yaw = (hotspot.x * Math.PI) / 180;
    const pitch = (-hotspot.y * Math.PI) / 180;

    markersPlugin.addMarker({
      id: `info-${hotspot.id}`,
      position: { yaw, pitch },
      tooltip: {
        content: hotspot.label || 'Information',
        position: 'top center',
      },
      html: `
        <div class="info-marker">
          <div class="w-5 h-5 bg-blue-500 rounded-full cursor-pointer hover:scale-150 transition-transform duration-200 shadow-lg border-2 border-white"></div>
        </div>
      `,
      anchor: 'center center',
      size: { width: 20, height: 20 },
    });
  };

  return <div ref={containerRef} className="w-full h-full min-h-[800px]" />;
}
