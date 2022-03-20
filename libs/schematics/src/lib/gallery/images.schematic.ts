import { ImageSource } from "../shared";

export interface GalleryImage {
  title: string;
  assetPath: string;
  description?: string;
  source: ImageSource;
}

export function ImageSchematic(data: GalleryImage): GalleryImage {
  return {
    title: data.title,
    assetPath: data.assetPath,
    description: data.description,
    source: data.source
  } as GalleryImage;
}
