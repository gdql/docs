---
title: SONGS
description: "GDQL SONGS: list songs with WITH LYRICS, WRITTEN, ORDER BY, LIMIT."
weight: 2
---

# SONGS

List songs in the catalog, optionally filtered by lyrics and written date.

---

## Synopsis

```gdql
SONGS [ WITH LYRICS("word1", "word2", ...) ] [ WRITTEN date_range ]
  [ ORDER BY sort_spec ] [ LIMIT n ];
```

---

## Description

`SONGS` returns one row per song. Use `WITH LYRICS(...)` to require that lyrics contain all listed words, and `WRITTEN` to restrict by when the song was written. Use `ORDER BY` and `LIMIT` to sort and cap results.

---

## Clauses

| Clause | Description |
|--------|-------------|
| `WITH LYRICS("word1", "word2", ...)` | Song lyrics must contain all listed words |
| `WRITTEN` | Date range when the song was written |
| `ORDER BY` | Sort field and direction |
| `LIMIT` | Maximum number of results |

---

## Examples

**List songs (no filter):**

```gdql
SONGS;
SONGS LIMIT 50;
SONGS ORDER BY TITLE LIMIT 30;
```

**Lyrics contain words (all must match):**

```gdql
SONGS WITH LYRICS("train");
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("rose") LIMIT 20;
SONGS WITH LYRICS("sun", "shine");
```

**Written in a date range:**

```gdql
SONGS WRITTEN 1968;
SONGS WRITTEN 1968-1970;
SONGS WRITTEN 1970;
```

**Combine lyrics + written + limit:**

```gdql
SONGS WITH LYRICS("rose") WRITTEN 1970 LIMIT 20;
SONGS WITH LYRICS("highway") WRITTEN 1969-1971 ORDER BY TITLE LIMIT 10;
```

**Single word, no date filter:**

```gdql
SONGS WITH LYRICS("water");
SONGS WITH LYRICS("wheel");
```
