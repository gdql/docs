---
title: Syntax highlighting
description: "Use gdql code blocks for GDQL syntax highlighting on the docs site (Prism.js)."
weight: 15
---

# Syntax highlighting

This site uses **Prism.js** with a custom **GDQL** language so GDQL code blocks are highlighted (keywords, strings, comments, operators).

## In the docs

Use fenced code blocks with the `gdql` language:

````markdown
```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SONGS WITH LYRICS("train", "road") WRITTEN 1968-1970;
```
````

That produces GDQL-colored output (e.g. keywords, quoted strings, `--` comments, `>`, numbers). You can still use ` ```sql ` for a SQL-like fallback if you prefer.

## How it’s implemented

- **static/js/prism-gdql.js** — Prism language definition: tokens for keywords (SHOWS, FROM, WHERE, …), double-quoted strings, `--` comments, operators (`>`, `>>`, `=`, …), numbers (including e.g. `20min`), and format/era names (JSON, PRIMAL, …).
- **Footer partial** — Loads Prism (core + Tomorrow theme) and our GDQL script, then runs `Prism.highlightAll()` so every `code.language-gdql` block is highlighted.

To change colors, swap the Prism theme CSS (e.g. `prism-tomorrow.min.css` → another theme from the [Prism theme list](https://prismjs.com/#supported-languages)).

## Other options (unchanged)

- **Chroma (Hugo):** Would require a custom lexer in Go and possibly a fork; not used here.
- **CLI / editor:** A REPL or VS Code/TextMate grammar would be a separate project.
