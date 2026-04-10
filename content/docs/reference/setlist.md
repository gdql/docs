---
title: SETLIST
description: "GDQL SETLIST: pull the full setlist for a single show by date or name."
weight: 4
---


`SETLIST FOR` returns the full setlist for one show: every song, in order, broken into sets, with segue markers and lengths where they're known. Use it whenever you want the *what happened that night* answer.

---

## Synopsis

```gdql
SETLIST FOR date_spec;
```

`date_spec` is a specific date (`5/8/77`), a year (`1977`), or a named show (`"Cornell 1977"`).

---

## How it works

`SETLIST FOR` looks up a single show, then expands it into ordered performances grouped by set. The default output is a readable text setlist with segue arrows; switch to `AS JSON` for structured data, or `AS TABLE` for a one-row-per-song view.

---

## Date forms

| Form | Example | Notes |
|------|---------|-------|
| Specific date | `5/8/77` | M/D/YY — the most common form |
| Specific date (4-digit year) | `5/8/1977` | Same show, longer year |
| Named show | `"Cornell 1977"` | Works for shows with well-known names |
| Year | `1977` | Picks a representative show for the year |

---

## Examples

### Specific dates

```gdql
SETLIST FOR 5/8/77;
SETLIST FOR 8/27/72;
SETLIST FOR 3/29/90;
SETLIST FOR 12/31/78;
```

### Famous shows by name

```gdql
SETLIST FOR "Cornell 1977";
SETLIST FOR "Winterland 1978";
SETLIST FOR "Veneta 1972";
```

### Compare two consecutive nights

```gdql
SETLIST FOR 5/7/77;
SETLIST FOR 5/8/77;
SETLIST FOR 5/9/77;
```

The CLI runs each statement in order and prints the results back-to-back — perfect for diffing nights of a run.

### Get the data, not the rendering

```gdql
SETLIST FOR 5/8/77 AS JSON;
SETLIST FOR 5/8/77 AS CSV;
```

---

## What you get back

The default text rendering looks like this:

```text
Grateful Dead — May 8, 1977 — Barton Hall, Cornell University, Ithaca, NY

Set 1:
  1. New Minglewood Blues
  2. Loser
  ...

Set 2:
  1. Scarlet Begonias →
  2. Fire on the Mountain
  ...

Encore:
  1. One More Saturday Night
```

The `→` arrow marks a direct segue (no break). `⇢` marks a "followed by" with a brief pause. JSON output exposes those as the `segue` field on each performance.

---

## Tips

- **Two-digit years are unambiguous** — the Dead were active 1965–1995, so `77` always means 1977.
- **Don't know the exact date?** Combine [`SHOWS AT`]({{< relref "shows" >}}) and `LIMIT 1` to find a candidate, then `SETLIST FOR` that date.
- **For multiple shows in one go**, use semicolons: `SETLIST FOR 5/7/77; SETLIST FOR 5/8/77;`.

**{{< sandbox "setlist-cornell" "5/8/77" >}}** · **{{< sandbox "setlist-cornell-name" "Cornell 1977" >}}**
