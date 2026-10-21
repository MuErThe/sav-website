import type { ImageMetadata } from 'astro';
import { projectBySlug, projects } from '../data/projects';

/**
 * Image collections resolved at build time.
 *
 * Adding a photo to `src/assets/projects/<slug>/` puts it in that project's
 * gallery with no code change: files sort by name, so the `01-`, `02-` prefix
 * controls order, and the rest of the filename becomes the caption.
 */
const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/projects/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const capabilityImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/capability/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const peopleImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/people/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const clientLogos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/clients/*.png',
  { eager: true },
);

const cultureImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/culture/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export interface GalleryImage {
  readonly src: ImageMetadata;
  /** Full sentence describing the photo, used as the `alt` attribute. */
  readonly alt: string;
  /** Short human label shown under the image in captions and carousels. */
  readonly caption: string;
  /**
   * True when the photo is borrowed from another project because this one has
   * no photography yet. The alt text says so, and the project page carries a
   * notice; the photo itself is not labelled.
   */
  readonly placeholder?: boolean;
}

/** `03-plant-approach.jpg` -> `Plant approach` */
function captionFromPath(path: string): string {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.[^.]+$/, '').replace(/^\d+[-_]/, '');
  const words = base.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function collect(
  records: Record<string, { default: ImageMetadata }>,
  dir: string,
  describe: (caption: string) => string,
): GalleryImage[] {
  return Object.keys(records)
    .filter((path) => path.includes(`/${dir}/`))
    .sort()
    .map((path) => {
      const caption = captionFromPath(path);
      // `filter` above guarantees the key exists.
      const mod = records[path]!;
      return { src: mod.default, alt: describe(caption), caption };
    });
}

/** Photos actually filed under this project. May be empty. */
function ownGallery(slug: string): GalleryImage[] {
  const project = projectBySlug(slug);
  const name = project?.name ?? slug;
  return collect(projectImages, slug, (caption) => `${name}: ${caption.toLowerCase()}`);
}

/** Stable per-slug offset, so the stand-in set never shuffles between builds. */
function slugSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return hash;
}

const PLACEHOLDER_COUNT = 3;

/**
 * Stand-in photography for a project awaiting its own images. Pulls from other
 * projects in the same sector where possible, so an industrial page does not
 * show a pharmaceutical plant. Replace by adding real photos to
 * `src/assets/projects/<slug>/`; they take over automatically.
 */
function representativeGallery(slug: string): GalleryImage[] {
  const project = projectBySlug(slug);

  const candidates = projects
    .filter((p) => p.slug !== slug && ownGallery(p.slug).length > 0)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const sameSector = candidates.filter((p) => p.sector === project?.sector);
  const pool = sameSector.length >= PLACEHOLDER_COUNT ? sameSector : candidates;
  if (pool.length === 0) return [];

  const seed = slugSeed(slug);
  const picked: GalleryImage[] = [];

  for (let i = 0; i < Math.min(PLACEHOLDER_COUNT, pool.length); i += 1) {
    const source = pool[(seed + i) % pool.length]!;
    const image = ownGallery(source.slug)[0];
    if (!image) continue;
    picked.push({
      src: image.src,
      alt: `Representative photograph of a comparable ${source.sector.toLowerCase()} project by SAV Construction. Photography of this site is not yet available.`,
      caption: image.caption,
      placeholder: true,
    });
  }

  return picked;
}

/** Every photo for a project, falling back to representative imagery. */
export function galleryFor(slug: string): GalleryImage[] {
  const own = ownGallery(slug);
  return own.length > 0 ? own : representativeGallery(slug);
}

/** True when this project is still showing borrowed photography. */
export function usesPlaceholders(slug: string): boolean {
  return ownGallery(slug).length === 0;
}

/** First photo for a project, used as the card and hero image. */
export function coverFor(slug: string): GalleryImage | undefined {
  return galleryFor(slug)[0];
}

export function capabilityGallery(group: 'services' | 'quality' | 'warehouse'): GalleryImage[] {
  const context: Record<typeof group, string> = {
    services: 'Project delivered by SAV Construction',
    quality: 'On-site testing laboratory',
    warehouse: 'SAV Construction warehouse in Indore',
  };
  return collect(capabilityImages, group, (caption) => `${context[group]}: ${caption.toLowerCase()}`);
}

export function cultureGallery(): GalleryImage[] {
  return Object.keys(cultureImages)
    .sort()
    .map((path) => {
      const caption = captionFromPath(path);
      const mod = cultureImages[path]!;
      return { src: mod.default, alt: `SAV Construction team: ${caption.toLowerCase()}`, caption };
    });
}

/** Portrait for a person, by slug. Returns undefined when no photo exists. */
export function portraitFor(slug: string): ImageMetadata | undefined {
  const match = Object.keys(peopleImages).find((path) => path.includes(`/${slug}.`));
  return match ? peopleImages[match]!.default : undefined;
}

/** Client logo by filename stem. */
export function clientLogo(file: string): ImageMetadata | undefined {
  const match = Object.keys(clientLogos).find((path) => path.endsWith(`/${file}.png`));
  return match ? clientLogos[match]!.default : undefined;
}
