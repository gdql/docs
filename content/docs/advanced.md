---
title: Advanced queries
description: "Complex multi-clause GDQL queries showing what the language can do."
weight: 14
---

# Advanced queries

Real Deadhead questions answered with chained, multi-clause GDQL. Every example below was verified to return real results against the live dataset. Click **▶ Try it** to run any query in the [sandbox](https://sandbox.gdql.dev).

---

## NOT PLAYED — exclusion queries

Find shows that included one song but excluded another. Great for catching unusual omissions or finding the post-Pigpen / post-Brent eras.

{{< gdql >}}
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen" LIMIT 10;
{{< /gdql >}}

Scarlet Begonias played without Fire on the Mountain (rare after Fire's 1977 debut):

{{< gdql >}}
SHOWS AFTER 1980 WHERE PLAYED "Scarlet Begonias" AND NOT PLAYED "Fire on the Mountain" LIMIT 10;
{{< /gdql >}}

Short form — `NOT "X"` works without the `PLAYED` keyword:

{{< gdql >}}
SHOWS WHERE PLAYED "Truckin'" AND NOT "Drums" LIMIT 10;
{{< /gdql >}}

---

## Multi-clause filtering

Compose venue, era, segue, and additional conditions:

{{< gdql >}}
SHOWS AT "Winterland" FROM 1977-1978 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet" ORDER BY DATE LIMIT 10;
{{< /gdql >}}

Fillmore '69 shows that opened with Dark Star and also played Saint Stephen:

{{< gdql >}}
SHOWS AT "Fillmore" FROM 1969 WHERE OPENER "Dark Star" AND PLAYED "Saint Stephen";
{{< /gdql >}}

Eyes of the World performances in 1974 (the song's first full year):

{{< gdql >}}
COUNT "Eyes of the World" FROM 1974;
{{< /gdql >}}

---

## Three-song segues with extra conditions

The legendary Help > Slip > Frank that *also* featured Dark Star — turns out it only ever happened once: 9/10/91 at Madison Square Garden.

{{< gdql >}}
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower" AND PLAYED "Dark Star";
{{< /gdql >}}

The classic primal trio at the Fillmore West:

{{< gdql >}}
SHOWS AT "Fillmore West" WHERE "Dark Star" > "Saint Stephen" > "The Eleven" ORDER BY DATE;
{{< /gdql >}}

China > Rider at the Spectrum in Philly:

{{< gdql >}}
SHOWS AT "Spectrum" WHERE "China Cat Sunflower" > "I Know You Rider";
{{< /gdql >}}

---

## Set position with date filters

Shows opened with Bertha during the early Brent era:

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

How many Scarlet Begonias performances after 1977?

{{< gdql >}}
COUNT "Scarlet Begonias" AFTER 1977;
{{< /gdql >}}

How many songs in the catalog mention both "sun" and "shine"?

{{< gdql >}}
SONGS WITH LYRICS("sun", "shine") AS COUNT;
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

How many shows in each era?

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

## Lyric search

Songs that mention both the sun and shine:

{{< gdql >}}
SONGS WITH LYRICS("sun", "shine");
{{< /gdql >}}

Songs about trains and roads:

{{< gdql >}}
SONGS WITH LYRICS("train", "road");
{{< /gdql >}}

Just the count for "rose":

{{< gdql >}}
SONGS WITH LYRICS("rose") AS COUNT;
{{< /gdql >}}

---

## Output format showcase

Same data, different shapes:

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
| Exclusion | `SHOWS WHERE PLAYED "X" AND NOT PLAYED "Y"` |
| Count over a date range | `COUNT "song" AFTER year` (or `BEFORE`/`FROM`) |
| Songs as count with filter | `SONGS WITH LYRICS("x", "y") AS COUNT` |
| Random within era | `RANDOM SHOW FROM era` |
| Open-set position | `SHOWS FROM year WHERE OPENER "X"` |
