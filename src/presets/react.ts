import type { DepMap } from '../depmap';

// Chain-selection logic moved from
// sandbox/src/bundler/presets/react/ReactPreset.ts (`mapTransformers`),
// restricted to the JS/TS extensions this package owns. The CSS/asset/MDX
// branches stay in the sandbox preset (this package transpiles source modules,
// not styles or long-form prose).
//
// The two Babel configs and the regexes are reproduced VERBATIM from the
// sandbox preset; they pick which of the two chain variants a file gets and so
// are part of the byte-identity contract (§4.4):
//   - app-root js/jsx/mjs/cjs/tsx  -> Babel(react-refresh) + react-refresh wrap
//   - everything else covered (.ts/.mts/.cts, anything under /node_modules/)
//     -> plain Babel(react), no HMR instrumentation
// Note the original asymmetry, preserved deliberately: the app-root regex is
// case-insensitive and excludes bare `.ts`; the fallback regex is
// case-sensitive and excludes `.d.ts`.

/** Babel config for app-root files that receive HMR instrumentation. */
export const REACT_REFRESH_BABEL_CONFIG = {
  presets: [['react', { runtime: 'automatic' }]],
  plugins: [
    ['react-refresh/babel', { skipEnvCheck: true }],
    '@babel/plugin-proposal-explicit-resource-management',
  ],
};

/** Babel config for the non-app-root / non-refresh variant (`.ts`, node_modules). */
export const PLAIN_BABEL_CONFIG = {
  presets: [['react', { runtime: 'automatic' }]],
};

const APP_ROOT_REFRESH_RE = /^(?!\/node_modules\/).*\.((m|c)?jsx?|tsx)$/i;
const COVERED_RE = /\.(m|c)?(t|j)sx?$/;

export type ReactChain =
  | { variant: 'react-refresh'; babelConfig: typeof REACT_REFRESH_BABEL_CONFIG }
  | { variant: 'plain'; babelConfig: typeof PLAIN_BABEL_CONFIG };

/**
 * True for the source-module extensions this package transpiles
 * (`.ts .tsx .js .jsx` and their `.m`/`.c` variants, excluding `.d.ts`). The CLI
 * uses this to decide which files to pre-transpile into artifacts.
 */
export function isTransformable(filepath: string): boolean {
  return selectReactChain(filepath) !== null;
}

/** Pick the chain variant for a path, or `null` if this preset doesn't own it. */
export function selectReactChain(filepath: string): ReactChain | null {
  if (APP_ROOT_REFRESH_RE.test(filepath)) {
    return { variant: 'react-refresh', babelConfig: REACT_REFRESH_BABEL_CONFIG };
  }
  if (COVERED_RE.test(filepath) && !filepath.endsWith('.d.ts')) {
    return { variant: 'plain', babelConfig: PLAIN_BABEL_CONFIG };
  }
  return null;
}

/**
 * The react preset's dependency augmentation, moved verbatim from
 * `ReactPreset.augmentDependencies`. The CLI needs this to compute the same
 * input DepMap the runtime resolves (`computeInputDepMap`). Mutates and returns
 * the passed map, matching the sandbox.
 */
export function augmentDependencies(dependencies: DepMap): DepMap {
  if (!dependencies['react-refresh']) {
    dependencies['react-refresh'] = '^0.11.0';
  }
  dependencies['core-js'] = '3.22.7';
  dependencies['react-error-boundary'] = '^6.1.0';
  return dependencies;
}
