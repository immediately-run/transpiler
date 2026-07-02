# immediately.run Markdown / MDX syntax — the syntax the transpiler compiles

**Status:** reference — hand-mirrored from `src/mdx/` (the shipped compile chain) · **Updated:** 2026-07-02

> **Reads first:** `src/mdx/compile.ts` (the `@mdx-js/mdx` compile call this document
> describes), `src/mdx/frontmatter.ts` (the frontmatter/excerpt parser),
> `src/presets/react.ts` (which paths are treated as MDX). For the *pipeline* that consumes
> this output — the cache-zip artifact, the frontmatter sidecar, the boot snapshot — see the
> docs-repo `MDX_CONTENT_COLLECTIONS_SPEC.md`; **this document is only the author-facing
> syntax surface**, not the caching machinery.

This document is the source of truth for **which Markdown/MDX syntax an immediately.run app
may use**. It is derived from the compile configuration in this package — it describes what
the code *does* compile, not an aspiration. Because the browser sandbox and the CLI both call
this package's `compileMdx`, the syntax described here is identical whether a file is
transpiled live in the sandbox or pre-transpiled into a cache zip (byte-identity is the whole
point of the shared package — README, `MDX_CONTENT_COLLECTIONS_SPEC §1.1`).

---

## 1. The compiler and what it implies  *(reference)*

Every `.md` / `.mdx` file is compiled by **[MDX](https://mdxjs.com) v3** (`@mdx-js/mdx`,
pinned in `package.json`) with the **GFM** remark plugin (`remark-gfm`). The exact call
(`src/mdx/compile.ts`):

```ts
compile(
  { path, value: content },      // `content` = source with frontmatter stripped (§3)
  {
    development: true,           // embeds the source path in jsxDEV debug info
    jsx: true,                   // emit JSX (Babel lowers it afterwards)
    providerImportSource: '@immediately-run/sdk/MDXProvider',  // component resolution (§6)
    outputFormat: 'program',     // a module: `export default MDXContent`
    remarkPlugins: [[remarkGfm]],// GFM (§5)
    recmaPlugins: [],            // none
    rehypePlugins: [],           // none
  },
)
```

The consequences an author must know follow directly from these choices:

- The base grammar is **CommonMark** (§4), because that is what MDX parses.
- **GFM** is on (§5), because `remark-gfm` is in `remarkPlugins`.
- **JSX, `{expression}`, and ESM `import`/`export` are on** (§6), because the input is MDX,
  not plain Markdown. This is true for `.md` **and** `.mdx` — see §2.
- **No rehype/recma plugins are configured** (§7): there is *no* automatic heading-slug/anchor
  generation, *no* syntax highlighting, *no* raw-HTML re-parsing, and *no* smart-typography.
  Anything of that kind is the app's job (a component, or a plugin added in a fork).
- Components are resolved through the SDK **MDXProvider** (`providerImportSource`), so an
  undefined component is a **runtime error**, and Markdown links are routed through the SDK's
  in-app navigation by default (§6).

---

## 2. Which files are MDX  *(reference)*

`src/presets/react.ts` routes a file to the MDX compile stage when its path matches
`MDX_APP_ROOT_RE = /^(?!\/node_modules\/).*\.mdx?$/i`:

- **Extensions:** `.md` **and** `.mdx`, matched **case-insensitively** (`.MD`, `.Mdx` work).
- **App-root only:** a `.md`/`.mdx` under `/node_modules/` is owned by **no** transform and is
  not compiled — content collections live in the app tree, not in dependencies.

> **`.md` is not plain CommonMark — it is full MDX.** There is no separate "plain Markdown"
> mode. A `.md` file goes through the exact same MDX compiler as `.mdx`. So a bare `<` or `{`
> in a `.md` file is interpreted as JSX / an expression, and the deviations in §8 apply to
> `.md` too. Author `.md` files as MDX.

---

## 3. Frontmatter  *(reference)*

Before compilation, a leading YAML **frontmatter** block is stripped by
`parseFrontmatter` (`src/mdx/frontmatter.ts`) and **never reaches the MDX compiler**:

````markdown
---
title: Hello MDX
tags:
  - intro
  - demo
draft: false
---

# The body starts here
````

