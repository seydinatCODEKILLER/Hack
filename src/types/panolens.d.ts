declare namespace PANOLENS {
  interface ViewerOptions {
    container: HTMLElement;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    controlBar?: boolean;
    controlButtons?: string[];
  }

  class Viewer {
    constructor(options: ViewerOptions);
    add(panorama: Panorama): void;
    dispose(): void;
  }

  class Panorama {
    constructor(imageUrl: string);
    add(infospot: Infospot): void;
  }

  class Infospot {
    constructor(size: number, image: string);
    position: {
      set: (x: number, y: number, z: number) => void;
    };
    addHoverText(text: string, width: number): void;
    addEventListener(event: string, callback: () => void): void;
  }

  const DataImage: {
    Info: string;
    Arrow: string;
  };
}

// Déclaration globale pour l'objet window
declare global {
  interface Window {
    PANOLENS: typeof PANOLENS;
  }
}