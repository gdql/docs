---
title: Syntax highlighting
description: "Add GDQL syntax highlighting to your docs site, blog, or editor."
weight: 15
---


A Prism.js language definition for GDQL is published with the docs site. Drop it into any page that uses Prism, or use it as a starting point for an editor grammar.

---

## Use it on your site (Prism.js)

Add Prism core, a theme, and the GDQL language file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
<script src="https://docs.gdql.dev/js/prism-gdql.js"></script>
```

Then write GDQL in code blocks with the `gdql` language:

````markdown
```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SONGS WITH LYRICS("train", "road") WRITTEN 1968-1970;
COUNT "Dark Star" AFTER 1988;
```
````

Or call `Prism.highlightAll()` after your DOM loads.

---

## Download

| File | Use |
|------|-----|
| [prism-gdql.js](https://docs.gdql.dev/js/prism-gdql.js) | Prism.js language definition |
| [GitHub source](https://github.com/gdql/docs/blob/main/static/js/prism-gdql.js) | View, fork, contribute |

The file is small (~30 lines) and self-contained — drop it into your project's `static/js/` or load it from the URL above.

---

## Tokens recognized

- **Keywords**: `SHOWS`, `SONGS`, `PERFORMANCES`, `SETLIST`, `COUNT`, `FIRST`, `LAST`, `RANDOM`, `FROM`, `WHERE`, `WITH`, `AT`, `TOUR`, `BEFORE`, `AFTER`, `ORDER BY`, `LIMIT`, `AS`, `OF`, `FOR`, `AND`, `OR`, `NOT`, `PLAYED`, `GUEST`, `OPENER`, `CLOSER`, `LENGTH`, `LYRICS`, `WRITTEN`, `INTO`, `THEN`, `TEASE`, set positions
- **Strings**: double-quoted `"Dark Star"` and single-quoted `'St Stephen'`
- **Comments**: `-- end of line`
- **Operators**: `>`, `>>`, `~>`, `>=`, `<=`, `!=`, `=`
- **Numbers**: years (`1977`), dates (`5/8/77`), durations (`20min`, `15 sec`)
- **Eras / formats**: `PRIMAL`, `EUROPE72`, `BRENT_ERA`, `VINCE_ERA`, `WALLOFSOUND`, `HIATUS`, `JSON`, `CSV`, `TABLE`, `SETLIST`

---

## Editor support

Not yet packaged, but the Prism grammar is small enough to port. Contributions welcome:

- **VS Code**: A TextMate grammar (`.tmLanguage.json`) is straightforward — see Prism's tokens above as a starting point
- **Vim / Neovim**: A `syntax/gdql.vim` file with `syn keyword` and `syn match` rules
- **Sublime Text**: A `.sublime-syntax` YAML file
- **Tree-sitter**: A `grammar.js` would also enable Neovim, Helix, Zed support

Open a PR at [github.com/gdql/docs](https://github.com/gdql/docs) if you build one — happy to add a download table here.

---

## Theming

The Prism token names map to standard CSS classes (`.token.keyword`, `.token.string`, etc.). Swap themes by changing the stylesheet:

```html
<!-- Tomorrow (dark) — used on this site -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">

<!-- Or Solarized Light -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-solarizedlight.min.css">
```

Browse all Prism themes at [prismjs.com/#themes](https://prismjs.com/#themes).

---

## Why not Hugo's built-in (Chroma)?

Chroma is Hugo's default highlighter and uses Go-based lexers. Adding a GDQL lexer would require either forking Chroma or maintaining a custom build of Hugo. Prism.js loads at runtime, has no build coupling, and the language definition is 30 lines of JavaScript — it was the right tradeoff for this site.

If you'd rather have static (build-time) highlighting, the same token list above can be ported to a Chroma lexer in Go.
