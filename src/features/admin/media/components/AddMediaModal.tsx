import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateArtworkMedia } from "../hooks/useArtworkMedia";
import { Upload, File, Image, Music, Video } from "lucide-react";
import type { Artwork } from "@/types/artwork.type";
import { MediaType } from "@/types/artwork.type";
import {
  mediaFormSchema,
  type MediaFormValues,
} from "../validations/media.schema";
import { getAcceptType } from "../utils/fileType";

interface AddMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedArtwork: Artwork | null;
}

export function AddMediaModal({
  open,
  onOpenChange,
  selectedArtwork,
}: AddMediaModalProps) {
  const createMutation = useCreateArtworkMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      type: MediaType.IMAGE,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("file", file, { shouldValidate: true });
    }
  };

  const handleSubmit = async (data: MediaFormValues) => {
    if (!selectedArtwork) return;

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        artworkId: selectedArtwork.id,
        data: {
          type: data.type,
          file: data.file,
        },
      });
      form.reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const selectedFile = form.watch("file");
  const selectedType = form.watch("type");

  const getFileIcon = () => {
    switch (selectedType) {
      case MediaType.IMAGE:
        return <Image className="w-6 h-6" />;
      case MediaType.AUDIO:
        return <Music className="w-6 h-6" />;
      case MediaType.VIDEO:
        return <Video className="w-6 h-6" />;
      default:
        return <File className="w-6 h-6" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un média</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau média à l'œuvre "{selectedArtwork?.title}"
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de média *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={MediaType.IMAGE}>Image</SelectItem>
                      <SelectItem value={MediaType.AUDIO}>Audio</SelectItem>
                      <SelectItem value={MediaType.VIDEO}>Vidéo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Fichier *</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={getAcceptType(selectedType)}
                        onChange={handleFileChange}
                        className="hidden"
                        name="file"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-2 h-20 border-dashed"
                      >
                        {selectedFile ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              {getFileIcon()}
                            </div>
                            <p className="text-sm font-medium truncate max-w-xs">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-6 h-6 mx-auto mb-2" />
                            <p className="text-sm">
                              Cliquez pour sélectionner un fichier
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Max. 50MB
                            </p>
                          </div>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedArtwork}>
                {isSubmitting ? "Ajout en cours..." : "Ajouter le média"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
