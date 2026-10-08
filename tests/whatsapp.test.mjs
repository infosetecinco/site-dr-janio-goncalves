import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMapsSearchLink,
  buildTelLink,
  buildWhatsAppLink,
  normalizeWhatsAppNumber,
  treatmentMessage,
} from '../src/lib/whatsapp.mjs';

test('builds a wa.me link with the full message encoded', () => {
  const message = 'Olá! Conheci o site do Dr. Janio Gonçalves e gostaria de consultar os horários para uma avaliação.';
  const link = buildWhatsAppLink('5562996545987', message);
  assert.equal(link, `https://wa.me/5562996545987?text=${encodeURIComponent(message)}`);
  assert.ok(!link.includes(' '), 'spaces must be encoded');
  assert.ok(link.includes('Ol%C3%A1'), 'accented characters must be percent-encoded');
});

test('omits the text parameter when the message is empty', () => {
  assert.equal(buildWhatsAppLink('5562996545987', ''), 'https://wa.me/5562996545987');
  assert.equal(buildWhatsAppLink('5562996545987', '   '), 'https://wa.me/5562996545987');
});

test('normalizes a formatted number to digits only and rejects invalid ones', () => {
  assert.equal(normalizeWhatsAppNumber('+55 (62) 99654-5987'), '5562996545987');
  assert.throws(() => normalizeWhatsAppNumber(''), /inválido/);
  assert.throws(() => normalizeWhatsAppNumber('123'), /inválido/);
});

test('builds tel: links only from E.164 numbers', () => {
  assert.equal(buildTelLink('+5562996545987'), 'tel:+5562996545987');
  assert.throws(() => buildTelLink('62996545987'), /E\.164/);
  assert.throws(() => buildTelLink('(62) 99654-5987'), /E\.164/);
});

test('interpolates the treatment name into the message template', () => {
  const template = 'Gostaria de tirar dúvidas sobre [tratamento] e consultar horários.';
  assert.equal(treatmentMessage(template, 'Clareamento dental'), 'Gostaria de tirar dúvidas sobre Clareamento dental e consultar horários.');
  assert.throws(() => treatmentMessage('sem marcador', 'x'), /\[tratamento\]/);
});

test('builds a Google Maps search link from the full address', () => {
  const link = buildMapsSearchLink('Rua Paranatinga, 220, Primavera do Leste - MT');
  assert.ok(link.startsWith('https://www.google.com/maps/search/?api=1&query='));
  assert.ok(link.includes(encodeURIComponent('Rua Paranatinga, 220, Primavera do Leste - MT')));
  assert.throws(() => buildMapsSearchLink(''), /Endereço/);
});
