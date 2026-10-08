/**
 * Build estático sem dependências.
 *
 *   node scripts/build.mjs            -> gera dist/
 *
 * Etapas:
 *  1. Renderiza index.html a partir de src/site.config.mjs + src/templates/.
 *  2. Concatena o CSS (src/css/*.css na ordem definida) em dist/assets/css/site.css.
 *  3. Concatena o JS de runtime (src/js/*.js na ordem definida) em dist/assets/js/site.js.
 *  4. Copia as imagens otimizadas (src/img/*.webp|jpg) e os ícones (src/static/).
 */
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as config from '../src/site.config.mjs';
import { renderPage } from '../src/templates/page.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

/** Ordem importa: tokens primeiro, seções depois. */
const CSS_ORDER = ['tokens.css', 'base.css', 'components.css', 'header.css', 'sections.css', 'footer.css'];
const JS_ORDER = ['utils.js', 'header.js', 'menu.js', 'accordion.js', 'dialogs.js', 'map.js', 'main.js'];

async function concat(dir, order, { wrap } = {}) {
  const parts = [];
  for (const name of order) {
    const content = await readFile(join(dir, name), 'utf8');
    parts.push(`/* ---- ${name} ---- */\n${content.trim()}\n`);
  }
  const body = parts.join('\n');
  return wrap ? wrap(body) : body;
}

async function copyImages() {
  const from = join(SRC, 'img');
  const to = join(DIST, 'assets', 'img');
  await mkdir(to, { recursive: true });
  const files = (await readdir(from)).filter((name) => /\.(webp|jpe?g|png|svg)$/i.test(name));
  await Promise.all(files.map((name) => cp(join(from, name), join(to, name))));
  return files.length;
}

async function copyStatic() {
  const from = join(SRC, 'static');
  try {
    await stat(from);
  } catch {
    return 0;
  }
  const files = await readdir(from);
  await Promise.all(files.map((name) => cp(join(from, name), join(DIST, name))));
  return files.length;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

export async function build({ year = new Date().getFullYear() } = {}) {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(join(DIST, 'assets', 'css'), { recursive: true });
  await mkdir(join(DIST, 'assets', 'js'), { recursive: true });

  const html = renderPage(config, { year });
  await writeFile(join(DIST, 'index.html'), html, 'utf8');

  const css = await concat(join(SRC, 'css'), CSS_ORDER);
  await writeFile(join(DIST, 'assets', 'css', 'site.css'), css, 'utf8');

  const js = await concat(join(SRC, 'js'), JS_ORDER, {
    wrap: (body) => `(function () {\n'use strict';\n\n${body}\n})();\n`,
  });
  await writeFile(join(DIST, 'assets', 'js', 'site.js'), js, 'utf8');

  const images = await copyImages();
  const statics = await copyStatic();

  return {
    html: Buffer.byteLength(html),
    css: Buffer.byteLength(css),
    js: Buffer.byteLength(js),
    images,
    statics,
    dist: DIST,
  };
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  build()
    .then((result) => {
      console.log(`dist/index.html      ${kb(result.html)}`);
      console.log(`dist/assets/css/site.css ${kb(result.css)}`);
      console.log(`dist/assets/js/site.js   ${kb(result.js)}`);
      console.log(`imagens copiadas: ${result.images} · arquivos estáticos: ${result.statics}`);
      console.log(`Build concluído em ${result.dist}`);
    })
    .catch((error) => {
      console.error('Falha no build:', error);
      process.exitCode = 1;
    });
}
