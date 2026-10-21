/**
 * Project records. Facts come from the company profile deck; where the deck is
 * silent (location, area) the field is simply omitted rather than guessed.
 *
 * Photography lives in `src/assets/projects/<slug>/`. Dropping another image
 * into that folder adds it to the project gallery; see `src/lib/gallery.ts`.
 */

export const SECTORS = ['Pharmaceutical', 'Industrial', 'Institutional'] as const;
export type Sector = (typeof SECTORS)[number];

export interface Project {
  readonly slug: string;
  readonly name: string;
  /** Shown on the project page; falls back to `name` when absent. */
  readonly client?: string;
  readonly sector: Sector;
  readonly location?: string;
  readonly area?: string;
  readonly scope: string;
  /** One-line summary used on cards and in meta descriptions. */
  readonly summary: string;
  /** Featured projects get full detail slides in the deck and lead the site. */
  readonly featured: boolean;
}

export const projects: readonly Project[] = [
  {
    slug: 'sava-healthcare',
    name: 'Sava Healthcare',
    sector: 'Pharmaceutical',
    location: 'Smart Industrial Park, Pithampur',
    area: '3,50,000 sq ft + site development',
    scope: 'Pharmaceutical plant',
    summary:
      'A 3,50,000 sq ft pharmaceutical plant with associated site development at Smart Industrial Park, Pithampur.',
    featured: true,
  },
  {
    slug: 'alembic-pharmaceuticals',
    name: 'Alembic Pharmaceuticals',
    sector: 'Pharmaceutical',
    location: 'Smart Industrial Park, Pithampur',
    area: '3,00,000 sq ft + site development',
    scope: 'Pharmaceutical plant',
    summary:
      'A 3,00,000 sq ft pharmaceutical facility with associated site development at Smart Industrial Park, Pithampur.',
    featured: true,
  },
  {
    slug: 'worth-wellness',
    name: 'Worth Wellness Industries',
    sector: 'Industrial',
    location: 'Machal Industrial Area, Betma',
    area: '3,00,000 sq ft + site development',
    scope: 'Industrial plant',
    summary:
      'A 3,00,000 sq ft industrial plant with site development and approach roads at Machal Industrial Area, Betma.',
    featured: true,
  },
  {
    slug: 'gufic-pharmaceuticals',
    name: 'Gufic Pharmaceuticals',
    sector: 'Pharmaceutical',
    location: 'Smart Industrial Park, Pithampur',
    area: '2,50,000 sq ft + site development',
    scope: 'Pharmaceutical plant',
    summary:
      'A 2,50,000 sq ft pharmaceutical plant with associated site development at Smart Industrial Park, Pithampur.',
    featured: true,
  },
  {
    slug: 'gufic-biosciences',
    name: 'Gufic Biosciences',
    sector: 'Pharmaceutical',
    area: '6,50,000 sq ft site',
    scope: 'Security building, boundary wall and site works',
    summary:
      'Security building, boundary wall and site works across a 6,50,000 sq ft site.',
    featured: false,
  },
  {
    slug: 'lupin',
    name: 'Lupin Limited',
    sector: 'Pharmaceutical',
    area: '1,20,000 sq ft',
    scope: 'Pharmaceutical plant',
    summary: 'A 1,20,000 sq ft pharmaceutical plant.',
    featured: false,
  },
  {
    slug: 'unichem',
    name: 'Unichem Laboratories',
    sector: 'Pharmaceutical',
    scope: 'Pharmaceutical project',
    summary: 'A pharmaceutical facility delivered for Unichem Laboratories.',
    featured: false,
  },
  {
    slug: 'dabur',
    name: 'Dabur India Limited',
    sector: 'Industrial',
    scope: 'Industrial project',
    summary: 'An industrial project with associated site development for Dabur India Limited.',
    featured: false,
  },
  {
    slug: 'welspun',
    name: 'Welspun Industries',
    sector: 'Industrial',
    location: 'Gujarat',
    scope: 'Industrial project',
    summary: 'An industrial project in Gujarat for Welspun Industries.',
    featured: false,
  },
  {
    slug: 'jyothy-labs',
    name: 'Jyothy Labs',
    sector: 'Industrial',
    scope: 'Warehouse building in a running plant',
    summary:
      'A warehouse building constructed inside a running plant, sequenced around live operations.',
    featured: false,
  },
  {
    slug: 'adani',
    name: 'Adani',
    sector: 'Industrial',
    scope: 'Industrial sheds and grain storage silos',
    summary: 'Industrial sheds and grain storage silos delivered for Adani.',
    featured: false,
  },
  {
    slug: 'caparo',
    name: 'Caparo',
    sector: 'Industrial',
    scope: 'Industrial plant',
    summary: 'An industrial plant with boundary works and site development for Caparo.',
    featured: false,
  },
  {
    slug: 'liugong',
    name: 'LiuGong India',
    sector: 'Industrial',
    location: 'Pithampur Industrial Area',
    scope: 'Administration block and plant works',
    summary: 'Administration block and plant works at the LiuGong India facility, Pithampur.',
    featured: false,
  },
  {
    slug: 'mahle',
    name: 'Mahle',
    sector: 'Industrial',
    scope: 'Industrial project',
    summary: 'An industrial project delivered for Mahle.',
    featured: false,
  },
  {
    slug: 'pratibha',
    name: 'Pratibha',
    sector: 'Industrial',
    scope: 'Industrial project',
    summary: 'Industrial buildings and workshop blocks delivered for Pratibha.',
    featured: false,
  },
  {
    slug: 'mahakal-institute',
    name: 'Mahakal Institute of Technology',
    sector: 'Institutional',
    location: 'Ujjain, Madhya Pradesh',
    scope: 'Institutional campus',
    summary: 'An institutional campus development at Ujjain, Madhya Pradesh.',
    featured: false,
  },
];

export const projectsNote = 'All ongoing projects include associated site development works.';

export const featuredProjects = projects.filter((p) => p.featured);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Sectors that actually have projects, in the order declared in SECTORS. */
export const activeSectors = SECTORS.filter((s) => projects.some((p) => p.sector === s));
