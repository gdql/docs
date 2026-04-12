---
title: PERFORMANCES
description: "Use GDQL PERFORMANCES to list every time the Grateful Dead played a song — filter by date range, sort by date, and find first or last appearances."
weight: 3
---


`PERFORMANCES` returns the per-show history of a single song. Use it to find every time a song was played, filter by date, or sort to find the oldest or most recent performances.

---

## Synopsis

```gdql
PERFORMANCES OF "Song Name" [ FROM date_or_range ] [ WITH LENGTH length_condition ] [ ORDER BY sort_spec ] [ LIMIT n ];
```

`OF "Song Name"` is required. Everything else is optional.

---

## How it works

`PERFORMANCES` joins the song catalog with the performance log to return one row per time the song was played. Each row carries the date, venue, set number, and position.

> **Duration data** is sourced from archive.org recordings via Relisten. About 48% of performances have duration — coverage is best for 1970s shows.


---

## Clauses

| Clause | What it does |
|--------|--------------|
| `OF "Song Name"` | Required. The song to look up. Lookup is case-insensitive and tolerant of punctuation. |
| `FROM 1972` | Single year. |
| `FROM 1972-1974` | Inclusive year range. |
| `WITH LENGTH > 20min` | Filter by duration. Supports `>`, `<`, `>=`, `<=`, `=`. |
| `ORDER BY DATE DESC` | Sort by `DATE`, ascending or descending. |
| `ORDER BY POSITION` | Sort by position within the setlist. |
| `ORDER BY LENGTH` | Sort by performance duration. |
| `LIMIT 5` | Cap results — handy when sorting by length. |

---

## Examples

### Every performance of a song

{{< gdql >}}
PERFORMANCES OF "Dark Star";
PERFORMANCES OF "Scarlet Begonias";
PERFORMANCES OF "Eyes of the World";
{{< /gdql >}}

### Constrain to a date range

{{< gdql >}}
PERFORMANCES OF "Dark Star" FROM 1972;  -- single year
PERFORMANCES OF "Dark Star" FROM 1972-1974;  -- year range
PERFORMANCES OF "Eyes of the World" FROM 1974-1977;
{{< /gdql >}}

### Sort and limit

{{< gdql >}}
PERFORMANCES OF "Dark Star" ORDER BY DATE LIMIT 10;
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
{{< /gdql >}}

### Longest performances

{{< gdql >}}
-- The longest Dark Stars
PERFORMANCES OF "Dark Star" ORDER BY LENGTH DESC LIMIT 10;

-- Playing in the Band jams over 15 minutes
PERFORMANCES OF "Playing in the Band" WITH LENGTH > 15min;

-- Short Morning Dews (under 8 minutes)
PERFORMANCES OF "Morning Dew" WITH LENGTH < 8min ORDER BY LENGTH LIMIT 10;
{{< /gdql >}}

### Find the oldest

{{< gdql >}}
PERFORMANCES OF "Help on the Way" ORDER BY DATE LIMIT 1;
{{< /gdql >}}

(For oldest/newest there's also the simpler [`FIRST` and `LAST`]({{< relref "../cookbook#first-and-last" >}}) shortcuts.)

---

## Tips

- **Duration coverage is ~48%.** Not every performance has length data — it depends on what's available on archive.org. Results with `ORDER BY LENGTH` will only include performances that have durations.
- **Use `LIMIT` aggressively** when browsing — the top 10 or 20 is almost always what you want.
- **Looking for shows that played a song, not the performances themselves?** Use `SHOWS WHERE PLAYED "Song"` instead.

**{{< sandbox "dark-star" "Try in Sandbox" >}}**
