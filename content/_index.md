---
title: GDQL Documentation
description: "Documentation for GDQL (Grateful Dead Query Language). Install the CLI, run queries, and use the full language reference."
---

**GDQL** (Grateful Dead Query Language) is a SQL-inspired language for querying Grateful Dead shows, setlists, and songs. This site is the **documentation** — for the main site and sandbox, see [gdql.dev](https://gdql.dev).

---

## See it in action

Run this in your terminal (after [getting set up]({{< relref "/docs/getting-started" >}})):

```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain" LIMIT 10;
SETLIST FOR 5/8/77;
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min ORDER BY LENGTH DESC LIMIT 5;
```

Segues, setlists, and long jams — in one place.

---

## Quick start

Get the CLI and run your first query in under a minute.

**[→ Getting started]({{< relref "/docs/getting-started" >}})** — Install (or download a release), set up the database, run a query from the shell or a file.

---

## Language reference

The full syntax: query types, clauses, conditions, and operators.

| Section | What you'll find |
|--------|-------------------|
| [Conventions]({{< relref "/docs/reference/conventions" >}}) | Case, strings, comments, and statement rules |
| [Query types]({{< relref "/docs/reference" >}}) | SHOWS, SONGS, PERFORMANCES, SETLIST — with synopsis and examples |
| [WHERE conditions]({{< relref "/docs/reference/where" >}}) | Segues, set position, PLAYED, GUEST, AND/OR/NOT |
| [Operators & formats]({{< relref "/docs/reference/operators" >}}) | `>`, `>>`, dates, eras, output formats |

---

## Example queries

Copy-paste ready examples for common tasks.

**[→ Example queries]({{< relref "/docs/examples" >}})** — Scarlet > Fire, setlist for a date, longest jams, SET1 opener / encore, and more.

---

## Other

- **[Syntax highlighting]({{< relref "/docs/syntax-highlighting" >}})** — Use ` ```gdql ` in docs; how custom highlighting is implemented.

**In short:** Keywords are **case-insensitive**. Song names and strings use **double quotes**. Statements can end with **`;`**. Comments start with **`--`**.
