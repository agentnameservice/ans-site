import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { designs } from '../src/data/designs.ts';

const root = new URL(process.env.PREVIEW_URL || 'http://127.0.0.1:8080/');
if (!root.pathname.endsWith('/')) root.pathname += '/';
const out = process.env.PREVIEW_DIR || 'dist-preview';
const run = (script, args, env) =>
  execFileSync('npm', ['run', '--silent', script, '--', ...args], {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
const siteUrl = (slug) => new URL(`${slug}/`, root).href;

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const { slug } of designs) {
  console.log(`\nBuilding the ${slug} design for ${siteUrl(slug)}`);
  run('build', ['--outDir', join(out, slug)], {
    SITE_URL: siteUrl(slug),
    SITE_DESIGN: slug,
    SITE_DESIGN_PREVIEW: '1',
  });
}
for (const { slug } of designs) {
  run('test', [], {
    SITE_URL: siteUrl(slug),
    DIST_DIR: join(out, slug),
    LINK_ROOT_URL: root.href,
    LINK_ROOT_DIR: out,
  });
}
const first = siteUrl(designs[0].slug);
writeFileSync(
  join(out, 'index.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>ANS design preview</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${first}"><link rel="canonical" href="${first}"></head><body><p><a href="${first}">Open the design preview</a>.</p></body></html>\n`,
);
writeFileSync(join(out, '.nojekyll'), '');
console.log(
  `\nPreview written to ${out}/ with ${designs.length} designs for ${root.href}`,
);
if (root.hostname === '127.0.0.1') {
  console.log('Serve it with: npm run preview:designs');
}
