import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';
import { SectionHeading } from './section-heading.mjs';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Cartão de tratamento: nome e resumo sempre visíveis, link para o detalhamento
 * (diálogo acessível) e CTA contextual de WhatsApp.
 */
function TreatmentCard({ item, index, link, labels }) {
  const dialogId = `tratamento-${item.id}`;
  return html`
    <li class="treatment-card">
      <span class="treatment-card__index" aria-hidden="true">${pad(index + 1)}</span>
      <h3 class="treatment-card__title" id="${dialogId}-card-title">${item.name}</h3>
      <p class="treatment-card__summary">${item.summary}</p>
      <div class="treatment-card__actions">
        <button class="link-button" type="button" data-dialog-open="${dialogId}" aria-haspopup="dialog">
          <span>${labels.knowTreatment}</span>${icons.arrowRight}
        </button>
        <a class="treatment-card__cta" href="${link}" target="_blank" rel="noopener noreferrer" aria-label="${labels.ctaTalkTeam} sobre ${item.name} pelo WhatsApp">
          ${icons.whatsapp}<span>${labels.ctaTalkTeam}</span>
        </a>
      </div>
    </li>`;
}

/**
 * Detalhamento (TreatmentDetail): <dialog> nativo com nome acessível, foco gerenciado
 * pelo script (src/js/dialogs.js), fechamento por Escape e botão identificado.
 */
function TreatmentDetail({ item, link, labels, treatments }) {
  const dialogId = `tratamento-${item.id}`;
  return html`
    <dialog class="dialog" id="${dialogId}" aria-labelledby="${dialogId}-title" aria-describedby="${dialogId}-intro">
      <div class="dialog__panel">
        <button class="dialog__close" type="button" data-dialog-close aria-label="${labels.close}">${icons.close}</button>
        <p class="eyebrow">${treatments.eyebrow}</p>
        <h2 class="dialog__title" id="${dialogId}-title">${item.name}</h2>
        <p class="dialog__intro" id="${dialogId}-intro">${item.detail.intro}</p>
        <h3 class="dialog__subtitle">${treatments.topicsTitle}</h3>
        <ul class="dialog__list">
          ${item.detail.topics.map((topic) => html`<li>${topic}</li>`)}
        </ul>
        <p class="dialog__note">${treatments.note}</p>
        <div class="dialog__actions">
          <a class="btn btn--primary" href="${link}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaTalkTeam}</span></a>
          <button class="btn btn--secondary" type="button" data-dialog-close>${labels.close}</button>
        </div>
      </div>
    </dialog>`;
}

/**
 * Tratamentos (#tratamentos): grade de seis cartões + bloco final.
 */
export function TreatmentsSection({ config, links }) {
  const { treatments, labels } = config;

  return html`
    <section class="treatments" id="tratamentos" aria-labelledby="treatments-title">
      <div class="container">
        ${SectionHeading({ id: 'treatments-title', eyebrow: treatments.eyebrow, title: treatments.title, text: treatments.intro, align: 'center' })}
        <ul class="treatments__grid" role="list">
          ${treatments.items.map((item, index) => TreatmentCard({ item, index, link: links.treatment(item.name), labels }))}
        </ul>
        <div class="treatments__closing">
          <div>
            <h3 class="treatments__closing-title">${treatments.closing.title}</h3>
            <p class="treatments__closing-text">${treatments.closing.text}</p>
          </div>
          <a class="btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaDoubts}</span></a>
        </div>
      </div>
    </section>
    ${treatments.items.map((item) => TreatmentDetail({ item, link: links.treatment(item.name), labels, treatments }))}`;
}
