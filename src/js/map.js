/* Carrega o mapa ao entrar na área visível, apenas com URL confirmada.
   O botão continua disponível como alternativa ao carregamento automático. */
function initMap() {
  $$('[data-map]').forEach((container) => {
    const button = $('[data-map-load]', container);
    const src = container.dataset.mapSrc;
    if (!button || !src) return;
    let loaded = false;
    let observer;
    function loadMap() {
      if (loaded) return;
      loaded = true;
      if (observer) observer.disconnect();
      const iframe = document.createElement('iframe');
      iframe.className = 'map__frame';
      iframe.src = src;
      iframe.title = container.dataset.mapTitle || 'Mapa';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      button.replaceWith(iframe);
      container.classList.add('map--loaded');
    }
    button.addEventListener('click', loadMap);
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMap();
      });
      observer.observe(container);
    }
  });
}
