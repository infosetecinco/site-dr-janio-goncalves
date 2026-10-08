import { html, raw } from '../lib/html.mjs';
import { imageEntry } from '../lib/images.mjs';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap';

/**
 * Dados estruturados mínimos e factuais: a pessoa (marca principal) e o local de
 * atendimento como organização separada. Sem avaliações, notas ou especialidades.
 */
function structuredData({ config, absolute }) {
  const { professional, clinic, address, contact, site } = config;
  const organization = {
    '@type': 'Dentist',
    name: clinic.name,
    telephone: contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.number}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
    ],
    sameAs: [contact.instagramUrl],
  };
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: professional.name,
    jobTitle: professional.role,
    worksFor: organization,
  };
  if (site.url) person.url = absolute('');
  // JSON dentro de <script>: escapar "<" evita fechamento prematuro da tag.
  return JSON.stringify(person).replace(/</g, '\\u003c');
}

export function Head({ config }) {
  const { site } = config;
  const base = site.url ? site.url.replace(/\/+$/, '') : '';
  const absolute = (path) => (base ? `${base}/${path}`.replace(/\/+$/, '') || base : path);
  const og = imageEntry(site.ogImage);
  const ogPath = `assets/img/${og.jpg}`;

  return html`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${site.title}</title>
    <meta name="description" content="${site.description}">
    ${site.isPreview ? html`<meta name="robots" content="noindex, nofollow">` : ''}
    ${site.url ? html`<link rel="canonical" href="${absolute('')}">` : ''}
    <meta name="theme-color" content="${site.themeColor}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${site.locale.replace('-', '_')}">
    <meta property="og:title" content="${site.title}">
    <meta property="og:description" content="${site.description}">
    <meta property="og:image" content="${absolute(ogPath)}">
    <meta property="og:image:width" content="${og.width}">
    <meta property="og:image:height" content="${og.height}">
    ${site.url ? html`<meta property="og:url" content="${absolute('')}">` : ''}
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="${FONTS_URL}">
    <link rel="stylesheet" href="assets/css/site.css">
    <script type="application/ld+json">${raw(structuredData({ config, absolute }))}</script>`;
}
