import { html } from '../lib/html.mjs';
import { SectionHeading } from './section-heading.mjs';

/**
 * Diferenciais (#diferenciais): quatro blocos curtos sobre a forma de atender.
 */
export function DifferentialsSection({ config }) {
  const { differentials } = config;

  return html`
    <section class="differentials" id="diferenciais" aria-labelledby="differentials-title">
      <div class="container differentials__inner">
        ${SectionHeading({ id: 'differentials-title', eyebrow: differentials.eyebrow, title: differentials.title, align: 'start' })}
        <ul class="differentials__grid" role="list">
          ${differentials.items.map(
            (item) => html`
              <li class="differential">
                <h3 class="differential__title">${item.title}</h3>
                <p class="differential__text">${item.text}</p>
              </li>`,
          )}
        </ul>
      </div>
    </section>`;
}
