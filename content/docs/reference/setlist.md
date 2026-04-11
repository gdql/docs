---
title: SETLIST
description: "Use GDQL SETLIST to pull the full setlist for any Grateful Dead show by date — including Cornell 77 (5/8/77), Veneta, and all 2,014 concerts from 1965 to 1995."
weight: 4
---


`SETLIST FOR` returns the full setlist for one show: every song, in order, broken into sets, with segue markers and lengths where they're known. Use it whenever you want the *what happened that night* answer.

---

## Synopsis

{{< gdql >}}
SETLIST FOR date_spec;
{{< /gdql >}}

`date_spec` is a specific date (`5/8/77` or `1977-05-08`), a year (`1977`), or a named show (`"Cornell 1977"`). The `FOR` keyword is optional — `SETLIST 1977-05-08;` works too.

---

## How it works

`SETLIST FOR` looks up a single show, then expands it into ordered performances grouped by set. The default output is a readable text setlist with segue arrows; switch to `AS JSON` for structured data, or `AS TABLE` for a one-row-per-song view.

---

## Date forms

| Form | Example | Notes |
|------|---------|-------|
| Specific date | `5/8/77` | M/D/YY — the most common form |
| Specific date (4-digit year) | `5/8/1977` | Same show, longer year |
| ISO date | `1977-05-08` | YYYY-MM-DD format |
| Named show | `"Cornell 1977"` | Works for shows with well-known names |
| Year | `1977` | Picks a representative show for the year |

---

## Examples

### Specific dates

{{< gdql >}}
SETLIST FOR 5/8/77;  -- Cornell
SETLIST FOR 8/27/72;  -- Veneta
SETLIST FOR 3/29/90;  -- Nassau
SETLIST FOR 12/31/78;  -- Winterland NYE
SETLIST 1974-10-19;  -- YYYY-MM-DD, no FOR needed
{{< /gdql >}}

### Compare two consecutive nights

{{< gdql >}}
SETLIST FOR 5/7/77;
SETLIST FOR 5/8/77;
SETLIST FOR 5/9/77;
{{< /gdql >}}

The CLI runs each statement in order and prints the results back-to-back — perfect for diffing nights of a run.

### Get the data, not the rendering

{{< gdql >}}
SETLIST FOR 5/8/77 AS JSON;
SETLIST FOR 5/8/77 AS CSV;
{{< /gdql >}}

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
  1. Scarlet Begonias
  2. Fire on the Mountain
  ...

Encore:
  1. One More Saturday Night
```

Each song is listed in order within its set. JSON output exposes set number and position for each performance.

---

## Tips

- **Two-digit years are unambiguous** — the Dead were active 1965–1995, so `77` always means 1977.
- **Don't know the exact date?** Combine [`SHOWS AT`]({{< relref "shows" >}}) and `LIMIT 1` to find a candidate, then `SETLIST FOR` that date.
- **For multiple shows in one go**, use semicolons: `SETLIST FOR 5/7/77; SETLIST FOR 5/8/77;`.

**{{< sandbox "setlist-cornell" "5/8/77" >}}** · **{{< sandbox "setlist-cornell-name" "Cornell 1977" >}}**
