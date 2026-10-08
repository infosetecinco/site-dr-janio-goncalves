import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { icons } from './icons.mjs';

/**
 * Sobre (#sobre): retrato lateral à esquerda, texto à direita. Fundo Marfim.
 * A linha de inscrição profissional só aparece quando confirmada na configuração.
 */
export function AboutSection({ config, links }) {
  const { about, professional, labels } = config;

  return html`
    <section class="about" id="sobre" aria-labelledby="about-title">
      <div class="container about__inner">
        <div class="about__media">
          <div class="about__photo">
            ${picture({
              name: about.image.name,
              alt: about.image.alt,
              sizes: '(min-width: 1200px) 480px, (min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw',
              className: 'about__img',
            })}
          </div>
        </div>
        <div class="about__content">
          <p class="eyebrow">${about.eyebrow}</p>
          <h2 class="section-title" id="about-title">${about.title}</h2>
          <div class="prose">
            ${about.paragraphs.map((text) => html`<p>${text}</p>`)}
          </div>
          <div class="about__identity">
            <p class="about__name">${professional.name}</p>
            <p class="about__role">${professional.role}</p>
            ${professional.registration ? html`<p class="about__registration">${professional.registration}</p>` : ''}
          </div>
          <a class="btn btn--secondary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaTeam}</span></a>
        </div>
      </div>
    </section>`;
}
