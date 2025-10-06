import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, QrCode } from "lucide-react";
import { formatArtistName } from "@/features/public/landingPage/utils/formatters";
import type { Artwork } from "@/types/artwork.type";
import { Link } from "react-router-dom";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const artistName = artwork.artist
    ? formatArtistName(artwork.artist)
    : "Artiste inconnu";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* QR Code Section */}
      <div className="aspect-square bg-white p-6 flex items-center justify-center border-b">
        {artwork.qrCodeImageUrl ? (
          <img
            src={artwork.qrCodeImageUrl}
            alt={`QR Code pour ${artwork.title}`}
            className="w-full h-full object-contain max-w-48 max-h-48"
          />
        ) : (
          <div className="text-center text-muted-foreground">
            <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p className="text-sm">QR Code non disponible</p>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
          {artwork.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">{artistName}</p>

        {/* Informations supplémentaires */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {artwork.roomType
              ? artwork.roomType === "MODERN_ART"
                ? "Art Moderne"
                : "Histoire"
              : "Non classé"}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {artwork.viewCount} vues
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/artwork/${artwork.id}`}>
            <Eye className="w-4 h-4 mr-2" />
            Voir les détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
