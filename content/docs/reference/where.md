---
title: WHERE conditions
description: "GDQL WHERE: build filters from segues, set positions, played, guests, length, and AND/OR/NOT."
weight: 10
---


`WHERE` is where the language stops being a list operation and starts being a question. Use it inside `SHOWS ... WHERE ...` to filter shows by what happened during them: which songs were played, in what order, in which set, with which guests, for how long.

---

## Synopsis

```gdql
WHERE condition [ AND | OR condition ] ...
```

Combine any number of conditions with `AND`, `OR`, and `NOT`. Parentheses are not yet supported — `AND` binds tighter than `OR`, so write the simpler form when in doubt.

---

## Segues

Segues are the heart of what makes a Grateful Dead show *that show*. GDQL matches segue chains by position adjacency in the setlist.

| Form | Alt syntax | Meaning |
|------|------------|--------|
| `"A" > "B"` | `"A" INTO "B"` | A is followed by B (adjacent in setlist) |
| `"A" >> "B"` | `"A" THEN "B"` | A is followed by B, with a pause or applause break between |
| Chains | — | Any number: `"Help on the Way" > "Slipknot!" > "Franklin's Tower"` |

The chain form is exact: it requires every transition in order. `Help > Slip > Franklin's` will only match shows where all three appear in that sequence.

> **Note:** The `~>` (tease) operator is part of the GDQL syntax but requires tease data to be imported before it will return results.


### Arrow alias

`->` is treated as `>` (segue), so `"Dark Star" -> "St. Stephen"` is the same as `"Dark Star" > "St. Stephen"`.

---

## Set position

Most Dead shows have **two sets and an encore**, but some have three sets, and the encore is stored as set 3 in the database. GDQL gives you `SET1`, `SET2`, `SET3`, and `ENCORE` as first-class concepts. `SET3` and `ENCORE` are aliases — both refer to the third set.

| Form | Meaning |
|------|--------|
| `SET1 OPENED "Jack Straw"` | First set opened with this song |
| `SET2 CLOSED "Sugar Magnolia"` | Second set closed with this song |
| `SET3 OPENED "U.S. Blues"` | Third set (the encore) opened with this song |
| `SET3 CLOSED "Brokedown Palace"` | Third set closed with this song |
| `ENCORE = "U.S. Blues"` | Encore was this song (alias for `SET3`) |
| `OPENER "Bertha"` | Opened the entire show — short for `SET1 OPENED`. `OPENED` also works. |
| `CLOSER "Morning Dew"` | Closed the entire show — last song of the last set. `CLOSED` also works. |
| `OPENER ("A" > "B")` | Show opened with a segue chain (e.g., Help > Slip) |
| `CLOSER ("A" > "B")` | Show closed with a segue chain |

---

## Other conditions

| Form | Meaning |
|------|--------|
| `PLAYED "Scarlet Begonias"` | The show included this song, anywhere in any set |
| `NOT PLAYED "Fire on the Mountain"` | The show did **not** include this song |
| `NOT "Drums"` | Short form of `NOT PLAYED` |
| `GUEST "name"` | A guest musician sat in (requires guest data import) |
| `LENGTH("Song") > 20min` | Song length condition (requires length data import) |

---

## Combining

```gdql
condition1 AND condition2
condition1 OR  condition2
NOT "Song"
```

`AND` binds tighter than `OR` — `A AND B OR C` is `(A AND B) OR C`.

---

## Examples

### Segue chains (position adjacency)

```gdql
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
```

### Followed by (with break)

```gdql
SHOWS WHERE "Scarlet Begonias" >> "Fire on the Mountain";
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";
```

### Set position

```gdql
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE SET1 OPENED "Bertha";
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
SHOWS WHERE SET3 OPENED "U.S. Blues";
SHOWS WHERE SET3 CLOSED "Brokedown Palace";
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE OPENER "Bertha";
SHOWS WHERE CLOSER "Morning Dew";
```

### OPENER / CLOSER with segue chains

```gdql
SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!");
SHOWS WHERE CLOSER ("Throwin' Stones" > "Not Fade Away");
SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!") AND CLOSER "Brokedown Palace";
```

### Played and not played

```gdql
SHOWS WHERE PLAYED "Dark Star";
SHOWS WHERE PLAYED "Scarlet Begonias" AND PLAYED "Fire on the Mountain";
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen";
```

### Combining with AND, OR, NOT

```gdql
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"
  AND PLAYED "Estimated Prophet";

SHOWS WHERE SET1 OPENED "Jack Straw"
  AND PLAYED "Deal";

SHOWS WHERE PLAYED "Dark Star"
  AND NOT PLAYED "Saint Stephen";
```

---

## Tips

- **Start broad, then narrow.** A bare `SHOWS WHERE PLAYED "X"` tells you the universe of shows; add `FROM`, `AT`, or another condition to zoom in.
- **Use `NOT PLAYED` for negative space questions** — "Scarlet without Fire", "Dark Star without Saint Stephen", "Help/Slip/Frank without the encore segue".
- **Set position queries are exact.** `SET1 OPENED "Jack Straw"` only matches shows where Jack Straw was the literal first song of set 1, not just an early one.

**{{< sandbox "scarlet-fire" "Scarlet→Fire" >}}** · **{{< sandbox "help-slip-frank" "Help→Slip→Franklin's" >}}** · **{{< sandbox "played-st-stephen" "PLAYED St. Stephen" >}}** · **{{< sandbox "st-stephen-eleven" "St. Stephen > The Eleven" >}}**

For the underlying tokens and comparisons, see [Operators]({{< relref "operators" >}}).
