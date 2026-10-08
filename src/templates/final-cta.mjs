import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { icons } from './icons.mjs';

/**
 * Chamada final: fundo Oliva Profundo, título em Marfim, CTA em Ouro Assinatura.
 * O retrato alternativo aparece apenas em telas largas (decorativo, alt vazio).
 */
export function FinalCTA({ config, links }) {
  const { finalCta, labels } = config;

  return html`
    <section class="final-cta surface-dark surface-dark--olive" id="contato" aria-labelledby="final-cta-title">
      <div class="container final-cta__inner">
        <div class="final-cta__content">
          <h2 class="final-cta__title" id="final-cta-title">${finalCta.title}</h2>
          <p class="final-cta__text">${finalCta.text}</p>
          <a class="btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaFinal}</span></a>
          <p class="final-cta__support">${finalCta.support}</p>
        </div>
        <div class="final-cta__media" aria-hidden="true">
          <div class="final-cta__photo">
            ${picture({
              name: finalCta.image.name,
              alt: '',
              sizes: '(min-width: 1200px) 360px, 30vw',
              className: 'final-cta__img',
            })}
          </div>
        </div>
      </div>
    </section>`;
}
