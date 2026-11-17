// R3-1348 — the host's frontmatter parse delegates to the canon, and this proves it.
//
// The SUBJECT is this package's built export — `dist/index.js` `parseFrontmatter`, the
// function the sandbox's metadata scan and the CLI's sidecar call — run against the
// canon's published fixture (`FRONTMATTER_PARITY_FIXTURE`, whose expectations are
// `yaml.parse`'s, frozen in @immediately-run/mdx-plugins). The subject guard below keeps a
// second YAML reader from coming back: agreement by construction holds only while this
// package calls the canon and nothing else.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { FRONTMATTER_PARITY_FIXTURE, parseFrontmatter as parseCanon } from '@immediately-run/mdx-plugins/frontmatter';
import { parseFrontmatter, FrontmatterParseError, compileMdx } from '../dist/index.js';

const SRC = new URL('../src/', import.meta.url).pathname;

/** The error a call throws, or null. */
function thrownBy(fn) {
  try {
    fn();
  } catch (e) {
    return e;
  }
  return null;
}

// Review 1-A-2: every way a module can load `yaml` (or a `yaml/…` subpath) — static,
// side-effect, dynamic import, re-export, require — not only `from 'yaml'`.
const YAML_IMPORT = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)['"]yaml(?:\/[^'"]*)?['"]/;
const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : /\.[cm]?[jt]sx?$/.test(n) ? [p] : [];
  });

test('every canon fixture case: the same data, or a FrontmatterParseError of the same kind', () => {
  assert.ok(FRONTMATTER_PARITY_FIXTURE.length >= 30, 'the fixture is the real one');
  for (const c of FRONTMATTER_PARITY_FIXTURE) {
    if (c.expected.errorKind) {
      const e = thrownBy(() => parseFrontmatter(c.source));
      assert.ok(e instanceof FrontmatterParseError, `${c.name}: expected a FrontmatterParseError — ${c.why}`);
      assert.equal(e.kind, c.expected.errorKind, `${c.name}: kind`);
      // Review 1-A-0 / 1-B-1: the canon's own message reaches the thrown one.
      const canon = parseCanon(c.source).error;
      assert.ok(e.message.includes(canon.message), `${c.name}: "${e.message}" carries "${canon.message}"`);
      continue;
    }
    const { data } = parseFrontmatter(c.source);
    const { excerpt: _excerpt, ...rest } = data;
    assert.deepEqual(rest, c.expected.data, `${c.name} — ${c.why}`);
  }
});

test('the thrown error carries the canon message, its yaml code and the document position', () => {
  const hero = FRONTMATTER_PARITY_FIXTURE.find((c) => c.name === 'real-grove-hero-unquoted');
  const e = thrownBy(() => parseFrontmatter(hero.source));
  assert.ok(e, 'the unquoted hero.mdx must not parse');
  assert.equal(e.name, 'FrontmatterParseError');
  assert.equal(e.kind, 'yaml');
  assert.equal(e.line, 4);
  assert.equal(typeof e.code, 'string');
  assert.match(e.message, /^frontmatter \(line 4, column \d+\): /);
  const canon = parseCanon(hero.source).error;
  assert.equal(e.message, `frontmatter (line ${canon.line}, column ${canon.column}): ${canon.message}`);
});

test('subject guard: src/ imports no yaml, and the frontmatter module calls the canon', () => {
  for (const form of [
    "import { parse } from 'yaml';",
    'import "yaml";',
    "const y = await import('yaml');",
    "export { parse } from 'yaml';",
    "const y = require('yaml');",
    "import { Document } from 'yaml/dist/doc';",
  ]) assert.match(form, YAML_IMPORT, `the guard sees: ${form}`);
  for (const benign of ["import x from 'yaml-front-matter';", "// a comment about yaml", "const yamlText = '';"]) {
    assert.doesNotMatch(benign, YAML_IMPORT, `the guard ignores: ${benign}`);
  }
  const offenders = walk(SRC).filter((f) => YAML_IMPORT.test(readFileSync(f, 'utf8')));
  assert.deepEqual(offenders, [], 'a second YAML reader in src/');
  const fm = readFileSync(join(SRC, 'mdx/frontmatter.ts'), 'utf8');
  assert.match(fm, /from '@immediately-run\/mdx-plugins\/frontmatter'/);
  assert.match(fm, /parseFrontmatter as parseCanon/);
});

test('the canon is pinned exactly, and yaml is pinned to the canon\'s own pin', () => {
  // yaml stays a runtime dependency here so tsup leaves it external (bundling it broke the
  // ESM build: `Dynamic require of "process"`). It must be the version the canon pins, or
  // the transpiler would resolve a second yaml beside the canon's.
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.dependencies['@immediately-run/mdx-plugins'], '0.8.0');
  const req = createRequire(import.meta.url);
  const canonPkg = req('@immediately-run/mdx-plugins/package.json');
  assert.equal(pkg.dependencies.yaml, canonPkg.dependencies.yaml, 'transpiler yaml pin = canon yaml pin');
  assert.equal(req('yaml/package.json').version, canonPkg.dependencies.yaml, 'one yaml installed');
});

test('the <More /> excerpt is lifted onto data and stripped from content, as before', () => {
  const src = '---\ntitle: Post\n---\nThe teaser.\n<More />\n\nThe rest.\n';
  const { data, content } = parseFrontmatter(src);
  assert.equal(data.title, 'Post');
  assert.equal(data.excerpt, 'The teaser.\n');
  assert.equal(content, 'The rest.\n');
  // A marker at offset 0 stays put (gray-matter's truthy-excerpt check).
  const atStart = parseFrontmatter('---\nt: x\n---\n<More />\nBody\n');
  assert.equal(atStart.data.excerpt, undefined);
  assert.ok(atStart.content.startsWith('<More />'));
});

test('compileMdx: a rejected block contributes no keys — its sectionIds opt-out included', async () => {
  // Review 1-B-0: before R3-1348 a block holding a Date still yielded its other keys, so
  // `sectionIds: false` applied. The canon rejects such a block whole (data {}), and a
  // rejected block has no keys: the heading gets the default section id. Pinned here so
  // the change is a stated rule, not a surprise.
  const body = '\n## 5.2 Hi there\n';
  const ok = await compileMdx(`---\nsectionIds: false\n---\n${body}`, '/app/content/ok.mdx');
  // Review 2-r2-0: match the id ATTRIBUTE — the default output also carries the text slug
  // as data-slug, so a bare /52-hi-there/ could not fail.
  assert.match(ok, /id="52-hi-there"/, 'a valid block applies its opt-out');
  assert.doesNotMatch(ok, /sec-5-2/, 'and no section id appears');
  const rejected = await compileMdx(`---\nsectionIds: false\nd: !!timestamp 2026-01-01\n---\n${body}`, '/app/content/rejected.mdx');
  assert.match(rejected, /id="sec-5-2"/, 'a rejected block applies nothing');
});

test('compileMdx: invalid YAML fails the compile as before; a non-map or non-JSON block still compiles', async () => {
  await assert.rejects(compileMdx('---\nid: a\nid: b\n---\n# Hi\n', '/app/content/dup.mdx'), (e) => e instanceof FrontmatterParseError && e.kind === 'yaml');
  for (const [name, src] of [
    ['not-a-map', '---\n- a\n- b\n---\n# Hi\n'],
    ['not-json', '---\npublished: !!timestamp 2026-01-01\n---\n# Hi\n'],
  ]) {
    const out = await compileMdx(src, `/app/content/${name}.mdx`);
    assert.match(out, /Hi/, `${name}: the body compiled`);
  }
});
