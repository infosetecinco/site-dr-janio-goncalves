import { test } from 'node:test';
import assert from 'node:assert/strict';

import * as config from '../src/site.config.mjs';

/** Frases vedadas pelo briefing (comparação sem acento/caixa). */
const FORBIDDEN = [
  'sorriso perfeito',
  'indolor',
  'resultado definitivo',
  'risco zero',
  'o melhor dentista',
  'transformacao garantida',
  'sem filas',
  'resposta imediata',
  'garantid',
  'garantia',
  '100%',
  'especialista',
  'especialidade',
  'renove',
  'andrieli',
  'pmma',
  'planejamento digital',
  '4,9',
  '4.9',
  'parcelamento',
  'desconto',
  'eliminar qualquer ansiedade',
  'inserir',
];

const normalize = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function collectStrings(value, path = 'config', out = []) {
  if (typeof value === 'string') out.push({ path, value });
  else if (Array.isArray(value)) value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
  else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => collectStrings(item, `${path}.${key}`, out));
  }
  return out;
}

const PUBLIC_KEYS = [
  'site', 'brand', 'professional', 'clinic', 'contact', 'address', 'hours', 'hoursShort', 'messages', 'nav',
  'labels', 'hero', 'about', 'treatments', 'careSteps', 'differentials', 'clinicSection', 'reviews', 'faq',
  'location', 'finalCta', 'footer',
];

test('contact data is internally consistent', () => {
  assert.match(config.contact.whatsappNumber, /^\d{12,13}$/);
  assert.equal(config.contact.phoneE164, `+${config.contact.whatsappNumber}`);
  const displayDigits = config.contact.phoneDisplay.replace(/\D/g, '');
  assert.ok(config.contact.whatsappNumber.endsWith(displayDigits), 'display phone must match the WhatsApp number');
  assert.ok(config.contact.whatsappNumber.startsWith('5562'), 'DDD 62 from the client material must be preserved');
  assert.ok(config.contact.instagramUrl.includes(config.contact.instagramHandle));
});

test('address lines and full address agree', () => {
  assert.ok(config.address.full.includes(config.address.street));
  assert.ok(config.address.full.includes(config.address.number));
  assert.ok(config.address.full.includes(config.address.zip));
  assert.ok(config.address.lines.some((line) => line.includes(config.address.zip)));
});

test('treatment catalogue has six unique, complete entries', () => {
  const { items } = config.treatments;
  assert.equal(items.length, 6);
  assert.equal(new Set(items.map((item) => item.id)).size, 6);
  for (const item of items) {
    assert.match(item.id, /^[a-z0-9-]+$/);
    assert.ok(item.name.length > 3);
    assert.ok(item.summary.length > 40);
    assert.ok(item.detail.intro.length > 40);
    assert.ok(item.detail.topics.length >= 3);
  }
});

test('navigation targets the expected anchors and excludes reviews by default', () => {
  const hrefs = config.nav.map((item) => item.href);
  assert.deepEqual(hrefs, ['#inicio', '#sobre', '#tratamentos', '#clinica', '#faq', '#localizacao']);
  assert.equal(config.reviews.confirmed, false);
  assert.deepEqual(config.reviews.items, []);
});

test('whatsapp message templates follow the briefing', () => {
  assert.ok(config.messages.treatment.includes('[tratamento]'));
  assert.ok(config.messages.general.startsWith('Olá!'));
  assert.ok(config.messages.faq.includes('antes de agendar'));
});

test('public copy contains no forbidden promises or inherited references', () => {
  const strings = PUBLIC_KEYS.flatMap((key) => collectStrings(config[key], key));
  const offenders = [];
  for (const { path, value } of strings) {
    const text = normalize(value);
    for (const phrase of FORBIDDEN) {
      if (text.includes(normalize(phrase))) offenders.push(`${path}: "${phrase}"`);
    }
  }
  assert.deepEqual(offenders, []);
});

test('unconfirmed data stays empty instead of placeholders', () => {
  assert.equal(config.professional.registration, null);
  assert.equal(config.brand.logo, null);
  assert.equal(config.footer.privacyPolicyUrl, null);
  assert.equal(config.site.isPreview, true);
  assert.ok(config.publicationChecklist.length >= 10);
});
