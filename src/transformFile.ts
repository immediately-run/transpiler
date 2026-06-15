import { transformBabel, type BabelTransformResult } from './babel/transform';
import { selectReactChain } from './presets/react';
import { getWrapperCode, HELPER_PATH } from './react-refresh/wrap';

export interface TransformInput {
  /** Absolute, sandbox-style module path (e.g. `/app/src/App.tsx`). */
  path: string;
  code: string;
}

export interface TransformSuccess {
  /** The transpiled module bytes — byte-identical to the sandbox bundler's output. */
  code: string;
  /** Module specifiers this file `require()`s, plus the HMR helper when wrapped. */
  deps: string[];
}

export interface TransformError {
  message: string;
  filepath: string;
}

export type TransformResult = TransformSuccess | { error: TransformError };

/**
 * Run the full per-file chain for one source module — the exact chain the
 * sandbox bundler runs live (`ReactPreset.mapTransformers` → babel-transformer
 * [→ react-refresh-transformer]). This is the single source of truth both the
 * CLI (pre-transpiling artifacts) and the sandbox (live transpile) depend on, so
 * the output is byte-identical across them (PRETRANSPILED_ARTIFACTS_SPEC §4.4).
 *
 * On success returns `{ code, deps }`; on a Babel error or an unsupported path it
 * returns `{ error }` (it never throws) so callers can skip a single bad file.
 */
export async function transformFile({ path, code }: TransformInput): Promise<TransformResult> {
  const chain = selectReactChain(path);
  if (!chain) {
    return { error: { message: `No transformer for ${path}`, filepath: path } };
  }

  let babelResult: BabelTransformResult;
  try {
    babelResult = await transformBabel({ code, filepath: path, config: chain.babelConfig });
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : String(err), filepath: path },
    };
  }

  let outCode = babelResult.code;
  const deps = new Set(babelResult.dependencies);

  if (chain.variant === 'react-refresh') {
    outCode = getWrapperCode(outCode);
    deps.add(HELPER_PATH);
  }

  return { code: outCode, deps: [...deps] };
}
