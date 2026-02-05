---
title: WHERE conditions
description: "GDQL WHERE: segues, set position, PLAYED, GUEST, LENGTH, and AND/OR/NOT."
weight: 10
---

# WHERE conditions

Used in `SHOWS ... WHERE ...` to filter shows by segues, set position, who played, guests, and song length.

---

## Synopsis

```gdql
WHERE condition [ AND | OR condition ] ...
```

Conditions can be combined with `AND`, `OR`, and `NOT`.

---

## Segue

| Form | Meaning |
|------|--------|
| `"Song A" > "Song B"` or `"A" INTO "B"` | Direct segue (no break) |
| `"A" >> "B"` or `"A" THEN "B"` | Followed by (with break) |
| `"A" ~> "B"` or `"A" TEASE "B"` | Tease |
| Chain | e.g. `"Help on the Way" > "Slipknot!" > "Franklin's Tower"` |

---

## Set position

Shows can have **more than two sets**: Set 1, Set 2, and often an **encore** (stored as set 3). GDQL supports `SET1`, `SET2`, `SET3`, and `ENCORE`; `SET3` and `ENCORE` both refer to the third set (the encore).

| Form | Meaning |
|------|--------|
| `SET1 OPENED "Jack Straw"` | First set opened with this song |
| `SET2 CLOSED "Sugar Magnolia"` | Second set closed with this song |
| `SET3 OPENED "U.S. Blues"` | Third set (encore) opened with this song |
| `SET3 CLOSED "Brokedown Palace"` | Third set closed with this song |
| `ENCORE = "U.S. Blues"` | Encore was this song (same as third set) |

---

## Other conditions

| Form | Meaning |
|------|--------|
| `PLAYED "Scarlet Begonias"` | Show included this song |
| `GUEST "Branford Marsalis"` | Guest appeared |
| `LENGTH("Dark Star") > 20min` | Song length condition (when supported in WHERE) |

---

## Combining

- `condition1 AND condition2`
- `condition1 OR condition2`
- `NOT "Song"` to negate

---

## Examples

**Segue (direct, no break):**

```gdql
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
```

**Followed by (with break):**

```gdql
SHOWS WHERE "Scarlet Begonias" >> "Fire on the Mountain";
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";
```

**Tease:**

```gdql
SHOWS WHERE "Dark Star" ~> "Saint Stephen";
SHOWS WHERE "Uncle John's Band" TEASE "St. Stephen";
```

**Set position (shows can have 3+ sets: Set 1, Set 2, encore):**

```gdql
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE SET1 OPENED "Bertha";
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
SHOWS WHERE SET3 OPENED "U.S. Blues";
SHOWS WHERE SET3 CLOSED "Brokedown Palace";
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE ENCORE = "Brokedown Palace";
```

**Played and guest:**

```gdql
SHOWS WHERE PLAYED "Dark Star";
SHOWS WHERE PLAYED "Scarlet Begonias" AND PLAYED "Fire on the Mountain";
SHOWS WHERE GUEST "Branford Marsalis";
SHOWS WHERE GUEST "Clarence Clemons";
```

**Length (when supported):**

```gdql
SHOWS WHERE LENGTH("Dark Star") > 20min;
SHOWS WHERE LENGTH("Eyes of the World") > 15min;
```

**Combining with AND / OR / NOT:**

```gdql
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet";
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen";
```

See [Operators]({{< relref "operators" >}}) for tokens and comparisons.
