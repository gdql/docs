---
title: Operators
description: "GDQL operators: segues, logical (AND/OR/NOT), comparisons, dates/eras, output formats."
weight: 11
---

# Operators

Reference for segue tokens, logical operators, comparisons, dates/eras, and output formats.

---

## Segue / sequence

| Token | Meaning |
|-------|--------|
| `>` / `INTO` | Segued into (no break) |
| `>>` / `THEN` | Followed by (with break) |
| `~>` / `TEASE` | Teased into |

---

## Logical

| Token | Meaning |
|-------|--------|
| `AND` | Both conditions |
| `OR` | Either condition |
| `NOT` | Negate (e.g. `NOT "Song"`) |

---

## Comparisons

`>`, `<`, `=`, `>=`, `<=`, `!=` — e.g. for `LENGTH > 20min`.

---

## Set position tokens

In WHERE: `SET1`, `SET2`, `SET3`, `ENCORE` (with `OPENED`, `CLOSED`, or `=`). Many shows have **more than two sets** (Set 1, Set 2, encore); `SET3` and `ENCORE` both refer to the third set.

---

## Dates and eras

| Form | Example | Notes |
|------|---------|--------|
| Year | `1977`, `77` | Two-digit → 19xx |
| Range | `1977-1980` | Inclusive |
| Specific date | `5/8/77` | M/D/YY |
| Era aliases | `PRIMAL`, `EUROPE72`, `WALLOFOUND`, `HIATUS`, `BRENT_ERA`, `VINCE_ERA`, etc. | See data for definitions |

---

## Output formats

After `AS` in `SHOWS`: `JSON`, `CSV`, `SETLIST`, `TABLE`, `CALENDAR`. Default is table-like.

---

## Examples (in context)

**Segue tokens in WHERE:**

```gdql
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE "Scarlet Begonias" >> "Fire on the Mountain";
SHOWS WHERE "Dark Star" ~> "Saint Stephen";
```

**Logical in WHERE:**

```gdql
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
SHOWS WHERE PLAYED "Eyes" AND NOT PLAYED "Drums";
```

**Comparisons (e.g. in WITH LENGTH):**

```gdql
PERFORMANCES OF "Dark Star" WITH LENGTH > 20min;
PERFORMANCES OF "Playing in the Band" WITH LENGTH >= 15min;
PERFORMANCES OF "Eyes of the World" WITH LENGTH < 12min;
```

**Dates in FROM / WRITTEN:**

```gdql
SHOWS FROM 1977;
SHOWS FROM 77-80;
SHOWS FROM 5/8/77;
SHOWS FROM PRIMAL;
SONGS WRITTEN 1968-1970;
```

**Output format in SHOWS:**

```gdql
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;
```
