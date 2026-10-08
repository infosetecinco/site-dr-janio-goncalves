import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';
import { SectionHeading } from './section-heading.mjs';

/**
 * FAQ (#faq): acordeão acessível (botão com aria-expanded/aria-controls, painel com hidden).
 */
export function FAQSection({ config, links }) {
  const { faq, labels } = config;

  return html`
    <section class="faq" id="faq" aria-labelledby="faq-title">
      <div class="container faq__inner">
        ${SectionHeading({ id: 'faq-title', eyebrow: faq.eyebrow, title: faq.title, align: 'center' })}
        <div class="accordion" data-accordion>
          ${faq.items.map((item, index) => {
            const panelId = `faq-panel-${index + 1}`;
            const buttonId = `faq-button-${index + 1}`;
            return html`
              <div class="accordion__item">
                <h3 class="accordion__heading">
                  <button class="accordion__trigger" type="button" id="${buttonId}" aria-expanded="false" aria-controls="${panelId}">
                    <span>${item.question}</span>${icons.chevronDown}
                  </button>
                </h3>
                <div class="accordion__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}" hidden>
                  <p>${item.answer}</p>
                </div>
              </div>`;
          })}
        </div>
        <div class="faq__action">
          <a class="btn btn--secondary" href="${links.faq}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaFaq}</span></a>
        </div>
      </div>
    </section>`;
}
