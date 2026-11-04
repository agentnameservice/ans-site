import { defineConfig } from 'astro/config';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { designSlugs } from './src/data/designs.ts';

const site = new URL(process.env.SITE_URL || 'https://ansinfo.ai/');
const base = site.pathname.replace(/\/$/, '');
const design = process.env.SITE_DESIGN || 'current';
if (!designSlugs.includes(design)) {
  throw new Error(
    `Unknown SITE_DESIGN "${design}". Expected one of: ${designSlugs.join(', ')}.`,
  );
}
const designDir = (name) =>
  fileURLToPath(new URL(`./src/designs/${name}/`, import.meta.url));
const pagesIn = (name) => {
  const dir = `${designDir(name)}pages`;
  return existsSync(dir) ? readdirSync(dir) : [];
};
const pageFiles = new Set([...pagesIn('shared'), ...pagesIn(design)]);
const pageAlias = [...pageFiles].map((file) => {
  const own = `${designDir(design)}pages/${file}`;
  return {
    find: new RegExp(`^@design-pages/${file.replace('.', '\\.')}$`),
    replacement: existsSync(own) ? own : `${designDir('shared')}pages/${file}`,
  };
});

export default defineConfig({
  site: site.origin,
  base: site.pathname,
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/frameworks': `${base}/ecosystem/`,
    '/contact': `${base}/community/`,
    '/news': `${base}/about/#project-history`,
    '/for-business': `${base}/about/#use-cases`,
  },
  vite: {
    resolve: {
      alias: [
        ...pageAlias,
        { find: /^@design\//, replacement: designDir(design) },
      ],
    },
    define: {
      'import.meta.env.SITE_DESIGN': JSON.stringify(design),
      'import.meta.env.SITE_DESIGN_PREVIEW': JSON.stringify(
        Boolean(process.env.SITE_DESIGN_PREVIEW),
      ),
    },
  },
});
