/**
 * Verificação de sintaxe de todos os módulos e scripts de runtime (substitui um lint
 * externo, já que o projeto não tem dependências).
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIRS = ['src', 'scripts', 'tests'];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(mjs|js)$/.test(name)) files.push(full);
  }
  return files;
}

let failures = 0;
for (const dir of DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    } catch (error) {
      failures += 1;
      console.error(`Erro de sintaxe em ${file}\n${error.stderr?.toString() ?? error.message}`);
    }
  }
}

if (failures) {
  console.error(`${failures} arquivo(s) com erro de sintaxe.`);
  process.exit(1);
}
console.log('Sintaxe OK em src/, scripts/ e tests/.');
