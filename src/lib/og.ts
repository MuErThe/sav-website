import sharp from 'sharp';

/**
 * Share images for link previews (WhatsApp, LinkedIn, X, Facebook), made at
 * build time: a site photo cropped to 1200 x 630, a navy wash for contrast
 * and the white SAV logo, kept well under WhatsApp's 300 KB limit.
 *
 * Photos load through Vite as inline data, one at a time, only when a share
 * image needs them.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const BAND = 14;
const DEFAULT_PHOTO = '../assets/projects/alembic-pharmaceuticals/01-facility.jpg';

const photos = import.meta.glob<string>('../assets/projects/*/*.{jpg,jpeg,png,webp}', {
  query: '?inline',
  import: 'default',
});
const logoFile = import.meta.glob<string>('../assets/brand/sav-logo-white.png', {
  query: '?inline',
  import: 'default',
});

/** A Vite inline asset (`data:image/...;base64,...`) as raw bytes. */
function bytes(dataUri: string): Uint8Array {
  const binary = atob(dataUri.slice(dataUri.indexOf(',') + 1));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

/** The first photo in a project's folder, or the default when it has none. */
export function projectPhoto(slug: string): string {
  return Object.keys(photos).filter((path) => path.includes(`/projects/${slug}/`)).sort()[0] ?? DEFAULT_PHOTO;
}

const wash = new TextEncoder().encode(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0b1f3a" stop-opacity="0.92"/>
      <stop offset="0.45" stop-color="#0b1f3a" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0b1f3a" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect y="${OG_HEIGHT - BAND}" width="100%" height="${BAND}" fill="#f09858"/>
</svg>`);

export async function renderShareImage(photo: string = DEFAULT_PHOTO): Promise<Uint8Array<ArrayBuffer>> {
  const loadPhoto = photos[photo] ?? photos[DEFAULT_PHOTO];
  const loadLogo = Object.values(logoFile)[0];
  if (!loadPhoto || !loadLogo) throw new Error(`Share image source missing: ${photo}`);

  const logo = await sharp(bytes(await loadLogo())).resize({ width: 400 }).png().toBuffer();
  const { height: logoHeight = 195 } = await sharp(logo).metadata();

  const image = await sharp(bytes(await loadPhoto()))
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'attention' })
    .composite([
      { input: wash },
      { input: logo, left: 72, top: OG_HEIGHT - 72 - BAND - logoHeight },
    ])
    .jpeg({ quality: 76, mozjpeg: true })
    .toBuffer();
  return Uint8Array.from(image);
}

export function imageResponse(body: Uint8Array<ArrayBuffer>): Response {
  return new Response(body, { headers: { 'Content-Type': 'image/jpeg' } });
}
