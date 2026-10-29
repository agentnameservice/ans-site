import { defineConfig } from 'astro/config';

const site = new URL(process.env.SITE_URL || 'https://ansinfo.ai/');
const base = site.pathname.replace(/\/$/, '');

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
});
