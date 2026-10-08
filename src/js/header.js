/* Cabeçalho: sombra discreta após rolagem. */
function initHeader() {
  const header = $('#site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', update, { passive: true });
  update();
}
