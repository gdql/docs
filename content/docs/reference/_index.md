---
title: Language reference
description: "GDQL language reference: query types (SHOWS, SONGS, PERFORMANCES, SETLIST), WHERE, and operators."
weight: 20
---

# Language reference

Full syntax for GDQL. For conventions (case, strings, comments), see [Conventions]({{< relref "conventions" >}}).

---

## Query types

| Query | Description |
|-------|-------------|
| [SHOWS]({{< relref "shows" >}}) | List shows; filter by date, WHERE conditions, ORDER BY, LIMIT, AS format. |
| [SONGS]({{< relref "songs" >}}) | List songs; filter by WITH LYRICS, WRITTEN date. |
| [PERFORMANCES]({{< relref "performances" >}}) | List performances of a song; filter by date, WITH LENGTH, ORDER BY. |
| [SETLIST]({{< relref "setlist" >}}) | Setlist for a single date (e.g. `SETLIST FOR 5/8/77`). |

---

## Conditions and operators

- [WHERE conditions]({{< relref "where" >}}) — Segues (`>`, `>>`), set position (SET1 OPENED, ENCORE =), PLAYED, GUEST, LENGTH; AND/OR/NOT.
- [Operators]({{< relref "operators" >}}) — Segue tokens, logical operators, comparisons, dates/eras, output formats.

Use [Getting started]({{< relref "/docs/getting-started" >}}) for install and running queries.
