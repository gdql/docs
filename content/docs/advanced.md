---
title: Advanced queries
description: "Complex GDQL queries showing off the language: counts, first/last, random shows, multi-segue chains, combined filters."
weight: 13
---

# Advanced queries

Real Deadhead questions, answered with GDQL. Click **Try it** to run any query in the [sandbox](https://sandbox.gdql.dev).

---

## How many?

`COUNT` aggregates without listing rows.

```gdql
-- How many shows in 1977?
COUNT SHOWS FROM 1977;

-- How many times was Dark Star played?
COUNT "Dark Star";

-- How many Dark Stars after the 1988 reunion?
COUNT "Dark Star" AFTER 1988;

-- How many songs mention "sun"?
SONGS WITH LYRICS("sun") AS COUNT;
```

[Try: shows in '77](https://sandbox.gdql.dev?q=Q09VTlQgU0hPV1MgRlJPTSAxOTc3Ow&run=1) | [Try: Dark Star total](https://sandbox.gdql.dev?q=Q09VTlQgIkRhcmsgU3RhciI7&run=1) | [Try: Dark Star after '88](https://sandbox.gdql.dev?q=Q09VTlQgIkRhcmsgU3RhciIgQUZURVIgMTk4ODs&run=1) | [Try: lyrics count](https://sandbox.gdql.dev?q=U09OR1MgV0lUSCBMWVJJQ1MoInN1biIpIEFTIENPVU5UOw&run=1)

---

## First and last performances

`FIRST` and `LAST` jump straight to a song's earliest and latest live show.

```gdql
-- The first time the band played Dark Star
FIRST "Dark Star";

-- And the last
LAST "Dark Star";

-- Last time Saint Stephen was played
LAST "Saint Stephen";
```

[Try: First Dark Star](https://sandbox.gdql.dev?q=RklSU1QgIkRhcmsgU3RhciI7&run=1) | [Try: Last Dark Star](https://sandbox.gdql.dev?q=TEFTVCAiRGFyayBTdGFyIjs&run=1) | [Try: Last St. Stephen](https://sandbox.gdql.dev?q=TEFTVCAiU2FpbnQgU3RlcGhlbiI7&run=1)

---

## Random show

Pick a setlist at random — great for discovery, or settling arguments.

```gdql
-- Surprise me
RANDOM SHOW;

-- Surprise me, but only from 1977
RANDOM SHOW FROM 1977;
```

[Try: any show](https://sandbox.gdql.dev?q=UkFORE9NIFNIT1c7&run=1) | [Try: from '77](https://sandbox.gdql.dev?q=UkFORE9NIFNIT1cgRlJPTSAxOTc3Ow&run=1)

---

## Open-ended date ranges

`AFTER` and `BEFORE` work where you'd use `FROM` for a range.

```gdql
-- Shows after the Brent era ended
SHOWS AFTER 1990 LIMIT 10;

-- Pre-1970 Dark Star sightings
SHOWS BEFORE 1970 WHERE PLAYED "Dark Star";

-- Count Dark Stars across the entire reunion era
COUNT "Dark Star" AFTER 1988;
```

[Try: pre-1970 Dark Star](https://sandbox.gdql.dev?q=U0hPV1MgQkVGT1JFIDE5NzAgV0hFUkUgUExBWUVEICJEYXJrIFN0YXIiOw&run=1)

---

## Three-song segue chains

Chain `>` operators to find specific song sequences.

```gdql
-- The classic primal trio
SHOWS WHERE "Dark Star" > "Saint Stephen" > "The Eleven";

-- Help > Slip > Frank
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";

-- Help > Slip > Frank with Dark Star anywhere in the show
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower"
  AND PLAYED "Dark Star";
```

[Try: Dark Star > St. Stephen > The Eleven](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgIkRhcmsgU3RhciIgPiAiU2FpbnQgU3RlcGhlbiIgPiAiVGhlIEVsZXZlbiI7&run=1) | [Try: Help > Slip > Frank](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgIkhlbHAgb24gdGhlIFdheSIgPiAiU2xpcGtub3QhIiA-ICJGcmFua2xpbidzIFRvd2VyIjs&run=1) | [Try: H>S>F + Dark Star](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgIkhlbHAgb24gdGhlIFdheSIgPiAiU2xpcGtub3QhIiA-ICJGcmFua2xpbidzIFRvd2VyIiBBTkQgUExBWUVEICJEYXJrIFN0YXIiOw&run=1)

---

## Openers and closers

`OPENER` and `CLOSER` find any set opened/closed with a song (no need to specify SET1/SET2).

```gdql
-- Every show that opened (any set) with Bertha
SHOWS WHERE OPENER "Bertha";

-- Every show that ended a set with Morning Dew
SHOWS WHERE CLOSER "Morning Dew";
```

[Try: Bertha opener](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgT1BFTkVSICJCZXJ0aGEiOw&run=1) | [Try: Dew closer](https://sandbox.gdql.dev?q=U0hPV1MgV0hFUkUgQ0xPU0VSICJNb3JuaW5nIERldyI7&run=1)

---

## Filter by tour

`TOUR` matches the tour name (partial match).

```gdql
SHOWS TOUR "Spring 1977";
SHOWS TOUR "Europe 72";
```

[Try: Spring '77 tour](https://sandbox.gdql.dev?q=U0hPV1MgVE9VUiAiU3ByaW5nIDE5NzciOw&run=1) | [Try: Europe '72](https://sandbox.gdql.dev?q=U0hPV1MgVE9VUiAiRXVyb3BlIDcyIjs&run=1)

---

## Combine venue, date, and segue

GDQL clauses compose freely. The order is `AT → TOUR → FROM/BEFORE/AFTER → WHERE → ORDER BY → LIMIT → AS`.

```gdql
-- Scarlet > Fire at Winterland (any year)
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Dark Star at the Fillmore in 1969
SHOWS AT "Fillmore" FROM 1969 WHERE PLAYED "Dark Star";

-- China > Rider at the Spectrum in Philly
SHOWS AT "Spectrum" WHERE "China Cat Sunflower" INTO "I Know You Rider";

-- Eyes of the World during the Europe '72 tour
SHOWS FROM EUROPE72 WHERE PLAYED "Eyes of the World";
```

[Try: Winterland Scarlet > Fire](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIldpbnRlcmxhbmQiIFdIRVJFICJTY2FybGV0IEJlZ29uaWFzIiA-ICJGaXJlIG9uIHRoZSBNb3VudGFpbiI7&run=1) | [Try: Fillmore '69 + Dark Star](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIkZpbGxtb3JlIiBGUk9NIDE5NjkgV0hFUkUgUExBWUVEICJEYXJrIFN0YXIiOw&run=1) | [Try: China > Rider Spectrum](https://sandbox.gdql.dev?q=U0hPV1MgQVQgIlNwZWN0cnVtIiBXSEVSRSAiQ2hpbmEgQ2F0IFN1bmZsb3dlciIgSU5UTyAiSSBLbm93IFlvdSBSaWRlciI7&run=1) | [Try: Eyes Europe '72](https://sandbox.gdql.dev?q=U0hPV1MgRlJPTSBFVVJPUEU3MiBXSEVSRSBQTEFZRUQgIkV5ZXMgb2YgdGhlIFdvcmxkIjs&run=1)

---

## Lyrics search across the catalog

`SONGS WITH LYRICS(...)` matches songs whose lyrics contain all listed words.

```gdql
-- Songs about both the sun and shine
SONGS WITH LYRICS("sun", "shine");

-- Songs that mention trains and roads
SONGS WITH LYRICS("train", "road");

-- Just count them
SONGS WITH LYRICS("sun") AS COUNT;
```

[Try: sun + shine](https://sandbox.gdql.dev?q=U09OR1MgV0lUSCBMWVJJQ1MoInN1biIsICJzaGluZSIpOw&run=1) | [Try: train + road](https://sandbox.gdql.dev?q=U09OR1MgV0lUSCBMWVJJQ1MoInRyYWluIiwgInJvYWQiKTs&run=1)

---

## Fuzzy song matching

GDQL forgives spelling and punctuation differences. Type `Truckin` and you'll get `Truckin'`. Type `St Stephen` and you'll get `St. Stephen`.

```gdql
-- These all work
COUNT "Truckin";
COUNT "Truckin'";
COUNT "TRUCKIN";

LAST "St Stephen";
LAST "Saint Stephen";

FIRST "Franklins Tower";
FIRST "Franklin's Tower";
```

[Try: Truckin (fuzzy)](https://sandbox.gdql.dev?q=Q09VTlQgIlRydWNraW4iOw&run=1)

---

## Quick reference

| What | Example |
|------|---------|
| Count shows | `COUNT SHOWS FROM 1977` |
| Count song plays | `COUNT "Dark Star"` |
| First / last performance | `FIRST "Dark Star"` / `LAST "Dark Star"` |
| Random show | `RANDOM SHOW [FROM year]` |
| Years from X onward | `SHOWS AFTER 1988` |
| Years up to X | `SHOWS BEFORE 1970` |
| Any-set opener | `SHOWS WHERE OPENER "Bertha"` |
| Any-set closer | `SHOWS WHERE CLOSER "Morning Dew"` |
| Tour filter | `SHOWS TOUR "Spring 1977"` |
| Venue + segue | `SHOWS AT "Winterland" WHERE "A" > "B"` |
| Bare song = PLAYED | `SHOWS WHERE "Bertha"` |
| Songs as count | `SONGS WITH LYRICS("sun") AS COUNT` |
