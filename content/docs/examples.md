---
title: Example queries
description: "Ready-to-run GDQL: shows by year and venue, segues, setlists, song search, performances, output formats."
weight: 12
---


This page is the cookbook. Every query below is verified against the live database and ready to run — click **Try it** under any block to open it in the [sandbox](https://sandbox.gdql.dev). For multi-clause questions, jump to [Advanced queries]({{< relref "advanced" >}}). For the full grammar, see the [language reference]({{< relref "reference" >}}).

---

## Shows by year and era

Use `FROM` with a year, a range, or a named era. Two-digit shorthand always means 19xx.

```gdql
-- Every show in 1977
SHOWS FROM 1977;

-- Two-digit years (77 = 1977)
SHOWS FROM 77;

-- Year range, sorted oldest first
SHOWS FROM 1977-1980 ORDER BY DATE;

-- Named eras
SHOWS FROM PRIMAL;       -- 1965-1969
SHOWS FROM EUROPE72;     -- The legendary spring '72 tour
SHOWS FROM BRENT_ERA;    -- 1979-1990

-- Most recent 1972 shows, newest first
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
```

---

## Shows at a venue or city

`AT` does a partial-match lookup against venues and cities. `AT "Fillmore"` matches both Fillmore West and Fillmore East; `AT "New York"` matches every NYC venue.

```gdql
-- Fillmore West shows in 1969
SHOWS AT "Fillmore West" FROM 1969;

-- Winterland in 1977
SHOWS AT "Winterland" FROM 1977;

-- Anywhere in New York
SHOWS AT "New York" LIMIT 20;

-- The big rooms
SHOWS AT "Madison Square Garden" LIMIT 10;
```

---

## Segue queries

Find shows where one song flowed into another. The `>` operator matches songs that are adjacent in the setlist (position-based). `>>` (or `THEN`) means *followed by, with a pause*. Chain multiple songs to match multi-song sequences.

```gdql
-- The classic Scarlet > Fire
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Three-song chain (only matches when all three transitions are exact)
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";

-- INTO is an alias for >
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
```

Other transition types:

```gdql
-- Followed by, with a break
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";

-- Arrow alias: -> is the same as >
SHOWS WHERE "Dark Star" -> "Saint Stephen";
```

---

## How many times was it played?

`COUNT` is the fast answer for "how many?" questions.

```gdql
COUNT "Dark Star";
COUNT "Scarlet Begonias";

-- Constrain to a date range
COUNT "Dark Star" FROM 1972-1974;

-- Or to a single side of a year
COUNT "Scarlet Begonias" AFTER 1977;
COUNT "Saint Stephen" BEFORE 1972;
```

---

## Set position

Filter by where a song appeared in the show structure: opener, set 1 closer, encore, etc.

```gdql
-- First-set openers
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE OPENER "Bertha";

-- Second-set closers
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";

-- Encore
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE ENCORE = "One More Saturday Night";

-- Show closer (last song of the night)
SHOWS WHERE CLOSER "Morning Dew";
```

---

## Played

`PLAYED` is the simple "this song appeared somewhere in the show" filter.

```gdql
-- Shows that played both Dark Star and Saint Stephen
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";

-- Eyes of the World in 1977
SHOWS FROM 1977 WHERE PLAYED "Eyes of the World";
```

---

## Combining conditions

Stack `AND` and `OR` to build sharper questions.

```gdql
-- Scarlet > Fire AND Estimated Prophet, all in '77
SHOWS FROM 1977
  WHERE "Scarlet Begonias" > "Fire on the Mountain"
    AND PLAYED "Estimated Prophet";

-- Same segue, only at Winterland
SHOWS AT "Winterland"
  WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Shows opened by either Jack Straw or Bertha
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
```

---

## Setlist for a date

Pull the full setlist for one show.

```gdql
-- Cornell '77 — the famous one
SETLIST FOR 5/8/77;

-- Closing of Winterland, New Year's '78
SETLIST FOR 12/31/78;

-- Veneta '72
SETLIST FOR 8/27/72;
```

---

## Song search by lyrics

Search the lyric database. Words are matched as whole words (not substrings), and multiple words are AND-ed together — every word must appear.

```gdql
-- Songs with "sun" in the lyrics
SONGS WITH LYRICS("sun");

-- Multiple keywords
SONGS WITH LYRICS("train", "road");

-- Just give me the count
SONGS WITH LYRICS("rose") AS COUNT;
```

---

## Performances of a song

`PERFORMANCES OF` returns one row per time a song was played, with date and venue.

```gdql
-- Every Dark Star performance
PERFORMANCES OF "Dark Star";

-- Constrain to the early 70s
PERFORMANCES OF "Dark Star" FROM 1972-1974;

-- Late-70s Scarlet, newest first
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
```

---

## Output formats

Default output is an aligned table. Use `AS` to switch to JSON, CSV, or an inline-setlist view.

```gdql
SHOWS FROM 1977 LIMIT 3 AS TABLE;
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
SHOWS FROM 1977 LIMIT 3 AS SETLIST;   -- expands each show with its setlist
```

Pipe JSON output into `jq` to slice and dice in the shell:

```bash
gdql "SHOWS FROM 1977 AS JSON" | jq '.[].venue' | sort -u
```

---

## Quick reference

| Goal | Example |
|------|---------|
| Shows in a year | `SHOWS FROM 1977` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| How many times? | `COUNT "Dark Star"` |
| Setlist for a date | `SETLIST FOR 5/8/77` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Performances in a range | `PERFORMANCES OF "Dark Star" FROM 1972-1974` |
| Opener / closer | `SHOWS WHERE OPENER "Jack Straw"` |
| Opener segue chain | `SHOWS WHERE OPENER ("Help on the Way" > "Slipknot!")` |
| Encore | `SHOWS WHERE ENCORE = "U.S. Blues"` |
| Random show in an era | `RANDOM SHOW FROM EUROPE72` |
| First / last performance | `FIRST "Help on the Way"`, `LAST "Saint Stephen"` |

Want more complex examples? See [Advanced queries]({{< relref "advanced" >}}).
