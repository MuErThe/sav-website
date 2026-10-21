import { root } from './paths';

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

export function navFor(): readonly NavItem[] {
  return [
    { href: `${root}/`, label: 'Home' },
    { href: `${root}/projects/`, label: 'Projects' },
    { href: `${root}/capabilities/`, label: 'Capabilities' },
    { href: `${root}/gallery/`, label: 'Gallery' },
    { href: `${root}/about/`, label: 'About' },
    { href: `${root}/people/`, label: 'People' },
    { href: `${root}/contact/`, label: 'Contact' },
  ];
}

/** True when `href` is the current page, tolerant of trailing slashes. */
export function isCurrent(href: string, pathname: string): boolean {
  const normalise = (value: string) => (value.endsWith('/') ? value : `${value}/`);
  return normalise(href) === normalise(pathname);
}
