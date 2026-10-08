/**
 * Servidor estático mínimo para visualizar dist/ localmente (sem dependências).
 *
 *   node scripts/serve.mjs            -> http://localhost:4173
 *   PORT=5000 node scripts/serve.mjs
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const PORT = Number(process.env.PORT) || 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const target = resolve(join(ROOT, normalized));
  if (!target.startsWith(ROOT + sep) && target !== ROOT) return null;
  return target;
}

const server = createServer(async (request, response) => {
  let target = safePath(request.url || '/');
  if (!target) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  try {
    let info = await stat(target);
    if (info.isDirectory()) {
      target = join(target, 'index.html');
      info = await stat(target);
    }
    const type = MIME[extname(target).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': info.size,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Não encontrado. Rode "npm run build" antes de servir.');
  }
});

server.listen(PORT, () => {
  console.log(`Prévia disponível em http://localhost:${PORT} (servindo ${ROOT})`);
});
