/**
 * The home page hero's photographs and video poster, shared by the hero
 * section (to render them) and the home page (to preload the poster, which
 * is the first thing a visitor sees and the page's largest paint).
 */
import { getImage } from 'astro:assets';
import { heroSlides } from '../data/story';
import { projectBySlug } from '../data/projects';
import { galleryFor } from './gallery';

/** The slideshow photographs, in order, skipping any whose photo is missing. */
export const heroPhotos = heroSlides.flatMap(({ slug, caption, focus }) => {
  const project = projectBySlug(slug);
  const photo = galleryFor(slug).find((image) => image.caption === caption);
  return project && photo ? [{ project, photo, focus }] : [];
});

/** The video's poster frame: the first slideshow photograph at 1600 px. */
export const heroPoster = heroPhotos[0] ? (await getImage({ src: heroPhotos[0].photo.src, width: 1600 })).src : undefined;
