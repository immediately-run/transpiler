import test from 'node:test';
import assert from 'node:assert/strict';

import { computeInputDepMap, filterBuildDeps, isBuildDep } from '../dist/index.js';

test('computeInputDepMap: augments, filters build deps, strips self-hosted, sorts', () => {
  const out = computeInputDepMap({
    react: '^19.0.0',
    vite: '^5.0.0',
    'babel-plugin-macros': '^3.0.0',
    '@immediately-run/sdk': '^0.4.0',
  });
  // self-hosted + build deps removed; preset augments added; keys sorted.
  assert.deepEqual(out, {
    'core-js': '3.22.7',
    react: '^19.0.0',
    'react-error-boundary': '^6.1.0',
    'react-refresh': '^0.11.0',
  });
  // key order is sorted
  assert.deepEqual(Object.keys(out), Object.keys(out).slice().sort());
});

test('computeInputDepMap: keeps an app-declared react-refresh range', () => {
  const out = computeInputDepMap({ 'react-refresh': '^0.14.0' });
  assert.equal(out['react-refresh'], '^0.14.0');
});

test('computeInputDepMap: does not mutate the caller input', () => {
  const input = { react: '^19.0.0' };
  computeInputDepMap(input);
  assert.deepEqual(input, { react: '^19.0.0' });
});

test('computeInputDepMap: extra registryResolved names are stripped', () => {
  const out = computeInputDepMap({ left: '1.0.0', right: '2.0.0' }, ['left']);
  assert.ok(!('left' in out));
  assert.equal(out.right, '2.0.0');
});

test('isBuildDep / filterBuildDeps', () => {
  assert.equal(isBuildDep('vite'), true);
  assert.equal(isBuildDep('@babel/plugin-transform-runtime'), true);
  assert.equal(isBuildDep('babel-preset-react-app'), true);
  assert.equal(isBuildDep('react'), false);
  assert.deepEqual(filterBuildDeps({ react: '^19', vite: '^5' }), { react: '^19' });
});
