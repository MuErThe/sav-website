# SAV Construction website

The website for Solid Assured Valued Construction Pvt. Ltd., formerly UPCL. It is a static
site built with [Astro](https://astro.build) and deployed on Vercel from the `main` branch
of the GitHub repository: every push to `main` publishes the site.

## Run it

```bash
npm install
npm run dev      # local site at http://localhost:4321
npm run check    # type and template checks; must report 0 errors
npm run build    # the published site, in dist/
```

## Where things live

| What | Where |
| --- | --- |
| Company facts: names, phone, email, offices, ISO, yard stock, safety | `src/data/company.ts` |
| Projects | `src/data/projects.ts` |
| People and the organisation chart | `src/data/people.ts` |
| Client logos | `src/data/clients.ts` and `src/assets/clients/` |
| Home page wording | `src/data/story.ts` |
| Search, sharing and the FAQ | `src/data/seo.ts` |
| Photographs | `src/assets/` |

Change a fact in its data file and every page that shows it updates.

## Add a project

1. Add an entry to `src/data/projects.ts`. Copy an existing one and fill in `slug` (lower
   case, hyphens, used in the address), `name`, `sector`, `scope`, `summary` and
   `featured`. `location` and `area` are optional.
2. Make a folder `src/assets/projects/<slug>/` and put the photographs in it as JPG,
   named `01-what-it-shows.jpg`, `02-...`. The number sets the order and the rest of the
   name becomes the caption. Use the largest original you have, at least 1600 px wide;
   the build makes every smaller size itself.
3. Run `npm run build`. The project page, its share image and the sitemap entry appear.

A project with no photographs borrows a related one, marked as representative.

## Contact form

Until `PUBLIC_CONTACT_ENDPOINT` is set (see `.env.example`), the form opens the visitor's
own email app with the enquiry written out to info@sav.construction, and they press send.
For devices with no email app it then shows the address and a button that copies the
message. Once a sending service is in place, set the variable and the form sends in the
background instead.

## Checking a change

`audit/` holds the site audit and its harness. `audit/pass.sh <label> --shots` builds the
site and compares every page's text, links, metadata and screenshots with the baseline.

## Known limitations

- The hero video is a stock clip, not an SAV site.
- Several projects show representative photographs until their own are supplied.
