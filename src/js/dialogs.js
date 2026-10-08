/* Detalhamento de tratamentos: <dialog> nativo com foco gerenciado.
   - showModal(): fundo inerte e Escape nativos.
   - Foco vai para o título ao abrir e volta ao botão de origem ao fechar.
   - Clique no fundo escurecido fecha.
   - CTA persistente é ocultado enquanto o diálogo estiver aberto. */
function initDialogs() {
  const supportsDialog = typeof HTMLDialogElement === 'function' && 'showModal' in HTMLDialogElement.prototype;
  let opener = null;

  function openDialog(dialog, trigger) {
    opener = trigger;
    if (supportsDialog) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
      dialog.setAttribute('aria-modal', 'true');
    }
    setOverlay(true);
    const title = $('.dialog__title', dialog);
    if (title) {
      title.setAttribute('tabindex', '-1');
      title.focus();
    }
  }

  function closeDialog(dialog) {
    if (supportsDialog && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      onClosed(dialog);
    }
  }

  function onClosed() {
    setOverlay(false);
    if (opener && document.contains(opener)) opener.focus();
    opener = null;
  }

  $$('[data-dialog-open]').forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.dialogOpen);
    if (!dialog) return;
    trigger.addEventListener('click', () => openDialog(dialog, trigger));
  });

  $$('dialog.dialog').forEach((dialog) => {
    $$('[data-dialog-close]', dialog).forEach((button) => {
      button.addEventListener('click', () => closeDialog(dialog));
    });
    dialog.addEventListener('close', () => onClosed(dialog));
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    if (!supportsDialog) {
      dialog.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeDialog(dialog);
      });
    }
  });
}