- **Delimiters:** a first line of `---` (a leading BOM and trailing spaces/tabs on the fence
  are tolerated), closed by a line that is exactly `---`. The block must be at the very top of
  the file. `FRONTMATTER_RE` in `frontmatter.ts` is the exact matcher.
- **Grammar:** **YAML 1.2** (the `yaml` package), so nested maps, block/flow sequences, block
  scalars, and quoted strings all parse, and the "Norway problem" is avoided (`no` is the
  string `"no"`, **not** `false`). Only a top-level **map** is kept; a scalar/array/null
  document is ignored and the file is treated as having no frontmatter.
- **Malformed YAML throws.** The MDX compile path surfaces it as a compile error; the metadata
  scanners guard with try/catch and skip the file.

**Frontmatter is data, not props or exports.** It is **not** injected as `export const
frontmatter`, and it is **not** passed to the document as `props`. It is surfaced to the app
only through the SDK metadata hooks (`useFileMetadata`, `useMetadataQuery`, `useAllMetadata`).
Inside the body, `{props.title}` refers to whatever the renderer passed as `props` — which,
for a plain content page, does **not** include the frontmatter. Read frontmatter via the hooks.

### 3.1 The `<More />` excerpt marker

If the body contains the literal marker `<More />` after some non-empty leading text, that
leading text is lifted onto `data.excerpt` and, **together with the marker, removed from the
body that is compiled/rendered** (the following whitespace is trimmed). A `<More />` at the
very start of the body (offset 0) is left in place. This mirrors gray-matter's excerpt
behaviour and is implemented in `frontmatter.ts` (`EXCERPT_SEPARATOR = '<More />'`).

> **Honesty note:** because the prefix is *moved* to `excerpt` (not copied), text before
> `<More />` does not appear in the rendered document body — it lives only in the `excerpt`
> metadata field. Use `<More />` when you want a summary that is *distinct* from the body, not
> merely a "read more" fold of the same prose.

---

## 4. CommonMark (the base grammar)  *(reference)*

Everything CommonMark defines works, subject to the MDX deviations in §8:

| Construct | Syntax |
|---|---|
| Headings (ATX) | `# H1` … `###### H6` |
| Headings (Setext) | a line of text underlined by `===` (h1) or `---` (h2) |
| Bold / italic | `**bold**`, `*italic*` / `_italic_`, `***both***` |
| Inline code | `` `code` `` |
| Fenced code | ` ```lang ` … ` ``` ` (the info string is passed through; see §7 re: highlighting) |
| Blockquote | `> quoted` |
| Ordered / unordered list | `1. item` / `- item`, `* item`, `+ item` (nesting by indent) |
| Thematic break | `---`, `***`, or `___` on their own line |
| Link | `[text](https://example.com "title")` |
| Reference link | `[text][ref]` with `[ref]: https://example.com` |
| Image | `![alt](/path.png "title")` |
| Hard line break | two trailing spaces, or a backslash `\` at end of line |
| Character escape | `\*not italic\*` |

**Setext-vs-thematic-break caveat:** a `---` line *directly under* a non-blank line of text is
a Setext h2 underline, not a horizontal rule. Leave a blank line above `---` when you mean a
rule. (This is standard CommonMark, restated because it surprises authors.)

---

## 5. GFM extensions (`remark-gfm`)  *(reference)*

`remark-gfm` (in `remarkPlugins`) adds GitHub-Flavored Markdown on top of CommonMark:

- **Tables** —
  ```markdown
  | a | b |
  | - | - |
  | 1 | 2 |
  ```
  Column alignment via `:` in the delimiter row (`:-`, `-:`, `:-:`). Compiles to
  `<table><thead><tr><th>…</table>` (verified in this package's golden output).
- **Strikethrough** — `~~gone~~` → `<del>` (GFM single or double tilde).
- **Task lists** — `- [ ] todo` / `- [x] done` → checkbox list items.
- **Autolink literals** — bare `https://…`, `www.…`, and `name@example.com` become links
  without angle brackets. (This is the GFM-supported bare-URL form; the CommonMark
  `<https://…>` angle-bracket autolink is **not** reliable in MDX because `<` starts JSX —
  prefer the bare form or an explicit `[text](url)`.)
- **Footnotes** — `text[^1]` with a `[^1]: definition` block.

---

## 6. MDX extensions — components, expressions, ESM  *(reference)*

Because the input is MDX, three non-Markdown constructs are available in the body.

### 6.1 JSX / components

