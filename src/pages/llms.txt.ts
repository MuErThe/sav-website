import type { APIRoute } from 'astro';
import { company, contact, quality, upcl, warehouse } from '../data/company';
import { brandNames, expertise, faqs, serviceArea } from '../data/seo';
import { absolute, pages, projectPages } from '../lib/routes';

/**
 * A plain summary for AI assistants and answer engines (llmstxt.org format),
 * built from the same data as the site so it never drifts from it.
 */
export const GET: APIRoute = ({ site }) => {
  const body = `# ${company.name}

> ${company.name} (${company.legalName}), formerly ${upcl.name} (${upcl.short}), is an industrial and infrastructure construction contractor based in Indore, Madhya Pradesh, India. It builds pharmaceutical plants, industrial sheds, factory buildings and site development, and has been working since ${company.established}.

- Also known as: ${brandNames.filter((name) => name !== company.name).join(', ')}
- Established ${company.established} as ${upcl.short}; re-established as ${company.name} in ${company.reEstablished}, with the same team, staff, machinery and equipment.
- ${quality.certification}. Zero accidents recorded across major project sites.
- ${warehouse.note}, with its own formwork workshop: ${warehouse.items.map((item) => `${item.value} ${item.label.toLowerCase()}`).join('; ')}.
- Works in: ${serviceArea.places.join(', ')}.
- Expertise: ${expertise.join(', ')}.
- Contact: ${contact.phone}, ${contact.email}. Head office: ${contact.offices[1]?.lines.join(', ')}.

## Pages

${pages.map((page) => `- [${page.name}](${absolute(page.path, site)}): ${page.about}`).join('\n')}

## Projects

${projectPages.map(({ path, project }) => `- [${project.name}](${absolute(path, site)}): ${project.summary}`).join('\n')}

## Common questions

${faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
