// The narrow surface the same-origin Babel worker bundles (R3-149). The worker's
// only job is to answer `transform` requests with `transformBabel`, so it imports
// from *this* entry rather than the package root — the root re-exports `compileMdx`
// (and its dynamic `import('@mdx-js/mdx')`), which the worker never invokes (MDX
// compiles in-iframe, MDX_CONTENT_COLLECTIONS_SPEC / R3-150). Bundling the root
// into a classic web-worker would drag the whole unified/mdx tree — including its
// `development`/`do-not-use-color` conditional exports that Parcel's resolver can't
// follow — into the worker for no runtime benefit. This entry keeps the worker to
// the Babel chain it actually serves, and is still the tsup-built `transformBabel`
// (same version, byte-identical behaviour to the CLI artifacts + the iframe runtime).
export { transformBabel } from './transform';
export type { ITransformData, BabelTransformResult } from './transform';
