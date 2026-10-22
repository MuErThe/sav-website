/**
 * Search, share and answer-engine data: the names people search for, the work
 * buyers look for, where SAV works, and the questions the About page answers.
 *
 * Page titles and descriptions stay with their pages; this file holds what
 * several outputs share (structured data, llms.txt, the FAQ), so the
 * keywords are adjusted in one place.
 */

import { company, contact, upcl, quality, warehouse } from './company';
import { projects } from './projects';

/**
 * Every name the company is searched by. "UPCL" alone is never used on its
 * own: across India it means Uttarakhand Power Corporation, so the former
 * name always travels with "Indore" or "Construction".
 */
export const brandNames = [
  company.name,
  'SAV Constructions',
  'SAV Construction Indore',
  company.legalName,
  'Solid Assured Valued Construction',
  upcl.name,
  'UPCL Construction',
  'UPCL Indore',
] as const;

/** What the company does, in the words buyers search with. */
export const expertise = [
  'Industrial construction',
  'Pharmaceutical plant construction',
  'Pharma factory civil works',
  'Industrial shed construction',
  'Factory building construction',
  'Pre-engineered building (PEB) civil works',
  'Warehouse construction',
  'Site development and internal roads',
  'Heavy machine foundations',
  'Effluent and waste treatment plant civil works',
  'Water retaining structures',
  'Silos and storage structures',
  'Institutional campus construction',
  'Shuttering and scaffolding',
  'Formwork',
] as const;

/** Places SAV builds, most local first. */
export const serviceArea = {
  places: ['Indore', 'Pithampur', 'Dewas', 'Betma', 'Ujjain', 'Bhopal', 'Mandideep', 'Madhya Pradesh', 'Gujarat', 'India'],
} as const;

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

const pharmaNames = projects.filter((project) => project.sector === 'Pharmaceutical').map((project) => project.name);

/** Shown on the About page and published as FAQPage structured data. */
export const faqs: readonly Faq[] = [
  {
    question: 'Is SAV Construction the same company as UPCL?',
    answer: `Yes. ${company.name} was established in ${company.established} as ${upcl.name} (${upcl.short}) and was re-established under its new name in ${company.reEstablished}. It works with the same team, staff, machinery and equipment, and is backed by ${upcl.short}.`,
  },
  {
    question: 'What does SAV Construction build?',
    answer:
      'SAV Construction is an industrial and infrastructure contractor. It builds pharmaceutical plants, industrial sheds and factory buildings, warehouses, heavy machine foundations, effluent treatment plants, water retaining structures, roads and site development, and institutional buildings.',
  },
  {
    question: 'Which pharmaceutical plants has SAV Construction built?',
    answer: `SAV Construction has built or is building plants for ${pharmaNames.slice(0, -1).join(', ')} and ${pharmaNames.at(-1)}. Most are in Smart Industrial Park, Pithampur, near Indore.`,
  },
  {
    question: 'Where is SAV Construction based, and where does it work?',
    answer:
      'SAV Construction has its head office and yard in Indore, Madhya Pradesh. It works across Madhya Pradesh, including Pithampur, Dewas, Betma and Mandideep near Bhopal, and in Gujarat and other states.',
  },
  {
    question: 'Does SAV Construction have its own shuttering and scaffolding?',
    answer: `Yes. SAV runs ${warehouse.note.charAt(0).toLowerCase()}${warehouse.note.slice(1)}, holding about 3.5 lakh sq ft of plywood and steel shuttering, over 1,800 tonnes of cup-lock scaffolding, more than 200 machines and tools and over 60 construction vehicles. Its own workshop makes formwork for its sites, so work does not wait on hired material.`,
  },
  {
    question: 'Is SAV Construction ISO certified?',
    answer: `Yes. SAV Construction is an ${quality.standard} (Quality Management System) certified firm, and it keeps a zero-accident record across its major project sites.`,
  },
  {
    question: 'How do I contact SAV Construction about a project?',
    answer:
      `Call ${contact.phone}, email ${contact.email}, or send an enquiry through the contact page at www.sav.construction/contact.`,
  },
];
