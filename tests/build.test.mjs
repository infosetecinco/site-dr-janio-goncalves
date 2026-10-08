import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { build } from '../scripts/build.mjs';

test('build writes a complete dist/ folder', async () => {
  const result = await build({ year: 2026 });
  assert.ok(result.html > 40_000);
  assert.ok(result.images >= 20);
  assert.equal(result.statics, 2);

  const index = await readFile(join(result.dist, 'index.html'), 'utf8');
  assert.ok(index.includes('assets/css/site.css'));
  assert.ok(index.includes('© <span data-year>2026</span>'));

  const css = await readFile(join(result.dist, 'assets', 'css', 'site.css'), 'utf8');
  assert.ok(css.includes('--color-gold: #c3a16a'));
  assert.ok(css.includes('prefers-reduced-motion'));
  assert.ok(!css.includes('ouroIze'), 'inherited token names must not survive');

  const js = await readFile(join(result.dist, 'assets', 'js', 'site.js'), 'utf8');
  assert.ok(js.startsWith('(function () {'));
  for (const fn of ['initMenu', 'initAccordion', 'initDialogs', 'initMap', 'initYear']) assert.ok(js.includes(fn));
  assert.ok(!js.includes('console.log'));

  for (const file of ['favicon.svg', 'apple-touch-icon.png', 'assets/img/retrato-principal-1066.webp', 'assets/img/fachada-900.jpg']) {
    assert.ok((await stat(join(result.dist, file))).isFile(), file);
  }
});
