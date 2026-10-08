import { test } from 'node:test';
import assert from 'node:assert/strict';

import { cx, escapeHtml, html, raw, toString } from '../src/lib/html.mjs';

test('escapes interpolated strings by default', () => {
  const unsafe = '<img src=x onerror="alert(1)">';
  assert.equal(toString(html`<p>${unsafe}</p>`), '<p>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>');
});

test('does not re-escape nested fragments or raw values', () => {
  const inner = html`<b>${'a & b'}</b>`;
  assert.equal(toString(html`<p>${inner}</p>`), '<p><b>a &amp; b</b></p>');
  assert.equal(toString(html`<p>${raw('<i>ok</i>')}</p>`), '<p><i>ok</i></p>');
});

test('joins arrays and drops null, undefined and false', () => {
  const items = ['a', 'b'].map((text) => html`<li>${text}</li>`);
  assert.equal(toString(html`<ul>${items}</ul>`), '<ul><li>a</li><li>b</li></ul>');
  assert.equal(toString(html`<p>${null}${undefined}${false}</p>`), '<p></p>');
});

test('escapeHtml covers the five significant characters', () => {
  assert.equal(escapeHtml(`&<>"'`), '&amp;&lt;&gt;&quot;&#39;');
});

test('cx ignores falsy class names', () => {
  assert.equal(cx('a', null, false && 'b', 'c'), 'a c');
});
