/* FAQ: acordeão acessível (aria-expanded + hidden). Sem animações pesadas. */
function initAccordion() {
  $$('[data-accordion]').forEach((accordion) => {
    accordion.addEventListener('click', (event) => {
      const trigger = event.target.closest('.accordion__trigger');
      if (!trigger || !accordion.contains(trigger)) return;
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });
}
