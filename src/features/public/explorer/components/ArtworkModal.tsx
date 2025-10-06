import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, User } from "lucide-react";
import { formatArtistName } from "@/features/public/landingPage/utils/formatters";
import type { Artwork } from "@/types/artwork.type";
import { getArtworkImage } from "@/features/public/landingPage/utils/formatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  if (!artwork) return null;

  const imageUrl = getArtworkImage(artwork);
  const artistName = artwork.artist
    ? formatArtistName(artwork.artist)
    : "Artiste inconnu";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Eye className="w-6 h-6" />
            {artwork.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image de l'œuvre */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 border">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Eye className="w-16 h-16 text-muted-foreground opacity-50" />
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="space-y-6">
            {/* Artiste */}
            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <Avatar className="w-10 h-10">
                {artwork.artist?.avatar ? (
                  <AvatarImage
                    src={artwork.artist.avatar}
                    alt={`Avatar de ${artistName}`}
                  />
                ) : null}
                <AvatarFallback>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">Artiste</h3>
                <p className="text-foreground">{artistName}</p>
                {artwork.artist?.bio && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {artwork.artist.bio}
                  </p>
                )}
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button asChild className="flex-1">
                <a
                  href={`/artwork/${artwork.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir les détails complets
                </a>
              </Button>

              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
            </div>

            {/* QR Code */}
            {artwork.qrCodeImageUrl && (
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">QR Code</h4>
                <div className="bg-white p-3 rounded-lg inline-block">
                  <img
                    src={artwork.qrCodeImageUrl}
                    alt={`QR Code pour ${artwork.title}`}
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Scannez ce code pour accéder à cette œuvre
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
