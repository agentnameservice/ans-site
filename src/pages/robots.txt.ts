import type { APIRoute } from 'astro';
import { url } from '../data/site';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\n${import.meta.env.SITE_DESIGN_PREVIEW ? 'Disallow' : 'Allow'}: /\nSitemap: ${new URL(url('sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
