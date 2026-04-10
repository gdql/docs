---
title: SONGS
description: "GDQL SONGS: list songs in the catalog and filter by lyrics, written date, ORDER BY, and LIMIT."
weight: 2
---


`SONGS` queries the song catalog. Use it to browse, search lyrics, find songs from a particular era of writing, or count matches.

---

## Synopsis

```gdql
SONGS [ WITH LYRICS("word1", "word2", ...) ]
      [ WRITTEN date_or_range ]
      [ ORDER BY sort_spec ]
      [ LIMIT n ]
      [ AS COUNT ];
```

Every clause is optional — `SONGS;` lists every song the database knows about.

---

## How it works

`SONGS` returns one row per song with name, writers, and play counts. `WITH LYRICS(...)` requires that **every** word listed appears somewhere in the lyrics (it's an AND, not an OR). `WRITTEN` filters by the year the song was written, not the year it was first performed. `AS COUNT` collapses the result to a single number.

---

## Clauses

| Clause | What it does |
|--------|--------------|
| `WITH LYRICS("word", ...)` | Lyrics must contain **all** listed words. Single word? `WITH LYRICS("rose")`. |
| `WRITTEN 1968` | Written in that year. |
| `WRITTEN 1968-1970` | Written in that range. |
| `ORDER BY NAME` | Sort by song name. Add `DESC` to reverse. |
| `LIMIT 20` | Cap the number of results. |
| `AS COUNT` | Return just a count, not the rows. |

---

## Examples

### Browse the catalog

```gdql
SONGS;
SONGS LIMIT 50;
SONGS ORDER BY NAME LIMIT 30;
```

### Lyric search (single word)

```gdql
SONGS WITH LYRICS("train");
SONGS WITH LYRICS("rose") LIMIT 20;
SONGS WITH LYRICS("water");
SONGS WITH LYRICS("wheel");
```

### Lyric search (multiple words — all must match)

```gdql
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("sun", "shine");
SONGS WITH LYRICS("river", "deep");
```

### Filter by when the song was written

```gdql
SONGS WRITTEN 1968;
SONGS WRITTEN 1968-1970;
SONGS WRITTEN 1970;
```

### Combine lyrics, date, and limit

```gdql
SONGS WITH LYRICS("rose") WRITTEN 1970 LIMIT 20;
SONGS WITH LYRICS("highway") WRITTEN 1969-1971 ORDER BY NAME LIMIT 10;
```

### Just give me the count

```gdql
SONGS WITH LYRICS("sun") AS COUNT;
SONGS WITH LYRICS("sun", "shine") AS COUNT;
```

---

## Tips

- **Lyric search is substring-based**, so `"sun"` matches "sunshine", "sunlit", and "sunday". Use multiple words to narrow.
- **Not every song has lyrics in the database.** Instrumentals (Drums, Space) and rare songs may return zero matches even when you expect them.
- **`AS COUNT` is great for quick "how many?" questions** — pair it with `WITH LYRICS` for instant lyric trivia.

**{{< sandbox "songs" "Try in Sandbox" >}}** · **{{< sandbox "songs-lyrics" "LYRICS" >}}** · **{{< sandbox "songs-written" "WRITTEN" >}}** · **{{< sandbox "songs-lyrics-rose" "LYRICS+WRITTEN" >}}**
