import { STORAGE_ROOT } from './api';
import { getPlate, type Plate } from './data/plates';
import type { Destination } from './types';

export interface ResolvedImage {
  src: string;
  alt: string;
  /** Present only for sample plates, which are CC-licensed and must be credited. */
  credit?: { artist: string; license: string; source: string };
}

const toUrl = (path: string) =>
  /^https?:\/\//i.test(path) ? path : `${STORAGE_ROOT}/${path.replace(/^\/+/, '')}`;

const creditOf = (plate: Plate) => ({
  artist: plate.artist,
  license: plate.license,
  source: plate.source,
});

/**
 * Cover image for a destination. Uploads from the Laravel backend win; the
 * bundled Commons plate is the fallback so a destination with no upload yet
 * still shows the real place rather than a grey box.
 */
export function coverImage(destination: Destination): ResolvedImage | null {
  const alt = destination.title;

  const uploaded =
    destination.cover_image?.image_path ??
    destination.images?.find((i) => i.is_cover)?.image_path ??
    destination.images?.[0]?.image_path;

  if (uploaded) return { src: toUrl(uploaded), alt };

  const plate = getPlate(destination.slug);
  if (plate) return { src: plate.src, alt, credit: creditOf(plate) };

  return null;
}

/** Full gallery for a destination detail page. */
export function galleryImages(destination: Destination): ResolvedImage[] {
  const uploaded = destination.images ?? [];
  if (uploaded.length > 0) {
    return uploaded.map((img, i) => ({
      src: toUrl(img.image_path),
      alt: `${destination.title} — view ${i + 1}`,
    }));
  }

  const plate = getPlate(destination.slug);
  return plate
    ? [{ src: plate.src, alt: destination.title, credit: creditOf(plate) }]
    : [];
}

/**
 * A representative image for a category, borrowed from the first destination in
 * it that has one.
 */
export function categoryImage(
  categorySlug: string,
  destinations: Destination[]
): ResolvedImage | null {
  for (const d of destinations) {
    if (d.category?.slug !== categorySlug) continue;
    const img = coverImage(d);
    if (img) return img;
  }
  return null;
}
