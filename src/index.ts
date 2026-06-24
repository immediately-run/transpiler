// @immediately-run/transpiler — the single source of truth for immediately.run's
// per-file transform chain (Babel + react-refresh), shared byte-for-byte between
// the browser sandbox bundler and the CLI's pre-transpiled-artifact emitter.
// See PRETRANSPILED_ARTIFACTS_SPEC §4.4.

export { TRANSPILER_VERSION, PRESET_NAME } from './version';

// The public chain entry point.
export { transformFile } from './transformFile';
export type {
  TransformInput,
  TransformSuccess,
  TransformError,
  TransformResult,
} from './transformFile';

// Chain internals, exported so the sandbox can route its existing transformer
// classes through this package without re-implementing the chain.
export { transformBabel } from './babel/transform';
export type { ITransformData, BabelTransformResult } from './babel/transform';
export {
  selectReactChain,
  isTransformable,
  augmentDependencies,
  REACT_REFRESH_BABEL_CONFIG,
  PLAIN_BABEL_CONFIG,
} from './presets/react';
export type { ReactChain } from './presets/react';
export {
  getWrapperCode,
  HELPER_PATH,
  HELPER_CODE,
  REACT_REFRESH_RUNTIME,
} from './react-refresh/wrap';

// Dependency-map facts the CLI needs to compute the lockset input, plus the
// resolution-completeness guard shared with the sandbox runtime + CLI builder.
export { computeInputDepMap, assertDependenciesResolved } from './depmap';
export type { DepMap, ResolvedDependency } from './depmap';
export { filterBuildDeps, isBuildDep } from './presets/build-dep';

// Toolchain stamping.
export { computeToolchainHash } from './toolchainHash';
export type { TarballFiles } from './toolchainHash';
