import { augmentDependencies } from './presets/react';
import { isBuildDep } from './presets/build-dep';

// dependency name => version range, same shape the runtime uses.
export type DepMap = Record<string, string>;

// Modules the runtime ALWAYS resolves from a self-hosted versioned origin, not
// the sandpack CDN (sandbox `SELF_HOST_BASES`). Resolution is implicit, so these
// are stripped from the input DepMap unconditionally — keep in sync with the
// sandbox. (`@immediately-run/sdk` is fetched from gh-pages `/v/<version>/`.)
const SELF_HOSTED_MODULES = ['@immediately-run/sdk'];

const sortDepMap = (deps: DepMap): DepMap =>
  Object.fromEntries(Object.entries(deps).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));

/**
 * Replicate the runtime's input DepMap derivation for the react preset
 * (`Bundler.loadNodeModules`): strip self-hosted modules, augment with the
 * preset's implicit deps, filter build-time-only deps, then key-sort. The CLI
 * embeds the result as the lockset's `dependencies` echo and the runtime applies
 * a sidecar lockset only on an exact match against its own computed map — so any
 * divergence here just falls back to live resolution, never a wrong lockset.
 *
 * Self-hosted modules (`SELF_HOSTED_MODULES`, plus any extra `registryResolved`
 * names) are stripped so a freshly published version not yet replicated npm→CDN
 * can't 500 the whole `/dep_tree/` request. This mirrors the runtime's
 * `registryResolvedNames()` stripping, keeping the echo comparison matched.
 *
 * Absorbed from the CLI's `src/lockset.ts` duplicate (PRETRANSPILED_ARTIFACTS_SPEC
 * §4.4: the shared package is the single source of truth).
 */
export function computeInputDepMap(
  pkgDependencies: DepMap,
  registryResolved: readonly string[] = [],
): DepMap {
  const skip = new Set([...SELF_HOSTED_MODULES, ...registryResolved]);
  const selfHosted: DepMap = {};
  for (const [name, range] of Object.entries(pkgDependencies)) {
    if (!skip.has(name)) selfHosted[name] = range;
  }
  const augmented = augmentDependencies(selfHosted);
  const filtered: DepMap = {};
  for (const [name, range] of Object.entries(augmented)) {
    if (!isBuildDep(name) && !skip.has(name)) filtered[name] = range;
  }
  return sortDepMap(filtered);
}
