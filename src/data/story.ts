/**
 * The site's narrative: how the deck's facts are framed, in what order.
 *
 * Figures are never restated here. They come from `company.ts` and
 * `projects.ts`, so this file only adds the reasoning that connects them.
 */

import { stats, safety, services, warehouse, currentWork } from './company';
import { projects, type Project } from './projects';

/**
 * Written for the people who shortlist contractors: plant owners, project
 * heads and consultants. Kept to one headline, one line of proof and one
 * action; who trusts SAV and why it delivers follow in the sections below.
 */
export const hero = {
  titleLead: 'We build',
  /** One short line of proof; the client names follow in the trust strip. */
  proof: [
    { value: stats[2]!.value, label: 'years' },
    { value: stats[1]!.value, label: 'projects' },
    { value: safety.headlineValue, label: 'accidents recorded' },
  ],
  secondaryCta: 'See our projects',
} as const;

/**
 * Photos for the homepage slideshow, by project and photo caption: one per
 * project, so no plant appears twice. Only the larger originals are listed;
 * most other project photos are 480 px wide. `focus` is the point the crop
 * keeps in view (CSS `object-position`), since the frame is wide on a desktop
 * and tall on a phone.
 */
export const heroSlides = [
  { slug: 'alembic-pharmaceuticals', caption: 'Facility', focus: '50% 58%' },
  { slug: 'worth-wellness', caption: 'Plant frontage', focus: '50% 38%' },
  { slug: 'sava-healthcare', caption: 'Main block', focus: '50% 52%' },
  { slug: 'gufic-pharmaceuticals', caption: 'Facility render', focus: '45% 50%' },
] as const;

/**
 * The hero headline's turning phrase: one short line of work per sector, in
 * the director's order, each kept short enough to sit on one line beside
 * "We build". The closing line reads on from any of them.
 */
export const heroRotation = {
  phrases: ['industrial plants', 'pharma facilities', 'commercial spaces', 'institutions', 'infrastructure', 'high-rise homes'],
  rest: 'delivered on time.',
} as const;

/**
 * A short clip of SAV's own work for the first slide of the hero. Set to a
 * file under `public/video/` to enable it; `null` leaves the photos alone.
 */
export const heroVideo: { readonly src: string } | null = {
  // Pexels clip (free licence) of a crew fixing rebar amid scaffolding and formwork, not an SAV site.
  src: '/video/hero.mp4',
};

/** Logo strip directly under the hero: recognisable names, trust at a glance. */
export const trust = {
  title: 'Trusted by',
  /** Logo files in `src/assets/clients/`. */
  clientFiles: [
    'lupin',
    'alembic',
    'dabur',
    'adani',
    'reliance',
    'welspun',
    'piramal',
    'kirloskar',
    'thermax',
    'mahle',
    'airports-authority-of-india',
    'sava-healthcare',
  ],
} as const;

/**
 * The yard, as the first reason SAV delivers on time. The figure that used to
 * lead the page now introduces the section that explains it.
 */
export const yard = {
  figure: '3.5 lakh sq ft',
  title: 'of shuttering in our own yard.',
  lede: 'Most contractors hire their formwork and staging. We own ours: shuttering, cup-lock scaffolding, machinery and vehicles, held in our Indore warehouse and sent to site when the programme calls for it.',
  imageCaption: 'Our yard in Indore: shuttering, staging and plant, held in-house.',
} as const;

export const ledger = {
  title: 'What we keep in the yard',
  lede: 'Large quantities of staging, shuttering and formwork held in-house are what let us maintain progress on site without delays.',
  rows: warehouse.items,
} as const;

const PHARMA: Project['sector'] = 'Pharmaceutical';

export const pharmaProjects = projects.filter((p) => p.sector === PHARMA);

/**
 * Pharma is highlighted, not the centre: plants built to the strictest
 * standards in construction are the proof a client can trust SAV with anything.
 */
export const pharma = {
  title: 'Pharmaceutical plants, built to the strictest standards',
  lede: `Pharmaceutical plants are held to some of the most demanding standards in construction. ${pharmaProjects.length} of the ${projects.length} projects in our portfolio are pharma plants, from Sava Healthcare’s 3,50,000 sq ft facility at Pithampur to Lupin and Unichem.`,
} as const;

/** The current-work sheet on the homepage: what is on site now. */
export const onSite = {
  title: 'On site now',
  lede: `Under way now: ${currentWork.ongoing.length} projects across Madhya Pradesh and Gujarat, alongside the completed plants clients ask about first.`,
  ongoingTitle: 'Ongoing projects',
  completedTitle: 'Key completed projects',
} as const;

/** The director's differentiators, as the homepage's case for SAV. */
export const why = {
  title: 'Why clients choose SAV',
  lede: 'Seven things set us apart on every site we run.',
} as const;

export const enquiry = {
  title: 'Tell us where, how big, and when you need to start.',
  lede: 'Share the location, approximate built-up area and your target timeline. We will come back to you with a considered response.',
} as const;

const bySlug = (...slugs: string[]): Project[] =>
  slugs.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is Project => p !== undefined);

/** Projects that illustrate a service line, where the data supports the link. */
const serviceProjects: Record<string, Project[]> = {
  'Textile, Pharma, Steel industries': projects.filter((p) => p.sector === 'Pharmaceutical').slice(0, 4),
  'Industrial sheds & refineries': bySlug('adani', 'caparo', 'pratibha'),
  'Roads & development work': bySlug('worth-wellness', 'sava-healthcare'),
  'Silos & storage structures': bySlug('adani', 'jyothy-labs'),
  'High rise, Residential, Commercial & Institutional buildings': bySlug('mahakal-institute', 'liugong'),
};

/** Every service line, with the projects that show it where there are any. */
export const serviceLines = services.items.map((title) => ({
  title,
  projects: serviceProjects[title] ?? [],
}));
