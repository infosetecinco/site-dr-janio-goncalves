/* Menu mobile: botão com nome acessível, estado anunciado, fecha ao escolher âncora,
   fecha por Escape e devolve o foco ao controle. */
function initMenu() {
  const toggle = $('#menu-toggle');
  const nav = $('#mobile-nav');
  if (!toggle || !nav) return;

  const labelOpen = toggle.dataset.labelOpen || 'Abrir menu';
  const labelClose = toggle.dataset.labelClose || 'Fechar menu';

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  function open() {
    nav.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', labelClose);
    setOverlay(true);
    const firstLink = $('a', nav);
    if (firstLink) firstLink.focus();
  }

  function close({ returnFocus = false } = {}) {
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', labelOpen);
    setOverlay(false);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => (isOpen() ? close({ returnFocus: true }) : open()));

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) close({ returnFocus: true });
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    close();
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches && isOpen()) close();
  });
}
