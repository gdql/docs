---
title: Operators
description: "GDQL operators: segue tokens, logical operators, comparisons, dates, eras, and output formats."
weight: 11
---


This page lists every operator and reserved token in GDQL — segues, logical connectors, comparisons, date forms, era aliases, and output formats. Use it as a lookup table when you're not sure which token to reach for.

---

## Segue / sequence

Connects two song names inside a `WHERE` clause.

| Token | Alt | Meaning |
|-------|-----|---------|
| `>` | `INTO`, `->` | Adjacent in setlist (position-based) |
| `>>` | `THEN` | Followed by (with a break or applause) |
| `~>` | `TEASE` | Teased — partial quote, not a full performance (requires tease data import) |

Chains are exact: `"A" > "B" > "C"` only matches shows where all three appear in that order, adjacent in the setlist.

---

## Logical

Combine conditions inside a `WHERE` clause.

| Token | Meaning |
|-------|---------|
| `AND` | Both conditions must hold |
| `OR` | Either condition holds |
| `NOT` | Negate the next condition (e.g. `NOT "Song"`, `NOT PLAYED "Song"`) |

`AND` binds tighter than `OR`. There is no parenthesization yet — keep complex queries simple, or break them into separate statements.

---

## Comparisons

Used in `WITH LENGTH` and `LENGTH(...)` conditions. These require length data to be imported.

| Token | Meaning |
|-------|---------|
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |
| `=` | Equal |
| `!=` | Not equal |

---

## Set position tokens

Used inside `WHERE` to filter by where a song appeared.

| Token | Meaning |
|-------|---------|
| `SET1`, `SET2`, `SET3` | Refer to the first, second, or third set |
| `ENCORE` | Alias for `SET3` |
| `OPENED` | First song of the named set: `SET1 OPENED "..."` |
| `CLOSED` | Last song of the named set: `SET2 CLOSED "..."` |
| `OPENER` | First song of the show overall (shorthand for `SET1 OPENED`). Accepts a segue chain: `OPENER "A" > "B"` |
| `CLOSER` | Last song of the show overall. Accepts a segue chain: `CLOSER ("A" > "B")` |
| `=` | Equality form for `ENCORE`: `ENCORE = "..."` |

---

## Dates and date ranges

| Form | Example | Notes |
|------|---------|-------|
| Four-digit year | `1977` | Exact year |
| Two-digit year | `77` | Always 19xx — the Dead were active 1965–1995 |
| Year range | `1977-1980` | Inclusive |
| Two-digit range | `77-80` | Same as above |
| Specific date | `5/8/77` | M/D/YY |
| Specific date (full) | `5/8/1977` | Same |
| `BEFORE 1976` | — | Strictly before that year |
| `AFTER 1985` | — | Strictly after |

---

## Era aliases

Named eras the Dead community uses. Spelled exactly as shown (case-insensitive).

| Era | Years | What it covers |
|-----|-------|----------------|
| `PRIMAL` | 1965–1969 | Pigpen-era, Dark Star, Saint Stephen, the Eleven |
| `EUROPE72` | 1972 | The legendary spring '72 Europe tour |
| `WALLOFSOUND` | 1973–1974 | The Wall of Sound PA era |
| `HIATUS` | 1975 | The year off (very few shows) |
| `BRENT_ERA` | 1979–1990 | Brent Mydland on keys |
| `VINCE_ERA` | 1990–1995 | Vince Welnick on keys, ending with Jerry's death |

---

## Output formats

After `AS` in `SHOWS`, `SETLIST`, and `PERFORMANCES`:

| Format | Output |
|--------|--------|
| `TABLE` | Aligned text table (default) |
| `JSON` | One JSON object per row, suitable for piping into `jq` |
| `CSV` | Comma-separated values |
| `SETLIST` | (SHOWS only) Each row expanded with its full setlist inline |
| `COUNT` | (SONGS only) Collapse to a single count |

---

## Examples in context

### Segue tokens in WHERE

{{< gdql >}}
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain";  -- segue (>)
SHOWS WHERE "Scarlet Begonias" >> "Fire on the Mountain";  -- with break (>>)
{{< /gdql >}}

### Logical in WHERE

{{< gdql >}}
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";  -- AND
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";  -- OR
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen";  -- NOT
{{< /gdql >}}

### Dates and eras

{{< gdql >}}
SHOWS FROM 1977;  -- single year
SHOWS FROM 77-80;  -- year range
SETLIST FOR 5/8/77;  -- specific date
SHOWS FROM PRIMAL;  -- named era
SHOWS BEFORE 1976;
SHOWS AFTER 1985;
{{< /gdql >}}

### Output formats

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
SONGS WITH LYRICS("rose") AS COUNT;  -- COUNT format
{{< /gdql >}}

**{{< sandbox "shows-77-json" "Try in Sandbox" >}}**
