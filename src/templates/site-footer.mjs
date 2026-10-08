import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';

/**
 * Rodapé: marca, identificação, clínica, endereço, contatos, navegação,
 * política de privacidade (quando preparada), aviso e direitos autorais (ano dinâmico).
 */
export function SiteFooter({ config, links, navItems, year }) {
  const { brand, professional, clinic, address, contact, footer } = config;

  return html`
    <footer class="site-footer surface-dark" id="rodape">
      <div class="container">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <p class="site-footer__name">${brand.name}</p>
            <p class="site-footer__role">${professional.role}${professional.registration ? html` · ${professional.registration}` : ''}</p>
            <p class="site-footer__clinic">Atendimento na ${clinic.name}</p>
          </div>

          <div class="site-footer__col">
            <h2 class="site-footer__title">${footer.navTitle}</h2>
            <ul class="site-footer__list">
              ${navItems.map((item) => html`<li><a class="site-footer__link" href="${item.href}">${item.label}</a></li>`)}
            </ul>
          </div>

          <div class="site-footer__col">
            <h2 class="site-footer__title">${footer.contactTitle}</h2>
            <address class="site-footer__address">${address.lines.map((line) => html`<span>${line}</span>`)}</address>
            <ul class="site-footer__list site-footer__list--contacts">
              <li><a class="site-footer__link" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>WhatsApp ${contact.phoneDisplay}</span></a></li>
              <li><a class="site-footer__link" href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">${icons.instagram}<span>@${contact.instagramHandle}</span></a></li>
            </ul>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p class="site-footer__disclaimer">${footer.disclaimer}</p>
          <p class="site-footer__copy">
            © <span data-year>${year}</span> ${brand.name}. Todos os direitos reservados.
            ${footer.privacyPolicyUrl ? html` · <a class="site-footer__link" href="${footer.privacyPolicyUrl}">Política de Privacidade</a>` : ''}
          </p>
        </div>
      </div>
    </footer>`;
}
