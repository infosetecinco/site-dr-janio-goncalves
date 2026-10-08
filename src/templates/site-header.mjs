import { html } from '../lib/html.mjs';
import { icons } from './icons.mjs';

/**
 * Marca: logo oficial quando disponível; caso contrário, assinatura tipográfica provisória.
 */
function Brand({ brand, variant = 'header' }) {
  const inner = brand.logo
    ? html`<img class="brand__logo" src="${brand.logo.src}" alt="${brand.logo.alt || brand.name}" width="160" height="48">`
    : html`<span class="brand__name">${brand.name}</span><span class="brand__role">${brand.role}</span>`;
  return html`<a class="brand brand--${variant}" href="#inicio" aria-label="${brand.name}, ${brand.role} — início">${inner}</a>`;
}

/**
 * Barra informativa (apenas desktop) + cabeçalho fixo + menu mobile.
 */
export function SiteHeader({ config, links, navItems }) {
  const { brand, clinic, hoursShort, contact, labels } = config;

  const navLinks = (className) =>
    navItems.map((item) => html`<li><a class="${className}" href="${item.href}">${item.label}</a></li>`);

  return html`
    <div class="topbar">
      <div class="container topbar__inner">
        <span class="topbar__item">${icons.pin}<span>${clinic.cityLabel}</span></span>
        <span class="topbar__item">${icons.clock}<span>${hoursShort}</span></span>
        <a class="topbar__item topbar__link" href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">${icons.instagram}<span>@${contact.instagramHandle}</span></a>
      </div>
    </div>

    <header class="site-header" id="site-header">
      <div class="container site-header__inner">
        ${Brand({ brand })}

        <nav class="site-nav" aria-label="Navegação principal">
          <ul class="site-nav__list">${navLinks('site-nav__link')}</ul>
        </nav>

        <div class="site-header__actions">
          <a class="btn btn--primary btn--small site-header__cta" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaPrimary}</span></a>
          <button class="menu-toggle" type="button" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="${labels.openMenu}" data-label-open="${labels.openMenu}" data-label-close="${labels.closeMenu}">
            <span class="menu-toggle__icon menu-toggle__icon--open">${icons.menu}</span>
            <span class="menu-toggle__icon menu-toggle__icon--close">${icons.close}</span>
          </button>
        </div>
      </div>

      <nav class="mobile-nav" id="mobile-nav" aria-label="Navegação principal (menu)" hidden>
        <ul class="mobile-nav__list">${navLinks('mobile-nav__link')}</ul>
        <div class="mobile-nav__footer">
          <a class="btn btn--primary btn--block" href="${links.general}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>${labels.ctaPrimary}</span></a>
          <p class="mobile-nav__meta">${clinic.cityLabel} · ${hoursShort}</p>
        </div>
      </nav>
    </header>`;
}

export { Brand };
