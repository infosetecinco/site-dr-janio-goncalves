/**
 * Template literal HTML seguro por padrão.
 *
 * html`<p>${texto}</p>`  -> `texto` é escapado.
 * html`${html`<b>x</b>`}` -> fragmentos aninhados não são re-escapados.
 * raw(string)             -> insere sem escapar (use apenas para markup confiável, ex.: SVG interno).
 * Arrays são concatenados; null/undefined/false viram string vazia.
 */

const RAW = Symbol('raw-html');

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function raw(value) {
  return { [RAW]: true, value: String(value) };
}

export function isRaw(value) {
  return Boolean(value) && typeof value === 'object' && value[RAW] === true;
}

function render(value) {
  if (value === null || value === undefined || value === false) return '';
  if (isRaw(value)) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = '';
  strings.forEach((chunk, index) => {
    out += chunk;
    if (index < values.length) out += render(values[index]);
  });
  return raw(out);
}

/** Converte um fragmento (raw) ou string em string final. */
export function toString(fragment) {
  return isRaw(fragment) ? fragment.value : render(fragment);
}

/** Junta classes ignorando valores falsos. */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
