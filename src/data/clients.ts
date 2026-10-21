/**
 * Client logo wall. Logos were extracted from the company profile deck.
 *
 * `file` matches a PNG in `src/assets/clients/`. Names are used as the
 * accessible label for each logo, so information is never carried by the
 * image alone.
 */

export interface Client {
  readonly file: string;
  readonly name: string;
}

export const clients: readonly Client[] = [
  { file: 'dabur', name: 'Dabur' },
  { file: 'alembic', name: 'Alembic' },
  { file: 'welspun', name: 'Welspun' },
  { file: 'gufic', name: 'Gufic' },
  { file: 'liugong', name: 'LiuGong' },
  { file: 'encube', name: 'Encube' },
  { file: 'sava-healthcare', name: 'Sava Healthcare' },
  { file: 'zf-india', name: 'ZF India' },
  { file: 'adani', name: 'Adani' },
  { file: 'rrcat', name: 'RRCAT' },
  { file: 'mahle', name: 'Mahle' },
  { file: 'university-emblem', name: 'University client' },
  { file: 'reliance', name: 'Reliance' },
  { file: 'lupin', name: 'Lupin Pharmaceuticals' },
  { file: 'airports-authority-of-india', name: 'Airports Authority of India' },
  { file: 'unichem', name: 'Unichem Laboratories' },
  { file: 'mp-public-works-department', name: 'Madhya Pradesh Public Works Department' },
  { file: 'kirloskar', name: 'Kirloskar' },
  { file: 'shalby-hospitals', name: 'Shalby Hospitals' },
  { file: 'heg', name: 'HEG Limited' },
  { file: 'daawat-foods', name: 'Daawat Foods' },
  { file: 'maral-overseas', name: 'Maral Overseas' },
  { file: 'ruchi-group', name: 'Ruchi Group' },
  { file: 'sayaji', name: 'Sayaji' },
  { file: 'man-industries', name: 'MAN Industries (India)' },
  { file: 'symbiosis', name: 'Symbiosis' },
  { file: 'kores', name: 'Kores' },
  { file: 'state-bank-of-indore', name: 'State Bank of Indore' },
  { file: 'pratibha', name: 'Pratibha' },
  { file: 'gajra-gears', name: 'Gajra Gears' },
  { file: 'zed-black', name: 'Zed Black' },
  { file: 'khaitan-agrotech', name: 'Khaitan Agrotech' },
  { file: 'vistara', name: 'Vistara' },
  { file: 'dsl', name: 'DSL' },
  { file: 'inox', name: 'INOX' },
  { file: 'piramal', name: 'Piramal' },
  { file: 'mahakal-institutes', name: 'Mahakal Group of Institutes' },
  { file: 'prestige-group', name: 'Prestige Group' },
  { file: 'national-steel-agro', name: 'National Steel and Agro Industries' },
  { file: 'thermax', name: 'Thermax' },
  { file: 'caparo', name: 'Caparo' },
];
