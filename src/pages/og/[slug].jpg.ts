import type { APIRoute, GetStaticPaths } from 'astro';
import { projects } from '../../data/projects';
import { imageResponse, projectPhoto, renderShareImage } from '../../lib/og';

/** One share image per project, from its first photo. */
export const getStaticPaths = (() => projects.map((project) => ({ params: { slug: project.slug } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => imageResponse(await renderShareImage(projectPhoto(params.slug!)));
