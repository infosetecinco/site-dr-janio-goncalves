import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';
import { SectionHeading } from './section-heading.mjs';

/**
 * Avaliações (#avaliacoes) — CONDICIONAL.
 * Retorna vazio (nada no HTML) quando não há avaliações confirmadas.
 * Quando houver: origem identificada, texto autorizado preservado, data quando disponível,
 * indicação se a avaliação é da clínica ou do profissional e link para o perfil correto.
 */
export function hasConfirmedReviews(reviews) {
  return Boolean(reviews && reviews.confirmed && reviews.source && Array.isArray(reviews.items) && reviews.items.length > 0);
}

function formatDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso ?? ''));
  if (!match) return null;
  return { iso, label: `${match[3]}/${match[2]}/${match[1]}` };
}

export function ReviewsSection({ config }) {
  const { reviews, clinic, professional } = config;
  if (!hasConfirmedReviews(reviews)) return '';

  const subjectLabel = reviews.source.subject === 'professional' ? professional.name : clinic.name;

  return html`
    <section class="reviews" id="avaliacoes" aria-labelledby="reviews-title">
      <div class="container">
        ${SectionHeading({ id: 'reviews-title', eyebrow: reviews.source.label, title: reviews.title, align: 'center' })}
        <p class="reviews__source">
          Avaliações sobre ${subjectLabel}, publicadas em
          <a href="${reviews.source.url}" target="_blank" rel="noopener noreferrer">${reviews.source.label}${icons.external}</a>.
        </p>
        <ul class="reviews__grid" role="list">
          ${reviews.items.map((item) => {
            const date = formatDate(item.date);
            return html`
              <li class="review">
                <blockquote class="review__quote"><p>${item.text}</p></blockquote>
                <footer class="review__meta">
                  <span class="review__author">${item.author}</span>
                  ${date ? html`<time class="review__date" datetime="${date.iso}">${date.label}</time>` : ''}
                  ${item.url ? html`<a class="review__link" href="${item.url}" target="_blank" rel="noopener noreferrer">Ver avaliação${icons.external}</a>` : ''}
                </footer>
              </li>`;
          })}
        </ul>
      </div>
    </section>`;
}
