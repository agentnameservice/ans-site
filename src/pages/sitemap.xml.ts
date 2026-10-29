import type { APIRoute } from 'astro';
import { url } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const routes = [
    '',
    'how-it-works/',
    'for-developers/',
    'ecosystem/',
    'docs/',
    'about/',
    'community/',
    'privacy/',
  ];
  const entries = routes
    .map((path) => `<url><loc>${new URL(url(path), site).href}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
