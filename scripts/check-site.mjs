import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const site = new URL(process.env.SITE_URL || 'https://ansinfo.ai/');
const base = site.pathname.replace(/\/$/, '');
const files = readdirSync('dist', { recursive: true }).filter((file) =>
  file.endsWith('.html'),
);
const titles = new Set();
let links = 0;

assert(files.length > 0, 'Build the site before checking it.');
for (const file of files) {
  const html = readFileSync(join('dist', file), 'utf8');
  const redirect = /http-equiv="refresh"/i.test(html);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title, `${file}: missing title`);
  if (!redirect) {
    assert(!titles.has(title), `${file}: duplicate title`);
    titles.add(title);
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${file}: expected one h1`,
    );
    assert.match(html, /<html[^>]+lang="en"/, `${file}: missing language`);
    assert.match(
      html,
      /<meta name="description" content="[^"]+"/,
      `${file}: missing description`,
    );
    assert.match(
      html,
      /<link rel="canonical" href="https:\/\//,
      `${file}: missing canonical`,
    );
    assert.match(html, /<main id="main"/, `${file}: missing main landmark`);
    assert(
      !/<script\b|<iframe\b|<form\b/i.test(html),
      `${file}: unexpected script, embed, or form`,
    );
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt="[^"]*"/.test(match[0]), `${file}: image without alt text`);
  }
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    assert(
      !href.startsWith('//'),
      `${file}: unexpected external protocol-relative URL`,
    );
    const currentPath =
      file === 'index.html' ? '' : file.replace(/index\.html$/, '');
    const target = new URL(href, `${site.origin}${base}/${currentPath}`);
    assert(
      target.pathname.startsWith(`${base}/`),
      `${file}: link escapes deployment base: ${href}`,
    );
    let path = decodeURIComponent(target.pathname.slice(base.length + 1));
    if (!path || path.endsWith('/')) path += 'index.html';
    assert(
      existsSync(join('dist', path)),
      `${file}: broken local link ${href}`,
    );
    if (target.hash && path.endsWith('.html')) {
      const id = decodeURIComponent(target.hash.slice(1));
      assert(
        readFileSync(join('dist', path), 'utf8').includes(`id="${id}"`),
        `${file}: missing anchor ${href}`,
      );
    }
    links++;
  }
}
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.equal(
  (sitemap.match(/<loc>/g) || []).length,
  8,
  'Sitemap should contain the eight indexed content pages.',
);
assert(
  !sitemap.includes('/404') &&
    !sitemap.includes('/frameworks') &&
    !sitemap.includes('/contact') &&
    !sitemap.includes('/news') &&
    !sitemap.includes('/for-business') &&
    !sitemap.includes('/governance'),
  'Redirects, placeholders, and errors must not be indexed.',
);
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  assert(
    match[1].startsWith(`${site.origin}${base}/`),
    `Sitemap URL has wrong base: ${match[1]}`,
  );
  const path = new URL(match[1]).pathname.slice(base.length + 1);
  assert(
    existsSync(join('dist', path, 'index.html')),
    `Missing sitemap page: ${path}`,
  );
}
assert(
  readFileSync('dist/robots.txt', 'utf8').includes(
    `${site.origin}${base}/sitemap.xml`,
  ),
);
console.log(
  `Checked ${files.length} HTML pages, ${links} local references, metadata, landmarks, zero client scripts, and sitemap.`,
);
