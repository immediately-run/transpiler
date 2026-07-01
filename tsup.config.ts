import { defineConfig } from 'tsup';

// Bundle the package into a single entry. Both consumers (the sandbox worker
// build and the CLI) import the public API from the package root, so unlike the
// SDK there is no per-file subpath contract to preserve. `@babel/standalone`,
// the babel plugins and `react-refresh/babel` stay external — they are heavy,
// versioned exactly (the version IS the toolchain stamp, §4.4), and must resolve
// to the consumer's installed copy so the produced bytes match.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  external: [
    '@babel/standalone',
    '@babel/plugin-proposal-explicit-resource-management',
    'react-refresh/babel',
    // ESM-only; loaded via a dynamic `import()` in src/mdx/compile.ts and kept
    // external so the CJS build never statically `require()`s them (and so the
    // resolved version — which affects the emitted MDX bytes — is the consumer's
    // installed copy, like the babel deps above).
    '@mdx-js/mdx',
    'remark-gfm',
  ],
});
