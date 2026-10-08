/* Mapa sob demanda: o iframe só é criado quando o visitante pede,
   e apenas quando houver URL de incorporação confirmada (data-map-src). */
function initMap() {
  $$('[data-map]').forEach((container) => {
    const button = $('[data-map-load]', container);
    const src = container.dataset.mapSrc;
    if (!button || !src) return;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.className = 'map__frame';
      iframe.src = src;
      iframe.title = container.dataset.mapTitle || 'Mapa';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      button.replaceWith(iframe);
      container.classList.add('map--loaded');
    });
  });
}
