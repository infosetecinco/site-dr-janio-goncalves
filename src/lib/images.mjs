/**
 * Gera <picture> responsivo a partir do manifesto produzido por scripts/optimize-images.py.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { html, raw } from './html.mjs';

const manifestPath = fileURLToPath(new URL('../img/manifest.json', import.meta.url));
let manifestCache = null;

export function loadManifest() {
  if (!manifestCache) {
    manifestCache = JSON.parse(readFileSync(manifestPath, 'utf8'));
  }
  return manifestCache;
}

export function imageEntry(name) {
  const entry = loadManifest()[name];
  if (!entry) throw new Error(`Imagem "${name}" não encontrada em src/img/manifest.json. Rode: npm run images`);
  return entry;
}

function srcset(entry, format, basePath) {
  return entry.sizes.map((size) => `${basePath}/${size[format]} ${size.width}w`).join(', ');
}

function largest(entry) {
  return entry.sizes[entry.sizes.length - 1];
}

/**
 * @param {object} options
 * @param {string} options.name          chave no manifesto (ex.: "retrato-principal")
 * @param {string} [options.mobileName]  variante com recorte específico para telas pequenas
 * @param {string} options.alt           texto alternativo (string vazia para decorativa)
 * @param {string} options.sizes         atributo sizes (desktop)
 * @param {string} [options.mobileSizes] atributo sizes para a variante mobile
 * @param {string} [options.className]   classe do <img>
 * @param {'eager'|'lazy'} [options.loading]
 * @param {'high'|'auto'} [options.fetchpriority]
 * @param {string} [options.basePath]
 * @param {number} [options.mobileMaxWidth]  limite (px) do media query da variante mobile
 */
export function picture(options) {
  const {
    name,
    mobileName,
    alt,
    sizes,
    mobileSizes = '100vw',
    className = '',
    loading = 'lazy',
    fetchpriority,
    basePath = 'assets/img',
    mobileMaxWidth = 767,
  } = options;

  const entry = imageEntry(name);
  const fallback = largest(entry);
  const mobile = mobileName ? imageEntry(mobileName) : null;
  const media = `(max-width: ${mobileMaxWidth}px)`;

  const sources = [];
  if (mobile) {
    sources.push(html`<source media="${media}" type="image/webp" srcset="${srcset(mobile, 'webp', basePath)}" sizes="${mobileSizes}">`);
    sources.push(html`<source media="${media}" type="image/jpeg" srcset="${srcset(mobile, 'jpg', basePath)}" sizes="${mobileSizes}">`);
  }
  sources.push(html`<source type="image/webp" srcset="${srcset(entry, 'webp', basePath)}" sizes="${sizes}">`);

  const priority = fetchpriority ? raw(` fetchpriority="${fetchpriority}"`) : '';
  const decoding = loading === 'eager' ? 'sync' : 'async';

  return html`<picture>${sources}<img class="${className}" src="${basePath}/${fallback.jpg}" srcset="${srcset(entry, 'jpg', basePath)}" sizes="${sizes}" width="${entry.width}" height="${entry.height}" alt="${alt}" loading="${loading}" decoding="${decoding}"${priority}></picture>`;
}
