import { projects } from '../data/projects';
import { url } from './paths';

/** Every public page, for the sitemap and llms.txt. */
export const pages = [
  { path: '/', name: 'Home', about: 'Who SAV Construction is, current sites, pharmaceutical work and the Indore yard.' },
  { path: '/projects/', name: 'Projects', about: 'Every project, by sector, with locations and areas.' },
  { path: '/capabilities/', name: 'Capabilities', about: 'Services, the shuttering and scaffolding yard, the formwork workshop, safety and quality.' },
  { path: '/gallery/', name: 'Gallery', about: 'Photographs of plants, sites, the yard, the laboratory and the team.' },
  { path: '/about/', name: 'About', about: 'History from UPCL to SAV, mission, what sets SAV apart, and common questions.' },
  { path: '/people/', name: 'People', about: 'Leadership, project managers and how the team is structured.' },
  { path: '/contact/', name: 'Contact', about: 'Phone, email, office addresses and the enquiry form.' },
] as const;

export const projectPages = projects.map((project) => ({
  path: `/projects/${project.slug}/`,
  project,
}));

/** An absolute URL for a site path, respecting the base path. */
export const absolute = (path: string, site: URL | undefined): string =>
  new URL(url(path), site ?? 'https://sav.construction').href;
