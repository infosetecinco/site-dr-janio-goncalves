import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { icons } from './icons.mjs';

/**
 * A clínica (#clinica): fachada real + texto + link para a localização.
 */
export function ClinicSection({ config }) {
  const { clinicSection, labels } = config;

  return html`
    <section class="clinic" id="clinica" aria-labelledby="clinic-title">
      <div class="container clinic__inner">
        <div class="clinic__content">
          <p class="eyebrow">${clinicSection.eyebrow}</p>
          <h2 class="section-title" id="clinic-title">${clinicSection.title}</h2>
          <div class="prose">
            ${clinicSection.paragraphs.map((text) => html`<p>${text}</p>`)}
          </div>
          <a class="btn btn--secondary" href="#localizacao">${icons.pin}<span>${labels.ctaLocation}</span></a>
        </div>
        <div class="clinic__media">
          <figure class="clinic__photo">
            ${picture({
              name: clinicSection.image.name,
              alt: clinicSection.image.alt,
              sizes: '(min-width: 1200px) 520px, (min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw',
              className: 'clinic__img',
            })}
          </figure>
        </div>
      </div>
    </section>`;
}
