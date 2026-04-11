---
title: Language reference
description: "Full GDQL language reference: query types, conventions, WHERE conditions, and operators."
weight: 20
---


This is the full GDQL (Grateful Dead Query Language) reference. Start with [Conventions]({{< relref "conventions" >}}) for the rules that apply everywhere, then drill into the query type or condition you need.

---

## Query types

Every GDQL statement starts with one of these four keywords. They define what kind of result you get back.

| Query | Returns | Read more |
|-------|---------|-----------|
| [`SHOWS`]({{< relref "shows" >}}) | One row per concert. The workhorse — filter by venue, date, era, segue, set position, played, guest. | [SHOWS]({{< relref "shows" >}}) |
| [`SONGS`]({{< relref "songs" >}}) | One row per song in the catalog. Filter by lyrics and written date. | [SONGS]({{< relref "songs" >}}) |
| [`PERFORMANCES`]({{< relref "performances" >}}) | One row per time a song was played. Filter by date and length. | [PERFORMANCES]({{< relref "performances" >}}) |
| [`SETLIST`]({{< relref "setlist" >}}) | The full setlist for a single show. | [SETLIST]({{< relref "setlist" >}}) |

There's also `COUNT` (for `COUNT "Song"` or `COUNT SHOWS`), `FIRST`, `LAST`, and `RANDOM SHOW` — see [Cookbook]({{< relref "../advanced" >}}) for those.

---

## Conditions and operators

| Topic | What it covers |
|-------|----------------|
| [Conventions]({{< relref "conventions" >}}) | Case rules, strings, comments, statement termination, whitespace |
| [WHERE conditions]({{< relref "where" >}}) | Segues (`>`, `>>`, `~>`), set positions, `PLAYED`, `GUEST`, `LENGTH`, and combining with `AND`/`OR`/`NOT` |
| [Operators]({{< relref "operators" >}}) | The complete token reference: segues, comparisons, dates, eras, and output formats |

---

## How the pieces fit together

A typical query reads like a sentence: a query type, optional filters, and an output shape.

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977-1978 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet" ORDER BY DATE LIMIT 10 AS JSON;
{{< /gdql >}}

That single statement asks: *"Give me the first 10 Winterland shows from 1977 or 1978 where Scarlet went into Fire and they also played Estimated Prophet, oldest first, as JSON."*

For more queries like this, see [Cookbook]({{< relref "../advanced" >}}).

---

New to GDQL? Start at [Getting started]({{< relref "/docs/getting-started" >}}) to install the CLI, or jump straight into the **{{< sandbox "" "Sandbox" >}}** to try queries in the browser.
