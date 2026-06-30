import type { PluggableList } from 'unified';

import { parseFrontmatter } from './frontmatter';

// The MDX compile half of the `.mdx` chain — moved verbatim from
// `sandbox/src/bundler/transforms/mdx/index.ts` (the `MDXTransformer.transform`
// body, leaving the sandbox's `Transformer`/`BundlerError` wrapper behind).
// Co-locating it with Babel + react-refresh in this package is what lets the CLI
// pre-transpile `.mdx` through the IDENTICAL chain the browser runs, so the
// emitted bytes are byte-identical (MDX_CONTENT_COLLECTIONS_SPEC §1.1).
//
// `@mdx-js/mdx` and `remark-gfm` are ESM-only (v3/v4). They are loaded with a
// memoised dynamic `import()` rather than a static one so this module can sit in
// the package's CJS build too: a CJS consumer that never compiles MDX never
// `require()`s an ESM-only package, and one that does gets it via Node's
// ESM-from-CJS dynamic import. The dynamic load changes only *when* the deps
// resolve, never the produced bytes.

type MdxModule = typeof import('@mdx-js/mdx');
type RemarkGfm = (typeof import('remark-gfm'))['default'];

const recmaPlugins: PluggableList = [];
const rehypePlugins: PluggableList = [];

let mdxDepsPromise: Promise<{ compile: MdxModule['compile']; remarkGfm: RemarkGfm }> | null = null;

function loadMdxDeps(): Promise<{ compile: MdxModule['compile']; remarkGfm: RemarkGfm }> {
  if (!mdxDepsPromise) {
    mdxDepsPromise = Promise.all([import('@mdx-js/mdx'), import('remark-gfm')]).then(
      ([{ compile }, { default: remarkGfm }]) => ({ compile, remarkGfm }),
    );
  }
  return mdxDepsPromise;
}

/**
 * A failed MDX compile. Carries the source `line`/`column` when the underlying
 * `@mdx-js/mdx` error is a `VFileMessage` (duck-typed, so this package needs no
 * `vfile-message` dependency just for an `instanceof`). The sandbox transformer
 * re-wraps this into its `BundlerError`; the CLI/consult path drops it to an
 * `{ error }` that omits the single bad file.
 */
export class MdxCompileError extends Error {
  line?: number;
  column?: number;
  constructor(message: string, line?: number, column?: number) {
    super(message);
    this.name = 'MdxCompileError';
    this.line = line;
    this.column = column;
  }
}

/**
 * Compile one `.mdx`/`.md` source to a JSX/JS program string (still pre-Babel).
 * Frontmatter is stripped first (the same `parseFrontmatter` the metadata scan
 * uses) and the `@immediately-run/sdk/MDXProvider` provider import is injected,
 * exactly as the sandbox `MDXTransformer` did. `path` is the absolute,
 * sandbox-style module path; `development: true` embeds it in the emitted
 * `jsxDEV` debug info, so compiling AS the runtime path keeps the bytes identical.
 *
 * Throws `MdxCompileError` on a malformed-MDX failure (never a raw VFileMessage),
 * so callers have a stable error shape.
 */
export async function compileMdx(code: string, path: string): Promise<string> {
  const { content } = parseFrontmatter(code);
  const { compile, remarkGfm } = await loadMdxDeps();
  try {
    const compilerOutput = await compile(
      { path, value: content },
      {
        development: true,
        jsx: true,
        providerImportSource: '@immediately-run/sdk/MDXProvider',
        outputFormat: 'program',
        recmaPlugins,
        rehypePlugins,
        remarkPlugins: [[remarkGfm]],
      },
    );
    return String(compilerOutput.value);
  } catch (e: any) {
    // Duck-type the `VFileMessage` shape (`reason`/`line`/`column`) without a
    // dependency on `vfile-message`.
    const message: string =
      e && typeof e.message === 'string' ? e.message : String(e);
    const line = e && typeof e.line === 'number' ? e.line : undefined;
    const column = e && typeof e.column === 'number' ? e.column : undefined;
    throw new MdxCompileError(message, line, column);
  }
}
