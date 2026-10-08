import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';

/**
 * CTA persistente de WhatsApp.
 * - Desktop: botão discreto no canto inferior direito.
 * - Mobile: barra inferior com "Agendar pelo WhatsApp" (o CSS decide qual aparece).
 * O script oculta o componente enquanto um diálogo ou o menu estiverem abertos.
 */
export function WhatsAppCTA({ config, links }) {
  const { labels } = config;

  return html`
    <div class="sticky-cta" id="sticky-cta">
      <a class="sticky-cta__bar btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaPrimary}</span></a>
      <a class="sticky-cta__pill" href="${links.general}" target="_blank" rel="noopener noreferrer" aria-label="${labels.ctaPrimary}">${icons.whatsapp}<span class="sticky-cta__pill-label">WhatsApp</span></a>
    </div>`;
}
