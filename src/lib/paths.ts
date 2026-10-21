/**
 * The site's root, without a trailing slash: empty locally, or the repository
 * path when the site is published under one (e.g. "/sav-site" on GitHub Pages).
 * Every hard-coded internal link starts from here, so the base path is set once.
 */
export const root = import.meta.env.BASE_URL.replace(/\/$/, '');

/** An internal path prefixed with the site root, e.g. `url('/favicon.ico')`. */
export const url = (path: string): string => `${root}${path}`;
