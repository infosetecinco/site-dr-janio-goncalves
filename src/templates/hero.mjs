import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { icons } from './icons.mjs';

/**
 * Hero (#inicio): texto à esquerda, retrato de braços cruzados à direita.
 * No mobile a ordem é: etiqueta, título, subtítulo, CTAs, apoio, retrato.
 */
export function Hero({ config, links }) {
  const { hero, labels } = config;

  return html`
    <section class="hero surface-dark" id="inicio" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="eyebrow eyebrow--on-dark">${hero.eyebrow}</p>
          <h1 class="hero__title" id="hero-title">${hero.title}</h1>
          <p class="hero__subtitle">${hero.subtitle}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaPrimary}</span></a>
            <a class="btn btn--secondary" href="#tratamentos">${icons.arrowDown}<span>${labels.ctaTreatments}</span></a>
          </div>
          <p class="hero__support">${hero.support}</p>
        </div>
        <div class="hero__media">
          <div class="hero__photo">
            ${picture({
              name: hero.image.name,
              mobileName: hero.image.mobileName,
              alt: hero.image.alt,
              sizes: '(min-width: 1200px) 520px, (min-width: 1024px) 42vw, (min-width: 768px) 60vw, 100vw',
              mobileSizes: '100vw',
              loading: 'eager',
              fetchpriority: 'high',
              className: 'hero__img',
            })}
          </div>
        </div>
      </div>
    </section>`;
}
