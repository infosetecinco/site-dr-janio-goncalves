import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as baseConfig from '../src/site.config.mjs';
import { buildNav, renderPage } from '../src/templates/page.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const render = (overrides = {}) => renderPage({ ...baseConfig, ...overrides }, { year: 2026 });
const html = render();

const attrValues = (source, attr) => [...source.matchAll(new RegExp(`${attr}="([^"]*)"`, 'g'))].map((m) => m[1]);

test('renders a single h1 and the pt-BR language', () => {
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.startsWith('<!doctype html>\n<html lang="pt-BR">'));
});

test('every internal anchor points to an existing id', () => {
  const ids = new Set(attrValues(html, 'id'));
  const anchors = attrValues(html, 'href').filter((href) => href.startsWith('#'));
  assert.ok(anchors.length >= 10);
  const missing = anchors.filter((href) => !ids.has(href.slice(1)));
  assert.deepEqual(missing, []);
});

test('all WhatsApp links use the configured number with an encoded message', () => {
  const links = attrValues(html, 'href').filter((href) => href.includes('wa.me'));
  assert.ok(links.length >= 15, `expected many WhatsApp CTAs, found ${links.length}`);
  for (const link of links) {
    assert.ok(link.startsWith(`https://wa.me/${baseConfig.contact.whatsappNumber}?text=`), link);
    assert.ok(!/[ À-ſ]/.test(link), `message must be percent-encoded: ${link}`);
  }
  const treatmentLinks = links.filter((link) => link.includes(encodeURIComponent('tirar dúvidas sobre')));
  assert.equal(treatmentLinks.length, baseConfig.treatments.items.length * 2, 'one per card + one per dialog');
  for (const item of baseConfig.treatments.items) {
    assert.ok(treatmentLinks.some((link) => link.includes(encodeURIComponent(item.name))), item.name);
  }
  assert.ok(html.includes(`href="tel:${baseConfig.contact.phoneE164}"`));
});

test('does not ship placeholders, inherited assets or runtime CSS frameworks', () => {
  assert.ok(!/\[(inserir|cro|inscri)/i.test(html));
  assert.ok(!html.includes('[tratamento]'));
  for (const banned of ['cdn.tailwindcss.com', 'font-awesome', 'fontawesome', 'unsplash.com', 'Renove', 'Andrieli', 'PMMA']) {
    assert.ok(!html.includes(banned), `must not contain ${banned}`);
  }
  const scripts = attrValues(html, 'src').filter((src) => src.endsWith('.js'));
  assert.deepEqual(scripts, ['assets/js/site.js']);
});

test('every referenced image exists in src/img', () => {
  const refs = new Set(
    [...html.matchAll(/assets\/img\/([\w.-]+\.(?:webp|jpg|png|svg))/g)].map((m) => m[1]),
  );
  assert.ok(refs.size >= 20);
  const missing = [...refs].filter((name) => !existsSync(join(ROOT, 'src', 'img', name)));
  assert.deepEqual(missing, []);
});

test('hides reviews and keeps them out of the menu until confirmed', () => {
  assert.ok(!html.includes('id="avaliacoes"'));
  assert.ok(!html.includes('Avaliações'));
  assert.ok(!html.includes('4,9'));
  assert.deepEqual(buildNav(baseConfig).map((i) => i.href), baseConfig.nav.map((i) => i.href));

  const confirmed = {
    ...baseConfig.reviews,
    confirmed: true,
    source: { label: 'Google', url: 'https://maps.google.com/?cid=1', subject: 'clinic' },
    items: [{ author: 'Paciente A.', text: 'Texto autorizado.', date: '2026-01-15', url: 'https://maps.google.com/?cid=1' }],
  };
  const withReviews = render({ reviews: confirmed });
  assert.ok(withReviews.includes('id="avaliacoes"'));
  assert.ok(withReviews.includes('Texto autorizado.'));
  assert.ok(withReviews.includes('datetime="2026-01-15"'));
  assert.ok(withReviews.includes('href="#avaliacoes">Avaliações</a>'));
  assert.deepEqual(
    buildNav({ ...baseConfig, reviews: confirmed }).map((i) => i.href),
    ['#inicio', '#sobre', '#tratamentos', '#clinica', '#avaliacoes', '#faq', '#localizacao'],
  );
});

test('optional professional data only renders when confirmed', () => {
  assert.ok(!html.includes('about__registration'));
  assert.ok(!html.includes('Política de Privacidade'));
  const filled = render({
    professional: { ...baseConfig.professional, registration: 'CRO-MT 00000' },
    footer: { ...baseConfig.footer, privacyPolicyUrl: 'politica-de-privacidade.html' },
  });
  assert.ok(filled.includes('<p class="about__registration">CRO-MT 00000</p>'));
  assert.ok(filled.includes('href="politica-de-privacidade.html">Política de Privacidade</a>'));
});

test('map is a placeholder until an exact embed URL exists, then loads on demand', () => {
  assert.ok(html.includes('map--placeholder'));
  assert.ok(!html.includes('<iframe'));
  assert.ok(html.includes('https://www.google.com/maps/search/?api=1&amp;query='));
  const withMap = render({ address: { ...baseConfig.address, mapEmbedUrl: 'https://www.google.com/maps/embed?pb=EXATO' } });
  assert.ok(withMap.includes('data-map-src="https://www.google.com/maps/embed?pb=EXATO"'));
  assert.ok(!withMap.includes('<iframe'), 'iframe must be injected only on demand');
});

test('preview flag controls indexing and canonical/og url', () => {
  assert.ok(html.includes('<meta name="robots" content="noindex, nofollow">'));
  assert.ok(!html.includes('rel="canonical"'));
  const published = render({ site: { ...baseConfig.site, isPreview: false, url: 'https://exemplo.com.br/' } });
  assert.ok(!published.includes('noindex'));
  assert.ok(published.includes('<link rel="canonical" href="https://exemplo.com.br">'));
  assert.ok(published.includes('content="https://exemplo.com.br/assets/img/og-retrato.jpg"'));
});

test('treatment dialogs are wired with accessible names and close controls', () => {
  for (const item of baseConfig.treatments.items) {
    const id = `tratamento-${item.id}`;
    assert.ok(html.includes(`data-dialog-open="${id}"`));
    assert.ok(html.includes(`<dialog class="dialog" id="${id}" aria-labelledby="${id}-title"`));
    assert.ok(html.includes(`id="${id}-title"`));
  }
  assert.equal((html.match(/data-dialog-close/g) || []).length, baseConfig.treatments.items.length * 2);
});

test('accordion buttons reference their panels', () => {
  const buttons = [...html.matchAll(/aria-controls="(faq-panel-\d+)"/g)].map((m) => m[1]);
  assert.equal(buttons.length, baseConfig.faq.items.length);
  for (const id of buttons) assert.ok(html.includes(`id="${id}"`));
});

test('escapes HTML coming from the configuration', () => {
  const hostile = render({ hero: { ...baseConfig.hero, title: '<script>alert(1)</script>' } });
  assert.ok(!hostile.includes('<script>alert(1)</script>'));
  assert.ok(hostile.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
});
