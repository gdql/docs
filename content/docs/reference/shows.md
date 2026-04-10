---
title: SHOWS
description: "GDQL SHOWS: list shows by venue, era, segue, and condition with ORDER BY, LIMIT, and AS format."
weight: 1
---


`SHOWS` is the workhorse of GDQL. It returns one row per concert and lets you filter by venue, year, era, segues, set positions, played songs, guests, and more — then shape the output with `ORDER BY`, `LIMIT`, and `AS`.

---

## Synopsis

```gdql
SHOWS [ AT "venue_or_city" ]
      [ FROM date_or_era ]
      [ WHERE condition [ AND | OR condition ... ] ]
      [ ORDER BY sort_spec ]
      [ LIMIT n ]
      [ AS format ];
```

Every clause is optional — `SHOWS;` on its own returns every show in the database.

---

## How it works

`SHOWS` queries the show table and returns date, venue, city, state, and tour for each match. Combine clauses freely: `AT` narrows by location, `FROM` by date, `WHERE` by anything that happened during the show. The clauses don't have a strict order — `SHOWS FROM 1977 AT "Winterland"` and `SHOWS AT "Winterland" FROM 1977` mean the same thing.

---

## Clauses

| Clause | What it does |
|--------|--------------|
| `AT "venue"` | Match a venue or city by partial string. `AT "Fillmore"` matches Fillmore West and Fillmore East; `AT "New York"` matches every NYC venue. |
| `FROM 1977` | Single year. Two-digit shorthand works: `FROM 77`. |
| `FROM 1977-1980` | Inclusive year range. |
| `FROM PRIMAL` | Named era. See [Operators → Eras]({{< relref "operators#dates-and-eras" >}}) for the full list. |
| `WHERE ...` | Any condition: segue, set position, played. See [WHERE conditions]({{< relref "where" >}}). |
| `ORDER BY DATE` | Sort by date. Add `DESC` for newest first. |
| `LIMIT 10` | Cap the number of rows returned. |
| `AS json` | Output format: `TABLE` (default), `JSON`, `CSV`, or `SETLIST`. |

---

## Examples

### Everything

```gdql
SHOWS;
SHOWS LIMIT 20;
```

### By year, range, or era

```gdql
SHOWS FROM 1977;
SHOWS FROM 77;
SHOWS FROM 1977-1980;
SHOWS FROM 77-80 LIMIT 10;
SHOWS FROM PRIMAL;
SHOWS FROM EUROPE72;
SHOWS FROM BRENT_ERA;
```

### By venue or city

```gdql
SHOWS AT "Fillmore West";
SHOWS AT "Winterland" FROM 1977;
SHOWS AT "New York" LIMIT 10;
SHOWS AT "Madison Square Garden";
```

### With WHERE conditions

Filter by segue, set position, played songs, or guests. See [WHERE]({{< relref "where" >}}) for the full vocabulary.

```gdql
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS FROM 1990 WHERE PLAYED "Eyes of the World";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
```

### Order and limit

```gdql
SHOWS FROM 1977 ORDER BY DATE;
SHOWS FROM 1977 ORDER BY DATE DESC;
SHOWS FROM 77-80 LIMIT 10;
```

### Output formats

```gdql
SHOWS FROM 1977 LIMIT 3;
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
```

`AS SETLIST` expands each show inline with its full setlist — handy for quick browsing without a follow-up `SETLIST FOR` call.

---

## Tips

- **Combine `AT` and `FROM` to narrow fast.** A city + a year is usually a few dozen shows at most.
- **`LIMIT` is your friend.** Without it, queries against the full archive can return thousands of rows.
- **The order of `AT`, `FROM`, and `WHERE` doesn't matter** — pick whatever reads best.
- **Use `AS JSON` or `AS CSV` to pipe results into other tools.**

**{{< sandbox "shows-77" "Try in Sandbox" >}}** · **{{< sandbox "scarlet-fire" "Scarlet→Fire" >}}** · **{{< sandbox "shows-77-json" "AS JSON" >}}**
