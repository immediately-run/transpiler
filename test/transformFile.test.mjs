import test from 'node:test';
import assert from 'node:assert/strict';

import { transformFile, isTransformable, selectReactChain } from '../dist/index.js';

test('returns code+deps for a covered app-root file', async () => {
  const result = await transformFile({ path: '/app/src/x.tsx', code: 'export default () => <div/>;' });
  assert.ok(!('error' in result));
  assert.equal(typeof result.code, 'string');
  assert.ok(Array.isArray(result.deps));
});

test('error-omission: a Babel error returns { error }, never throws', async () => {
  const result = await transformFile({ path: '/app/src/bad.tsx', code: 'const = =;' });
  assert.ok('error' in result, 'expected an error result');
  assert.equal(result.error.filepath, '/app/src/bad.tsx');
  assert.equal(typeof result.error.message, 'string');
  assert.ok(!('code' in result), 'a failure result omits code');
});

test('error-omission: an unsupported extension returns { error }', async () => {
  const result = await transformFile({ path: '/app/src/styles.css', code: 'a{}' });
  assert.ok('error' in result);
  assert.match(result.error.message, /No transformer/);
});

test('chain selection mirrors ReactPreset.mapTransformers', () => {
  // app-root jsx/tsx/js -> react-refresh
  assert.equal(selectReactChain('/app/src/App.tsx').variant, 'react-refresh');
  assert.equal(selectReactChain('/app/a.jsx').variant, 'react-refresh');
  assert.equal(selectReactChain('/app/a.js').variant, 'react-refresh');
  // bare .ts -> plain (not in the app-root refresh extension set)
  assert.equal(selectReactChain('/app/a.ts').variant, 'plain');
  // anything under /node_modules/ -> plain
  assert.equal(selectReactChain('/node_modules/pkg/index.js').variant, 'plain');
  assert.equal(selectReactChain('/node_modules/pkg/index.tsx').variant, 'plain');
  // .d.ts and non-source -> not owned
  assert.equal(selectReactChain('/app/types.d.ts'), null);
  assert.equal(selectReactChain('/app/styles.css'), null);
});

test('isTransformable matches the covered source extensions', () => {
  for (const p of ['/app/a.ts', '/app/a.tsx', '/app/a.js', '/app/a.jsx', '/app/a.mjs', '/app/a.cts']) {
    assert.equal(isTransformable(p), true, p);
  }
  for (const p of ['/app/a.d.ts', '/app/a.css', '/app/a.json', '/app/a.mdx']) {
    assert.equal(isTransformable(p), false, p);
  }
});
