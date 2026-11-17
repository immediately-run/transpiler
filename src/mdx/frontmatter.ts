import { parseFrontmatter as parseCanon } from '@immediately-run/mdx-plugins/frontmatter';
import type { FrontmatterError } from '@immediately-run/mdx-plugins/frontmatter';

/**
 * The host's frontmatter parse — a wrapper over the ONE parser every corpus reader shares
 * (`@immediately-run/mdx-plugins/frontmatter`, R3-1347; this delegation is R3-1348).
 *
 * The sandbox's metadata scan, the artifact store and the CLI's cache-zip sidecar call
 * `parseFrontmatter` here; Grove under dispatch, the docs checker and kanban call the
 * canon directly. Because this file calls the canon rather than `yaml` itself, the
 * metadata a forked wiki's index holds and the metadata a dispatched one reads are the
 * same values by construction — the two used to be different parsers (1,259 of 2,880 real
 * pages agreed). `test/frontmatter.test.mjs` runs the canon's published fixture against
 * this package's built export and guards that no `yaml` import returns to `src/`.
 *
 * What this wrapper adds, and keeps from the gray-matter era:
 *  - the `{ data, content }` shape the sandbox and CLI import;
 *  - the `<More />` excerpt: the text before the first marker, when non-empty, is lifted
 *    onto `data.excerpt` and stripped (with following whitespace) from `content`. It is
 *    derived from the BODY, not parsed from the block, so the canon does not compute it:
 *    the host's metadata may carry `excerpt` and the canon's never does — the one stated
 *    asymmetry (nothing in grove, docs, kanban, the SDK or the sandbox reads it);
 *  - a throw when the block yields no data. The canon never throws and reports why in
 *    `error`; callers here (the sandbox's `extractMetadata`, the CLI's sidecar emitter)
 *    catch and log, so the throw is how they learn it. It carries the canon's kind, its
 *    `yaml` code and the document position.
 */
export type FrontmatterParseResult = {
  data: Record<string, any>;
  content: string;
};

const EXCERPT_SEPARATOR = '<More />';

/** Thrown by {@link parseFrontmatter} when a present block yields no data. */
export class FrontmatterParseError extends Error {
  readonly kind: FrontmatterError['kind'];
  readonly code?: string;
  readonly line?: number;
  readonly column?: number;

  constructor(error: FrontmatterError) {
    const at = error.line === undefined ? '' : ` (line ${error.line}${error.column === undefined ? '' : `, column ${error.column}`})`;
    super(`frontmatter${at}: ${error.message}`);
    this.name = 'FrontmatterParseError';
    this.kind = error.kind;
    this.code = error.code;
    this.line = error.line;
    this.column = error.column;
  }
}

/**
 * The canon's parse plus the excerpt lift, and the canon's `error` when the block yielded
 * no data — the shared core of {@link parseFrontmatter} (which throws on any error) and
 * `compileMdx` (which throws only on invalid YAML, as it always has).
 */
export function splitFrontmatter(code: string): FrontmatterParseResult & { error?: FrontmatterError } {
  const parsed = parseCanon(code);
  const data: Record<string, any> = { ...parsed.data };
  let content = parsed.content;

  // Excerpt: the text before the first `<More />` marker (gray-matter-compatible). Only
  // when that prefix is non-empty — a marker at offset 0 is left in place, as gray-matter's
  // truthy-excerpt check did.
  const sepIdx = content.indexOf(EXCERPT_SEPARATOR);
  if (sepIdx > 0) {
    data.excerpt = content.slice(0, sepIdx);
    content = content.slice(sepIdx + EXCERPT_SEPARATOR.length).trimStart();
  }

  return parsed.error ? { data, content, error: parsed.error } : { data, content };
}

/**
 * Parse leading `---` YAML frontmatter out of an MDX/Markdown source: `{ data, content }`,
 * `data` being `{}` when there is no frontmatter.
 *
 * Throws {@link FrontmatterParseError} when a block is present but yields no data —
 * invalid YAML, a block that is not a map, or a value JSON cannot carry (see the canon's
 * `FrontmatterError`). Callers that must not fail — the sandbox `Bundler.extractMetadata`,
 * the CLI metadata emitter — guard with try/catch.
 */
export const parseFrontmatter = (code: string): FrontmatterParseResult => {
  const { data, content, error } = splitFrontmatter(code);
  if (error) throw new FrontmatterParseError(error);
  return { data, content };
};
