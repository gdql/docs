---
title: SONGS
description: "GDQL SONGS: list songs in the catalog and filter by lyrics, written date, ORDER BY, and LIMIT."
weight: 2
---


`SONGS` queries the song catalog. Use it to browse, search lyrics, find songs from a particular era of writing, or count matches.

---

## Synopsis

```gdql
SONGS [ WITH condition [AND | OR | , condition ...] ] [ WRITTEN date_or_range ] [ ORDER BY sort_spec ] [ LIMIT n ] [ AS COUNT ];
```

Every clause is optional — `SONGS;` lists every song the database knows about.

---

## How it works

`SONGS` returns one row per song with name and play counts. `WITH LYRICS(...)` requires that **every** word listed appears somewhere in the lyrics (it's an AND, not an OR). You can also combine multiple `WITH` conditions using `AND` or commas: `SONGS WITH LYRICS("sun") AND LYRICS("shine")`. `AS COUNT` collapses the result to a single number.

> **Note:** `WRITTEN` filters by the year the song was written, but requires songwriting date data to be imported before it will return results.


---

## Clauses

| Clause | What it does |
|--------|--------------|
| `WITH LYRICS("word", ...)` | Lyrics must contain **all** listed words. Single word? `WITH LYRICS("rose")`. |
| `WRITTEN 1968` | Written in that year (requires songwriting date data). |
| `WRITTEN 1968-1970` | Written in that range (requires songwriting date data). |
| `ORDER BY NAME` | Sort by song name. Add `DESC` to reverse. |
| `ORDER BY TIMES_PLAYED` | Sort by number of performances. Add `DESC` for most-played first. |
| `LIMIT 20` | Cap the number of results. |
| `AS COUNT` | Return just a count, not the rows. |

---

## Examples

### Browse the catalog

{{< gdql >}}
SONGS;
SONGS LIMIT 50;
SONGS ORDER BY NAME LIMIT 30;
SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20;  -- most-played songs
{{< /gdql >}}

### Lyric search (single word)

{{< gdql >}}
SONGS WITH LYRICS("train");
SONGS WITH LYRICS("rose") LIMIT 20;
SONGS WITH LYRICS("water");
SONGS WITH LYRICS("wheel");
{{< /gdql >}}

### Lyric search (multiple words — all must match)

{{< gdql >}}
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("sun", "shine");
SONGS WITH LYRICS("river", "deep");
{{< /gdql >}}

### Separate LYRICS conditions with AND

{{< gdql >}}
SONGS WITH LYRICS("sun") AND LYRICS("shine");
SONGS WITH LYRICS("train") AND LYRICS("road");
{{< /gdql >}}

### Just give me the count

{{< gdql >}}
SONGS WITH LYRICS("sun") AS COUNT;
SONGS WITH LYRICS("sun", "shine") AS COUNT;  -- multiple words
{{< /gdql >}}

---

## Tips

- **Lyric search is whole-word**, so `"sun"` matches the word "sun" but not "sunshine" or "Sunday". Use shorter root words if you want broader matches.
- **Not every song has lyrics in the database.** Instrumentals (Drums, Space) and rare songs may return zero matches even when you expect them.
- **`AS COUNT` is great for quick "how many?" questions** — pair it with `WITH LYRICS` for instant lyric trivia.

**{{< sandbox "songs" "Try in Sandbox" >}}** · **{{< sandbox "songs-lyrics" "LYRICS" >}}**
