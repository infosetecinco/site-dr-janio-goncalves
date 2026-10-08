import { html, toString } from '../lib/html.mjs';
import { buildMapsSearchLink, buildTelLink, buildWhatsAppLink, treatmentMessage } from '../lib/whatsapp.mjs';
import { Head } from './head.mjs';
import { SiteHeader } from './site-header.mjs';
import { Hero } from './hero.mjs';
import { AboutSection } from './about.mjs';
import { TreatmentsSection } from './treatments.mjs';
import { CareSteps } from './care-steps.mjs';
import { DifferentialsSection } from './differentials.mjs';
import { ClinicSection } from './clinic.mjs';
import { ReviewsSection, hasConfirmedReviews } from './reviews.mjs';
import { FAQSection } from './faq.mjs';
import { LocationSection } from './location.mjs';
import { FinalCTA } from './final-cta.mjs';
import { SiteFooter } from './site-footer.mjs';
import { WhatsAppCTA } from './whatsapp-cta.mjs';

/** Links derivados da configuração (uma única função reutilizável para cada tipo). */
export function buildLinks(config) {
  const { contact, messages, address } = config;
  return {
    general: buildWhatsAppLink(contact.whatsappNumber, messages.general),
    faq: buildWhatsAppLink(contact.whatsappNumber, messages.faq),
    treatment: (name) => buildWhatsAppLink(contact.whatsappNumber, treatmentMessage(messages.treatment, name)),
    tel: buildTelLink(contact.phoneE164),
    maps: buildMapsSearchLink(address.full),
  };
}

/** Menu: "Avaliações" só entra quando houver conteúdo confirmado. */
export function buildNav(config) {
  const items = [...config.nav];
  if (hasConfirmedReviews(config.reviews)) {
    const faqIndex = items.findIndex((item) => item.href === '#faq');
    items.splice(faqIndex === -1 ? items.length : faqIndex, 0, { label: 'Avaliações', href: '#avaliacoes' });
  }
  return items;
}

export function renderPage(config, { year }) {
  const links = buildLinks(config);
  const navItems = buildNav(config);
  const ctx = { config, links, navItems };

  const document = html`<!doctype html>
<html lang="${config.site.locale}">
<head>
${Head(ctx)}
</head>
<body>
<a class="skip-link" href="#conteudo">${config.labels.skipToContent}</a>
${SiteHeader(ctx)}
<main id="conteudo">
${Hero(ctx)}
${AboutSection(ctx)}
${TreatmentsSection(ctx)}
${CareSteps(ctx)}
${DifferentialsSection(ctx)}
${ClinicSection(ctx)}
${ReviewsSection(ctx)}
${FAQSection(ctx)}
${LocationSection(ctx)}
${FinalCTA(ctx)}
</main>
${SiteFooter({ ...ctx, year })}
${WhatsAppCTA(ctx)}
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;

  return toString(document);
}
