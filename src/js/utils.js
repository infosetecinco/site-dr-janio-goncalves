/* Utilidades compartilhadas (concatenadas dentro de uma IIFE pelo build). */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const OVERLAY_CLASS = 'has-overlay';

/** Marca o documento com um overlay aberto (menu ou diálogo): oculta o CTA persistente. */
function setOverlay(isOpen) {
  document.body.classList.toggle(OVERLAY_CLASS, Boolean(isOpen));
}

function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches;
}
