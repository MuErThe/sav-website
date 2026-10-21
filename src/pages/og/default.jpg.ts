import type { APIRoute } from 'astro';
import { imageResponse, renderShareImage } from '../../lib/og';

/** The share image for every page without one of its own. */
export const GET: APIRoute = async () => imageResponse(await renderShareImage());
