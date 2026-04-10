---
title: PERFORMANCES
description: "GDQL PERFORMANCES: list every time a song was played, with date, length, and order filters."
weight: 3
---


`PERFORMANCES` returns the per-show history of a single song. Use it to find every time a song was played, filter by date or length, or sort to find the longest, oldest, or most recent performances.

---

## Synopsis

```gdql
PERFORMANCES OF "Song Name"
  [ FROM date_or_range ]
  [ WITH LENGTH length_condition ]
  [ ORDER BY sort_spec ]
  [ LIMIT n ];
```

`OF "Song Name"` is required. Everything else is optional.

---

## How it works

`PERFORMANCES` joins the song catalog with the performance log to return one row per time the song was played. Each row carries the date, venue, set number, position, length (when known), and any segue context. `WITH LENGTH > 20min` is the right tool for hunting down the legendary jams.

---

## Clauses

| Clause | What it does |
|--------|--------------|
| `OF "Song Name"` | Required. The song to look up. Lookup is case-insensitive and tolerant of punctuation. |
| `FROM 1972` | Single year. |
| `FROM 1972-1974` | Inclusive year range. |
| `WITH LENGTH > 20min` | Filter by duration. Supports `>`, `<`, `>=`, `<=`, `=`. |
| `ORDER BY LENGTH DESC` | Sort by `LENGTH` or `DATE`, ascending or descending. |
| `LIMIT 5` | Cap results — handy when sorting by length. |

---

## Examples

### Every performance of a song

```gdql
PERFORMANCES OF "Dark Star";
PERFORMANCES OF "Scarlet Begonias";
PERFORMANCES OF "Eyes of the World";
```

### Constrain to a date range

```gdql
PERFORMANCES OF "Dark Star" FROM 1972;
PERFORMANCES OF "Dark Star" FROM 1972-1974;
PERFORMANCES OF "Eyes of the World" FROM 1974-1977;
```

### Filter by length

```gdql
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min;
PERFORMANCES OF "Dark Star" WITH LENGTH > 30min;
PERFORMANCES OF "Playing in the Band" WITH LENGTH < 10min;
```

### Sort and limit

```gdql
PERFORMANCES OF "Eyes of the World" ORDER BY LENGTH DESC LIMIT 5;
PERFORMANCES OF "Dark Star" ORDER BY DATE LIMIT 10;
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

### Find the longest jams in a window

```gdql
PERFORMANCES OF "Dark Star"
  FROM 1973-1974
  WITH LENGTH > 20min
  ORDER BY LENGTH DESC
  LIMIT 5;
```

### Find the oldest

```gdql
PERFORMANCES OF "Help on the Way" ORDER BY DATE LIMIT 1;
```

(For oldest/newest there's also the simpler [`FIRST` and `LAST`]({{< relref "../advanced#first-and-last" >}}) shortcuts.)

---

## Tips

- **Length data isn't perfect.** Some performances are missing durations entirely; those rows are skipped by `WITH LENGTH` filters.
- **Use `LIMIT` aggressively** when ordering by length — the top 5 or top 10 is almost always what you want.
- **Looking for shows that played a song, not the performances themselves?** Use `SHOWS WHERE PLAYED "Song"` instead.

**{{< sandbox "dark-star" "Try in Sandbox" >}}**