Write JSX inline or as blocks:

```mdx
<Callout type="warn">Heads up.</Callout>

A self-closing component: <Hr />
```

- **Capitalized name → component; lowercase name → HTML element.** `<Callout>` is a component
  (resolved per §6.4); `<div>` is a literal `<div>`. This is JSX's rule, not a Markdown one.
- **Tags must be well-formed and closed.** MDX is XML-strict: `<br>` must be `<br/>`, every
  element must close, attributes are JSX (`className`, not `class`; `{expr}` for values).
- **Markdown inside a component's children is still parsed** when there is a blank line, per
  MDX's interleaving rules.

### 6.2 Expressions

`{ … }` embeds a JavaScript expression that is evaluated and rendered:

```mdx
# {props.title ?? 'Untitled'}

Two plus two is {2 + 2}.
```

`props` is the props object the renderer passes to the compiled `MDXContent` component. See
§3 — frontmatter is **not** in `props` by default.

### 6.3 ESM `import` / `export`

Top-level `import` and `export` statements work and are hoisted to module scope:

```mdx
import Chart from './Chart';
export const columns = 3;

<Chart data={someData} />
```

`import`s become real module dependencies (the Babel dep-collector that runs after the MDX
stage records them, so a pre-transpiled artifact carries the right specifiers).

### 6.4 Component resolution via the MDXProvider

`providerImportSource: '@immediately-run/sdk/MDXProvider'` means a component that is used but
not `import`ed/`export`ed in the file is looked up from the surrounding **MDXProvider**
context (SDK `useMDXComponents`). Two consequences:

- **A referenced-but-unprovided component is a runtime error** — MDX emits a
  `_missingMdxReference("Callout", …)` guard, so rendering `<Callout>` with no provider entry
  and no import throws *"Expected component `Callout` to be defined"*. Provide it (via the
  SDK `boot({ mdxComponents })` map) or `import` it.
- **Markdown links route in-app by default.** The SDK's `DEFAULT_MDX_COMPONENTS` overrides the
  `a` element with a `<Link>` that routes same-app hrefs through the sandbox router
  (`immediately-run-sdk/src/components/MDXComponents.tsx`). So `[docs](/guide)` navigates
  within the app instead of doing a full-page load; external hrefs render as a normal `<a>`.
  Any intrinsic element (`h1`, `p`, `td`, …) can likewise be overridden through the provider.

### 6.5 Comments

Use an **expression comment**: `{/* this is a comment */}`. HTML comments (`<!-- … -->`) are
**not** valid MDX (§8).

---

## 7. What is deliberately *not* enabled  *(reference)*

`recmaPlugins` and `rehypePlugins` are both empty, so none of the following happen at compile
time — provide them yourself (a component, a fork adding a plugin, or app CSS/JS):

- **No heading anchors / slugs** — headings get no `id` and no `#` link. (No `rehype-slug` /
  `rehype-autolink-headings`.)
- **No syntax highlighting** — a fenced code block's info string (` ```ts `) is passed through
  as a `className` on `<code>`, but nothing tokenises it. Bring a highlighter component.
- **No raw-HTML re-parsing** — HTML in the source is JSX (§6.1), not run through
  `rehype-raw`. It must be valid JSX.
- **No smart typography / GitHub-style admonitions** — plain text is rendered as written.

---

## 8. Deviations from plain Markdown (the gotchas)  *(reference)*

These follow from compiling as MDX and bite authors migrating plain `.md`:

- **`{` and `<` are special.** A literal `<` or `{` in prose is read as the start of JSX or an
  expression. To render one literally, escape it (`\{`, `\<`) or use an HTML entity
  (`&#123;`, `&lt;`).
