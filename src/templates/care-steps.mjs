import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';
import { SectionHeading } from './section-heading.mjs';

/**
 * Como funciona o atendimento (#atendimento): três etapas numeradas.
 */
export function CareSteps({ config, links }) {
  const { careSteps, labels } = config;

  return html`
    <section class="care-steps" id="atendimento" aria-labelledby="care-steps-title">
      <div class="container">
        ${SectionHeading({ id: 'care-steps-title', eyebrow: careSteps.eyebrow, title: careSteps.title, align: 'start' })}
        <ol class="care-steps__list">
          ${careSteps.steps.map(
            (step, index) => html`
              <li class="care-step">
                <span class="care-step__number" aria-hidden="true">${index + 1}</span>
                <h3 class="care-step__title">${step.title}</h3>
                <p class="care-step__text">${step.text}</p>
              </li>`,
          )}
        </ol>
        <div class="care-steps__action">
          <a class="btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaHours}</span></a>
        </div>
      </div>
    </section>`;
}
