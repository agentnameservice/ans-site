import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const dir = process.env.PREVIEW_DIR || 'dist-preview';
const port = Number(process.env.PORT || 8080);
if (!existsSync(dir)) {
  console.error(`${dir}/ does not exist. Run: npm run build:preview`);
  process.exit(1);
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.vtt': 'text/vtt; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(dir, pathname));
  if (!file.startsWith(normalize(dir))) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${pathname}/` }).end();
      return;
    }
    file = join(file, 'index.html');
  }
  if (!existsSync(file)) {
    file = join(dir, pathname.split('/')[1] || '', '404.html');
    if (!existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(404, { 'Content-Type': types['.html'] });
    createReadStream(file).pipe(res);
    return;
  }
  res.writeHead(200, {
    'Content-Type': types[extname(file)] || 'application/octet-stream',
  });
  createReadStream(file).pipe(res);
})
  .on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(
        `Port ${port} is already in use, so a preview server may already be running at http://127.0.0.1:${port}/. Set PORT to use another port.`,
      );
      process.exit(1);
    }
    throw error;
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Serving ${dir}/ at http://127.0.0.1:${port}/`);
  });
