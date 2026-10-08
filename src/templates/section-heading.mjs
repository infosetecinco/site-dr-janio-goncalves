import { html } from '../lib/html.mjs';

/**
 * Cabeçalho padrão de seção: etiqueta (eyebrow) + título h2 (+ texto opcional).
 * `align` = 'start' | 'center'.
 */
export function SectionHeading({ id, eyebrow, title, text, align = 'start' }) {
  return html`
    <div class="section-heading section-heading--${align}">
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      <h2 class="section-title" id="${id}">${title}</h2>
      ${text ? html`<p class="section-text">${text}</p>` : ''}
    </div>`;
}
