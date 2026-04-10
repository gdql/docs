---
title: Advanced queries
description: "Complex multi-clause GDQL queries showing what the language can do."
weight: 14
---

# Advanced queries

These queries chain together multiple clauses, conditions, and operators. Each shows what GDQL can do when you combine its features. Click **▶ Try it** on any block to run it in the [sandbox](https://sandbox.gdql.dev).

---

## Multi-clause filtering

Combine venue, era, segue, and additional conditions in one query.

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977-1978 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet" ORDER BY DATE LIMIT 10;
{{< /gdql >}}

Find shows at the Fillmore in '69 that opened with Dark Star and also played St. Stephen:

{{< gdql >}}
SHOWS AT "Fillmore" FROM 1969 WHERE OPENER "Dark Star" AND PLAYED "Saint Stephen";
{{< /gdql >}}

European tour shows that featured Eyes of the World, ordered by date:

{{< gdql >}}
SHOWS FROM EUROPE72 WHERE PLAYED "Eyes of the World" ORDER BY DATE;
{{< /gdql >}}

---

## Three-song segues with extra conditions

Find the legendary Help > Slip > Frank, but only at shows that also featured Dark Star, in the 1976 tour, ordered by date:

{{< gdql >}}
SHOWS FROM 1976 WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower" AND PLAYED "Dark Star" ORDER BY DATE;
{{< /gdql >}}

The classic primal trio at the Fillmore West:

{{< gdql >}}
SHOWS AT "Fillmore West" WHERE "Dark Star" > "Saint Stephen" > "The Eleven" ORDER BY DATE;
{{< /gdql >}}

China > Rider in Brent's first year, that also closed with US Blues:

{{< gdql >}}
SHOWS FROM 1979 WHERE "China Cat Sunflower" > "I Know You Rider" AND CLOSER "U.S. Blues";
{{< /gdql >}}

---

## Set position with date filters

Shows opened with Bertha during the early Brent era, in chronological order:

{{< gdql >}}
SHOWS FROM 1979-1981 WHERE OPENER "Bertha" ORDER BY DATE;
{{< /gdql >}}

Late-era Morning Dew closers (a rare and meaningful combo):

{{< gdql >}}
SHOWS AFTER 1985 WHERE CLOSER "Morning Dew" ORDER BY DATE;
{{< /gdql >}}

---

## COUNT with all the trimmings

How many times did they play Dark Star during the Brent era?

{{< gdql >}}
COUNT "Dark Star" FROM BRENT_ERA;
{{< /gdql >}}

How many shows in the band's first decade?

{{< gdql >}}
COUNT SHOWS BEFORE 1976;
{{< /gdql >}}

How many Scarlet Begonias performances after Fire on the Mountain debuted (March 1977)?

{{< gdql >}}
COUNT "Scarlet Begonias" AFTER 1977;
{{< /gdql >}}

How many songs in the catalog mention both "rose" and "garden"?

{{< gdql >}}
SONGS WITH LYRICS("rose", "garden") AS COUNT;
{{< /gdql >}}

---

## FIRST and LAST

The very first time Help on the Way was played:

{{< gdql >}}
FIRST "Help on the Way";
{{< /gdql >}}

The last time the band ever played Saint Stephen:

{{< gdql >}}
LAST "Saint Stephen";
{{< /gdql >}}

The last Dark Star (a famous bookend, March 30, 1994):

{{< gdql >}}
LAST "Dark Star";
{{< /gdql >}}

---

## Comparing eras

How many shows in each era? Run these and compare:

{{< gdql >}}
COUNT SHOWS FROM PRIMAL;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM EUROPE72;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM BRENT_ERA;
{{< /gdql >}}

{{< gdql >}}
COUNT SHOWS FROM VINCE_ERA;
{{< /gdql >}}

---

## Discovery: random show from a specific era

Surprise me with a show from each era:

{{< gdql >}}
RANDOM SHOW FROM PRIMAL;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM EUROPE72;
{{< /gdql >}}

{{< gdql >}}
RANDOM SHOW FROM BRENT_ERA;
{{< /gdql >}}

---

## Lyric search across eras

Songs about water, written in the early years:

{{< gdql >}}
SONGS WITH LYRICS("water") WRITTEN 1968-1972;
{{< /gdql >}}

Songs that mention both trains and mountains:

{{< gdql >}}
SONGS WITH LYRICS("train", "mountain");
{{< /gdql >}}

Songs about the sun, just count them:

{{< gdql >}}
SONGS WITH LYRICS("sun") AS COUNT;
{{< /gdql >}}

---

## Output format showcase

Get the same data in different shapes:

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977 LIMIT 5 AS JSON;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977 LIMIT 5 AS CSV;
{{< /gdql >}}

---

## The Cornell '77 question

Three different ways to ask about the most famous show:

{{< gdql >}}
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Barton Hall";
{{< /gdql >}}

{{< gdql >}}
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Morning Dew" ORDER BY DATE;
{{< /gdql >}}

---

## Quick reference

| Pattern | Example |
|---------|---------|
| Venue + era + segue + condition | `SHOWS AT "X" FROM era WHERE "A" > "B" AND PLAYED "C"` |
| Three-song chain + AND | `SHOWS WHERE "A" > "B" > "C" AND PLAYED "D"` |
| Count over a date range | `COUNT "song" FROM start-end` (or `AFTER`/`BEFORE`) |
| Songs as count with filter | `SONGS WITH LYRICS("x", "y") AS COUNT` |
| Random within era | `RANDOM SHOW FROM era` |
| Open-set position | `SHOWS WHERE OPENER "X" FROM year` |
