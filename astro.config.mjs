import { defineConfig, envField } from 'astro/config';

const site = new URL(process.env.SITE_URL || 'https://ansinfo.ai/');
const base = site.pathname.replace(/\/$/, '');
const analyticsId = process.env.SITE_ANALYTICS_ID;
if (analyticsId && !/^[a-z0-9-]+$/i.test(analyticsId)) {
  throw new Error(
    `SITE_ANALYTICS_ID must be a GoatCounter site code, received "${analyticsId}"`,
  );
}

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
  env: {
    schema: {
      SITE_ANALYTICS_ID: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
    },
  },
});
