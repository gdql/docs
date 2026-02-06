---
title: SHOWS
description: "GDQL SHOWS: list shows with FROM, WHERE, ORDER BY, LIMIT, and AS format."
weight: 1
---

# SHOWS

List shows, optionally filtered by date range and conditions.

---

## Synopsis

```gdql
SHOWS [ FROM date_or_era ] [ WHERE condition [ AND | OR condition ... ] ]
  [ ORDER BY sort_spec ] [ LIMIT n ] [ AS format ];
```

---

## Description

`SHOWS` returns one row per show (date, venue, and related info). Use `FROM` to restrict by year or era, and `WHERE` for segues, set position, played/guest/length, and combinations with `AND`/`OR`/`NOT`. Control order and size with `ORDER BY` and `LIMIT`, and output shape with `AS`.

---

## Clauses

| Clause | Description |
|--------|-------------|
| `FROM` | Date range (e.g. `1977`, `77-80`) or era alias (`PRIMAL`, `EUROPE72`, `BRENT_ERA`, etc.) |
| `WHERE` | Conditions: segue, set position, played, guest, length (see [WHERE]({{< relref "where" >}})) |
| `ORDER BY` | `DATE` or other field, `ASC` or `DESC` |
| `LIMIT` | Maximum number of results |
| `AS` | Output format: `JSON`, `CSV`, `SETLIST`, `TABLE` (default) |

---

## Examples

**All shows (no filter):**

```gdql
SHOWS;
SHOWS LIMIT 20;
```

**By year or range:**

```gdql
SHOWS FROM 1977;
SHOWS FROM 77;
SHOWS FROM 1977-1980;
SHOWS FROM 77-80 LIMIT 10;
```

**By era:**

```gdql
SHOWS FROM PRIMAL;
SHOWS FROM EUROPE72;
SHOWS FROM BRENT_ERA;
```

**With WHERE (segue, set position, played, guest):**

```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS FROM 1990 WHERE PLAYED "Eyes of the World";
SHOWS WHERE GUEST "Branford Marsalis";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
```

**Order and limit:**

```gdql
SHOWS FROM 1977 ORDER BY DATE;
SHOWS FROM 1977 ORDER BY DATE DESC;
SHOWS FROM 77-80 LIMIT 10;
```

**Output format:**

```gdql
SHOWS FROM 1977 LIMIT 3;
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
```

**{{< sandbox "shows-77" "Try in Sandbox" >}}** · **{{< sandbox "scarlet-fire" "Scarlet→Fire" >}}** · **{{< sandbox "shows-77-json" "AS JSON" >}}**
