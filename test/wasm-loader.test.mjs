// R3-426 — the two wasm loader idioms, pinned at the transform layer (the sandbox
// composes them with its asset transform + module-space fetch; see that repo's
// bundler tests). No emitted-bytes change here — R3-328's import.meta shim already
// covers the syntax — these tests pin that the chain KEEPS supporting:
//
//   row 1: `import wasmUrl from './add.wasm'`   — collected as a dependency, so the
//          sandbox routes it to its asset transform (data URL export);
//   row 2: `new URL('./add.wasm', import.meta.url)` — the Emscripten/wasm-pack idiom —
//          rewrites to the runtime identifier and EVALUATES as a classic script,
//          resolving the sibling against the module's own URL.
import test from 'node:test';
import assert from 'node:assert/strict';

import { transformBabel, IMPORT_META_GLOBAL, PLAIN_BABEL_CONFIG } from '../dist/index.js';

test('row 1: a .wasm import is collected as a dependency and required at runtime', async () => {
  const { code, dependencies } = await transformBabel({
    code: `import wasmUrl from './add.wasm';\nexport default wasmUrl;`,
    filepath: '/app/src/main.ts',
    config: PLAIN_BABEL_CONFIG,
  });
  assert.ok(dependencies.has('./add.wasm'), `collected: ${[...dependencies]}`);

  // Evaluate the emitted classic script: the sandbox's asset transform answers the
  // require with a data-URL string module (`module.exports = "data:..."`).
  const dataUrl = 'data:application/wasm;base64,AGFzbQEAAAA=';
  const moduleObj = { exports: {} };
  const requireStub = (specifier) => (specifier === './add.wasm' ? dataUrl : {});
  const fn = new Function('require', 'module', 'exports', code);
  fn(requireStub, moduleObj, moduleObj.exports);
  assert.equal(moduleObj.exports.default, dataUrl);
});

test('row 2: new URL(sibling, import.meta.url) evaluates and resolves beside the module', async () => {
  const { code } = await transformBabel({
    code: `export const wasmUrl = new URL('./add.wasm', import.meta.url);`,
    filepath: '/app/src/loader.js',
    config: PLAIN_BABEL_CONFIG,
  });
  assert.ok(!/import\.meta/.test(code), 'no import.meta may survive the transform');

  const meta = Object.freeze({ url: 'https://sandbox.immediately.run/app/src/loader.js' });
  const moduleObj = { exports: {} };
  const fn = new Function(IMPORT_META_GLOBAL, 'require', 'module', 'exports', code);
  fn(meta, () => ({}), moduleObj, moduleObj.exports);
  assert.equal(moduleObj.exports.wasmUrl.href, 'https://sandbox.immediately.run/app/src/add.wasm');
});

test('row 2, wasm-pack shape: fetch(new URL(...)) stays a plain global fetch call', async () => {
  // The sandbox serves the resolved URL through its per-module fetch shadow — which
  // only works if the emitted code still calls the bare `fetch` identifier (a free
  // global reference the evaluator can provide), not some rewritten indirection.
  const { code } = await transformBabel({
    code: `export const p = fetch(new URL('./add.wasm', import.meta.url));`,
    filepath: '/app/src/loader.js',
    config: PLAIN_BABEL_CONFIG,
  });
  assert.match(code, /fetch\(new URL\('\.\/add\.wasm', \$ir_import_meta\.url\)\)/);
});
