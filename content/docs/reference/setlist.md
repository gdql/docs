---
title: SETLIST
description: "GDQL SETLIST: get the setlist for a single date (e.g. SETLIST FOR 5/8/77)."
weight: 4
---

# SETLIST

Get the setlist for a single date.

---

## Synopsis

```gdql
SETLIST FOR date_spec ;
```

`date_spec` can be a specific date, a named show, or a year (interpretation may vary).

---

## Description

`SETLIST FOR` returns the setlist (songs and set structure) for one show. Use a specific date like `5/8/77` for a single show, or a named show like `"Cornell 1977"` when supported.

---

## Date format

| Form | Example | Meaning |
|------|---------|---------|
| Specific date | `5/8/77` | M/D/YY |
| Named show | `"Cornell 1977"` | When supported by data |
| Year | `1977` | One show or default for that year (TBD) |

---

## Examples

**Specific date (M/D/YY):**

```gdql
SETLIST FOR 5/8/77;
SETLIST FOR 8/27/72;
SETLIST FOR 3/29/90;
SETLIST FOR 12/31/78;
```

**Named show (when supported):**

```gdql
SETLIST FOR "Cornell 1977";
SETLIST FOR "Winterland 1978";
```

**By year (interpretation may vary):**

```gdql
SETLIST FOR 1977;
SETLIST FOR 72;
```

**Multiple in one run (separate statements):**

```gdql
SETLIST FOR 5/8/77;
SETLIST FOR 5/9/77;
```

**{{< sandbox "setlist-cornell" "5/8/77" >}}** · **{{< sandbox "setlist-cornell-name" "Cornell 1977" >}}**