- **HTML comments don't work.** `<!-- … -->` is a syntax error in MDX. Use `{/* … */}` (§6.5).
- **Indented code blocks are unsupported.** A 4-space-indented block is *not* a code block in
  MDX (indentation is reserved for JSX). Use a **fenced** code block (` ``` `).
- **Raw HTML must be valid JSX.** Unclosed tags (`<br>`, `<img …>`), `class=` instead of
  `className=`, and unquoted attributes all fail. Close every tag and use JSX attribute names.
- **`.md` is MDX too** (§2) — all of the above apply to `.md`, not only `.mdx`.
- **`<More />` is reserved** as the excerpt marker (§3.1); using it as a normal component name
  will truncate your rendered body.

---

## 9. Worked example

The package's own fixture (`test/fixtures/post.mdx`) exercises the surface end-to-end:

````mdx
---
title: Hello MDX
tags:
  - intro
  - demo
---

# {props.title ?? 'Hello'}

This is **MDX** with a [link](https://example.com) and GFM ~~strikethrough~~.

<Callout>Rendered through the provider.</Callout>

| a | b |
| - | - |
| 1 | 2 |
````

Compiling it yields (golden `test/golden/post-mdx.out.js`): frontmatter stripped; `**MDX**` →
`<strong>`; the `[link]` → the provider's `a` (in-app `<Link>`); `~~strikethrough~~` →
`<del>`; the table → `<table><thead>…`; and `<Callout>` resolved from the provider, guarded by
`_missingMdxReference` so an unprovided `Callout` throws at render.

---

## 10. Load-bearing assumptions & code anchors

### Depends-on-today (verified against code, 2026-07-02)

| Assumption (behavior this doc rests on) | Anchor (repo-relative file) | Token (grep-stable) |
|---|---|---|
| MDX compiled by `@mdx-js/mdx` with GFM, `jsx:true`, program output, the SDK provider source | `src/mdx/compile.ts` | `providerImportSource: '@immediately-run/sdk/MDXProvider'` |
| Only `remark-gfm` — no rehype/recma plugins | `src/mdx/compile.ts` | `const rehypePlugins: PluggableList = [];` |
| `.md` **and** `.mdx`, app-root only, case-insensitive, route to the MDX stage | `src/presets/react.ts` | `MDX_APP_ROOT_RE = /^(?!\/node_modules\/).*\.mdx?$/i` |
| Frontmatter is stripped before compile via the YAML-1.2 parser | `src/mdx/frontmatter.ts` | `FRONTMATTER_RE` |
| `<More />` lifts the prefix to `excerpt` and removes it from the body | `src/mdx/frontmatter.ts` | `EXCERPT_SEPARATOR = '<More />'` |
| The default `a` override routes same-app links through the sandbox router | `immediately-run-sdk/src/components/MDXComponents.tsx` | `DEFAULT_MDX_COMPONENTS` |
| An unprovided component throws via the missing-reference guard | `test/golden/post-mdx.out.js` | `_missingMdxReference("Callout"` |
| GFM strikethrough/table compile to `del`/`table` elements | `test/golden/post-mdx.out.js` | `del: "del"` |

Pinned dependency versions live in `package.json` (`@mdx-js/mdx`, `remark-gfm`, `yaml`); the
syntax surface changes only on a deliberate bump of those pins.

## Decisions & rejected alternatives

- **`.md` and `.mdx` share one MDX pipeline** (no separate plain-CommonMark mode). *Rejected:*
  a second parser for `.md` — it would fork the toolchain, break byte-identity between the two
  extensions, and surprise authors whose `.md` used a component. The cost is that `.md` inherits
  the MDX deviations (§8); the benefit is one grammar, one compiler, one cached output.
- **GFM on, everything else off.** `remark-gfm` is included because tables/task-lists/strikethrough
  are table stakes for content apps; rehype/recma plugins (slugs, highlighting, raw-HTML) are left
  to apps/forks so the kernel toolchain stays minimal and apps aren't forced into one highlighter
  or heading-anchor style. *Rejected:* baking slugs/highlighting into the shared chain.
- **Frontmatter is metadata, not props/exports.** It is parsed out before the compiler sees it and
  exposed through the SDK metadata hooks, keeping the compiled module free of frontmatter coupling
  and letting the content-collection machinery own it. *Rejected:* auto-`export const frontmatter`
  / auto-props injection.
- **`<More />` as the excerpt marker.** Kept for gray-matter compatibility with existing content.
  *Rejected:* a frontmatter `excerpt:` field only — the inline marker lets the summary be authored
  in place. (Documented honesty note in §3.1: the prefix is moved, not copied.)

## Open questions

- Should the CommonMark `<https://…>` angle-bracket autolink be made to work under MDX (it is
  currently unreliable because `<` starts JSX), or is the GFM bare-URL form (§5) sufficient?
- Do we want an opt-in rehype layer (slugs + highlighting) as a shared, forkable default, or
  keep it strictly app-owned (current §7 stance)?
