/* Inicialização. */
function initYear() {
  const year = String(new Date().getFullYear());
  $$('[data-year]').forEach((element) => {
    element.textContent = year;
  });
}

function init() {
  initHeader();
  initMenu();
  initAccordion();
  initDialogs();
  initMap();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
