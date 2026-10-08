import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';
import { SectionHeading } from './section-heading.mjs';

/**
 * Mapa: carregado ao entrar na área visível, apenas quando houver URL de incorporação
 * com o ponto exato confirmado. Sem isso, exibe um bloco informativo (sem marcador aproximado).
 */
function MapBlock({ address, location, labels }) {
  if (!address.mapEmbedUrl) {
    return html`
      <div class="map map--placeholder" aria-label="Mapa">
        ${icons.map}
        <p class="map__placeholder-text">${location.mapPlaceholder}</p>
        <p class="map__note">${location.mapNote}</p>
      </div>`;
  }
  return html`
    <div class="map" data-map data-map-src="${address.mapEmbedUrl}" data-map-title="Mapa — ${address.full}">
      <button class="btn btn--secondary map__load" type="button" data-map-load>${icons.map}<span>${labels.loadMap}</span></button>
      <p class="map__note">${location.mapNote}</p>
    </div>`;
}

/**
 * Localização (#localizacao): endereço, telefone, horários, Instagram e CTAs.
 */
export function LocationSection({ config, links }) {
  const { location, address, contact, hours, labels } = config;

  return html`
    <section class="location" id="localizacao" aria-labelledby="location-title">
      <div class="container">
        ${SectionHeading({ id: 'location-title', eyebrow: location.eyebrow, title: location.title, align: 'start' })}
        <div class="location__inner">
          <div class="location__card">
            <dl class="info-list">
              <div class="info-list__row">
                <dt class="info-list__term">${icons.pin}<span>${location.addressLabel}</span></dt>
                <dd class="info-list__desc"><address class="address">${address.lines.map((line) => html`<span>${line}</span>`)}</address></dd>
              </div>
              <div class="info-list__row">
                <dt class="info-list__term">${icons.phone}<span>${location.phoneLabel}</span></dt>
                <dd class="info-list__desc"><a class="text-link" href="${links.tel}">${contact.phoneDisplay}</a></dd>
              </div>
              <div class="info-list__row">
                <dt class="info-list__term">${icons.clock}<span>${location.hoursLabel}</span></dt>
                <dd class="info-list__desc">${hours.map((h) => html`<span>${h.days}, ${h.time}</span>`)}</dd>
              </div>
              <div class="info-list__row">
                <dt class="info-list__term">${icons.instagram}<span>${location.instagramLabel}</span></dt>
                <dd class="info-list__desc"><a class="text-link" href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">@${contact.instagramHandle}</a></dd>
              </div>
            </dl>
            <div class="location__actions">
              <a class="btn btn--primary" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaPrimary}</span></a>
              <a class="btn btn--secondary" href="${links.maps}" target="_blank" rel="noopener noreferrer">${icons.external}<span>${labels.ctaMaps}</span></a>
            </div>
          </div>
          ${MapBlock({ address, location, labels })}
        </div>
      </div>
    </section>`;
}
