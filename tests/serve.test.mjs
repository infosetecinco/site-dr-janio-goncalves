import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { get } from 'node:http';

function request(path) {
  return new Promise((resolve) => {
    const req = get({ hostname: '127.0.0.1', port: 4188, path }, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', () => resolve(null));
  });
}

test('preview rejects malformed URLs without terminating the server', { timeout: 10000 }, async (t) => {
  const server = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, PORT: '4188' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => server.kill());
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', (code) => reject(new Error(`Server exited: ${code}`)));
  });
  for (const path of ['/%', '/%E0%A4%A', '/%ZZ']) {
    assert.equal(await request(path), 400, `Malformed URL ${path} must receive HTTP 400`);
  }
  assert.equal(await request('/not-found'), 404, 'Server must still accept subsequent requests');
});
