import { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import type { HotspotWithDetails, PanoramaForAdmin } from '@/types/pano.type';

interface AdminPanoramaViewerProps {
  panorama: PanoramaForAdmin;
  hotspots: HotspotWithDetails[];
  onPositionClick: (position: { x: number; y: number }) => void;
  onHotspotClick?: (hotspot: HotspotWithDetails) => void;
}

export function AdminPanoramaViewer({ 
  panorama, 
  hotspots, 
  onPositionClick,
  onHotspotClick 
}: AdminPanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const markersPluginRef = useRef<MarkersPlugin | null>(null);
  const [isReady, setIsReady] = useState(false);

  console.log(panorama)

  useEffect(() => {
    if (!containerRef.current || !panorama) return;

    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
      markersPluginRef.current = null;
    }

    const timeout = setTimeout(() => {
      if (!containerRef.current) return;

      const viewer = new Viewer({
        container: containerRef.current,
        panorama: panorama.imageUrl,
        caption: `Admin - ${panorama.title}`,
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
        setIsReady(true);
        addExistingHotspots(markersPlugin, hotspots);
      });

      // Click sur la sphère pour créer un hotspot
      viewer.addEventListener('click', (event) => {
        if (event.data.rightclick) return; // Ignorer clic droit
        
        const { yaw, pitch } = event.data;
        const x = (yaw * 180) / Math.PI;
        const y = (-pitch * 180) / Math.PI;
        
        onPositionClick({ x, y });
      });

      // Click sur les markers existants
      markersPlugin.addEventListener('select-marker', (event) => {
        const hotspot = event.marker.config.data?.hotspot;
        if (hotspot && onHotspotClick) {
          onHotspotClick(hotspot);
        }
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
  }, [panorama, onPositionClick, onHotspotClick, hotspots]);

  const addExistingHotspots = (markersPlugin: MarkersPlugin, hotspots: HotspotWithDetails[]) => {
    hotspots.forEach((hotspot) => {
      const yaw = (hotspot.x * Math.PI) / 180;
      const pitch = (-hotspot.y * Math.PI) / 180;

      const markerColor = hotspot.hotspotType === 'ARTWORK' ? 'red' : 
                         hotspot.hotspotType === 'NAVIGATION' ? 'blue' : 'green';

      markersPlugin.addMarker({
        id: `hotspot-${hotspot.id}`,
        position: { yaw, pitch },
        tooltip: {
          content: `
            <div class="p-2 max-w-xs">
              <strong>${hotspot.label || 'Hotspot'}</strong><br/>
              <span class="text-sm">Type: ${hotspot.hotspotType}</span><br/>
              <span class="text-sm">Position: ${hotspot.x.toFixed(1)}, ${hotspot.y.toFixed(1)}</span>
              ${hotspot.artwork ? `<br/><span class="text-xs text-blue-300">${hotspot.artwork.title}</span>` : ''}
            </div>
          `,
          position: 'top center',
        },
        html: `
          <div class="hotspot-marker">
            <div class="w-6 h-6 bg-${markerColor}-500 rounded-full cursor-pointer hover:scale-150 transition-transform duration-200 shadow-lg border-2 border-white flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        `,
        anchor: 'center center',
        size: { width: 24, height: 24 },
        data: { hotspot },
      });
    });
  };

  return (
    <div className="w-full h-[600px] bg-gray-100 border">
      <div ref={containerRef} className="w-full h-full" />
      
      {isReady && (
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <span>🎯 Clic sur la sphère pour ajouter un hotspot</span>
          </div>
        </div>
      )}
    </div>
  );
}