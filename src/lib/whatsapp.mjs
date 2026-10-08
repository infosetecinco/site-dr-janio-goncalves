/**
 * Construção centralizada dos links de contato.
 * O WhatsApp apenas abre uma conversa; nenhuma mensagem é enviada automaticamente
 * e nenhum dado do visitante é incluído na URL.
 */

const DIGITS_ONLY = /^\d{10,15}$/;
const E164 = /^\+\d{10,15}$/;

export function normalizeWhatsAppNumber(number) {
  const digits = String(number ?? '').replace(/\D/g, '');
  if (!DIGITS_ONLY.test(digits)) {
    throw new Error(`Número de WhatsApp inválido: "${number}"`);
  }
  return digits;
}

/**
 * Monta https://wa.me/<número>?text=<mensagem codificada>.
 * A mensagem completa passa por encodeURIComponent.
 */
export function buildWhatsAppLink(number, message = '') {
  const digits = normalizeWhatsAppNumber(number);
  const text = String(message).trim();
  if (!text) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Monta tel:+55... a partir do número em formato E.164. */
export function buildTelLink(e164) {
  const value = String(e164 ?? '').trim();
  if (!E164.test(value)) {
    throw new Error(`Telefone E.164 inválido: "${e164}"`);
  }
  return `tel:${value}`;
}

/** Substitui o marcador [tratamento] pelo nome do tratamento. */
export function treatmentMessage(template, treatmentName) {
  if (!template.includes('[tratamento]')) {
    throw new Error('O modelo de mensagem de tratamento precisa conter "[tratamento]".');
  }
  return template.replace('[tratamento]', String(treatmentName).trim());
}

/** Link de busca do Google Maps pelo endereço completo (sem coordenadas inventadas). */
export function buildMapsSearchLink(fullAddress) {
  const query = String(fullAddress ?? '').trim();
  if (!query) throw new Error('Endereço vazio para o link do Google Maps.');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
