export const designs = [
  { slug: 'current', label: 'Current' },
  { slug: 'cobalt', label: 'Cobalt' },
  { slug: 'almanac', label: 'Almanac' },
  { slug: 'console', label: 'Console' },
] as const;

export type DesignSlug = (typeof designs)[number]['slug'];

export const designSlugs: readonly string[] = designs.map((d) => d.slug);
