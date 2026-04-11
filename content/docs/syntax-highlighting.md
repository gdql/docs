---
title: Syntax highlighting
description: "Add GDQL syntax highlighting to your website, blog, or code editor. Drop-in Prism.js language definition for the Grateful Dead Query Language."
weight: 15
---


GDQL ships a small Prism.js language definition you can drop into any site that uses Prism. It's also a clean starting point if you want to port the grammar to a different highlighter or editor.

This site uses its own client-side highlighter (you can see it in action on every code block on this page), but the Prism build is the one to use externally.

---

## Use it on your site (Prism.js)

Add Prism core, a theme, and the GDQL language file to your page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
<script src="https://docs.gdql.dev/js/prism-gdql.js"></script>
```

Then write GDQL inside `gdql` code fences:

````markdown
{{< gdql >}}
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
{{< /gdql >}}

{{< gdql >}}
SONGS WITH LYRICS("train", "road");
{{< /gdql >}}

{{< gdql >}}
COUNT "Dark Star" AFTER 1988;
{{< /gdql >}}
````

If your site loads content dynamically, call `Prism.highlightAll()` after the DOM is ready.

---

## Download

| File | Use |
|------|-----|
| [prism-gdql.js](https://docs.gdql.dev/js/prism-gdql.js) | Prism.js language definition |
| [GitHub source](https://github.com/gdql/docs/blob/main/static/js/prism-gdql.js) | View, fork, contribute |

The file is small (~30 lines) and self-contained. Drop it into your project's `static/js/` directory or load it from the URL above.

---

## Tokens it recognizes

- **Keywords**: `SHOWS`, `SONGS`, `PERFORMANCES`, `SETLIST`, `COUNT`, `FIRST`, `LAST`, `RANDOM`, `FROM`, `WHERE`, `WITH`, `AT`, `TOUR`, `BEFORE`, `AFTER`, `ORDER BY`, `LIMIT`, `AS`, `OF`, `FOR`, `AND`, `OR`, `NOT`, `PLAYED`, `GUEST`, `OPENER`, `CLOSER`, `LENGTH`, `LYRICS`, `WRITTEN`, `INTO`, `THEN`, `TEASE`, plus set positions
- **Strings**: double-quoted (`"Dark Star"`) and single-quoted (`'St Stephen'`)
- **Comments**: `--` to end of line
- **Operators**: `>`, `>>`, `~>`, `>=`, `<=`, `!=`, `=`
- **Numbers**: years (`1977`), dates (`5/8/77`), durations (`20min`, `15 sec`)
- **Eras and formats**: `PRIMAL`, `EUROPE72`, `WALLOFSOUND`, `HIATUS`, `BRENT_ERA`, `VINCE_ERA`, `JSON`, `CSV`, `TABLE`, `SETLIST`

---

## Editor support

Editor grammars aren't packaged yet, but the Prism token list is small enough to port. Contributions welcome:

- **VS Code** — A TextMate grammar (`.tmLanguage.json`) is the standard route. Use the Prism tokens above as your starting point.
- **Vim / Neovim** — A `syntax/gdql.vim` file with `syn keyword` and `syn match` rules.
- **Sublime Text** — A `.sublime-syntax` YAML file.
- **Tree-sitter** — A `grammar.js` would also unlock Neovim, Helix, and Zed.

If you build one, open a PR at [github.com/gdql/docs](https://github.com/gdql/docs) and we'll add a download link to this page.

---

## Theming

Prism token names map to standard CSS classes (`.token.keyword`, `.token.string`, `.token.operator`). Swap themes by changing the stylesheet:

```html
<!-- Tomorrow (dark) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">

<!-- Or Solarized Light -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-solarizedlight.min.css">
```

Browse all Prism themes at [prismjs.com/#themes](https://prismjs.com/#themes), or write your own — the tokens are stable.

---

## Why not Hugo's built-in (Chroma)?

Chroma is Hugo's default highlighter and uses Go-based lexers. Adding a GDQL lexer means either forking Chroma or maintaining a custom Hugo build, neither of which is fun. Prism.js loads at runtime, has no build coupling, and the language definition is 30 lines of JavaScript — that was the right tradeoff for a language with a small audience.

If you'd rather have static, build-time highlighting, the same token list ports cleanly to a Chroma lexer in Go. Send a PR if you write one.
