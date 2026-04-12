---
title: Cookbook
description: "Copy-paste GDQL query recipes for Grateful Dead setlists, segues, song counts, openers, closers, Cornell 77, and every question a Deadhead might ask."
weight: 12
---


Every query on this page is verified against the live database. Click **▶ Try it in sandbox** to run any block. For the full grammar, see the [language reference]({{< relref "reference" >}}).

> - Setlists from [Deadlists](http://www.setlists.net), lyrics via [Relisten](https://relisten.net)
> - The `>` operator means "next song" — not necessarily a musical segue
> - Spot something wrong? [Start a discussion](https://github.com/gdql/gdql/discussions)

For every query pattern at a glance, see the **[Cheat Sheet]({{< relref "cheat-sheet" >}})**.

---

## What shows were played?

{{< gdql >}}
SHOWS FROM 1977;                              -- all '77 shows
SHOWS FROM 1977-1980 ORDER BY DATE;           -- year range
SHOWS FROM PRIMAL;                            -- 1965-1969
SHOWS FROM EUROPE72;                          -- spring '72 tour
SHOWS FROM WALLOFSOUND;                       -- 1974 (the Wall of Sound year)
SHOWS FROM BRENT_ERA;                         -- 1979-1990
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;   -- most recent first
{{< /gdql >}}

{{< gdql >}}
SHOWS AT "Fillmore West" FROM 1969;
SHOWS AT "Winterland" FROM 1977;
SHOWS AT "New York" LIMIT 20;
SHOWS AT "Madison Square Garden" LIMIT 10;
{{< /gdql >}}

---

## What happened at a specific show?

Paste a date from any SHOWS result — M/D/YY or YYYY-MM-DD both work. `FOR` is optional.

{{< gdql >}}
SETLIST FOR 5/8/77;        -- Cornell '77
SETLIST 1977-05-08;        -- same show, ISO format
{{< /gdql >}}

{{< gdql >}}
-- Find a show, then get its setlist
SHOWS WHERE CLOSER "U.S. Blues" AND OPENER "One More Saturday Night" LIMIT 1;
SETLIST 1974-10-19;
{{< /gdql >}}

{{< gdql >}}
-- Compare two nights of a run
SETLIST FOR 12/30/78;
SETLIST FOR 12/31/78;
{{< /gdql >}}

{{< gdql >}}
-- Expand every Scarlet > Fire show into full setlists
SHOWS FROM 77-78 WHERE "Scarlet Begonias" > "Fire on the Mountain" AS SETLIST;
{{< /gdql >}}

---

## Did they segue?

The `>` operator matches songs adjacent in the setlist. `>>` means followed by with a break. `->` is an alias for `>`. Chain as many as you want.

{{< gdql >}}
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
SHOWS WHERE "Dark Star" -> "Saint Stephen";
{{< /gdql >}}

### When did they NOT segue?

`NOT INTO` finds shows where Song A was played but Song B didn't follow.

{{< gdql >}}
-- Scarlet without the Fire segue
SHOWS WHERE "Scarlet Begonias" NOT INTO "Fire on the Mountain" LIMIT 10;

-- China Cat without Rider
SHOWS WHERE "China Cat Sunflower" !> "I Know You Rider" LIMIT 10;

-- Help > Slip happened but Franklin's Tower did NOT follow
SHOWS WHERE "Help on the Way" > "Slipknot!" !> "Franklin's Tower" LIMIT 10;
{{< /gdql >}}

---

## How many times?

{{< gdql >}}
COUNT "Dark Star";
COUNT "Scarlet Begonias";
COUNT "Dark Star" FROM 1972-1974;
COUNT "Scarlet Begonias" AFTER 1977;
COUNT SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";
COUNT SHOWS WHERE OPENER "Bertha";
{{< /gdql >}}

---

## What songs were most popular?

{{< gdql >}}
-- All-time most played
SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20;
{{< /gdql >}}

{{< gdql >}}
-- Most played in a specific year
SONGS FROM 1977 ORDER BY TIMES_PLAYED DESC LIMIT 20;
{{< /gdql >}}

{{< gdql >}}
-- Most played in an era
SONGS FROM EUROPE72 ORDER BY TIMES_PLAYED DESC LIMIT 10;
SONGS FROM BRENT_ERA ORDER BY TIMES_PLAYED DESC LIMIT 10;
{{< /gdql >}}

---

## Who opened? Who closed?

{{< gdql >}}
SHOWS WHERE OPENER "Bertha";
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
SHOWS WHERE CLOSER "Morning Dew";
SHOWS WHERE ENCORE "U.S. Blues";
{{< /gdql >}}

### Opener/closer segue chains

{{< gdql >}}
SHOWS WHERE OPENER "Help on the Way" > "Slipknot!";
SHOWS WHERE CLOSER "Throwin' Stones" > "Not Fade Away";
SHOWS WHERE OPENER "Help on the Way" > "Slipknot!" AND CLOSER "Brokedown Palace";
{{< /gdql >}}

### What if they DIDN'T open/close with it?

{{< gdql >}}
-- Played U.S. Blues but NOT as the encore
SHOWS WHERE PLAYED "U.S. Blues" AND NOT ENCORE "U.S. Blues" LIMIT 10;

-- Played And We Bid You Goodnight but NOT as the closer
SHOWS WHERE PLAYED "And We Bid You Goodnight" AND NOT CLOSED "And We Bid You Goodnight" LIMIT 10;
{{< /gdql >}}

---

## Exclusion: what WASN'T played?

{{< gdql >}}
-- Dark Star without Saint Stephen
SHOWS WHERE PLAYED "Dark Star" AND NOT PLAYED "Saint Stephen" LIMIT 10;

-- Scarlet without Fire (after Fire's 1977 debut — vanishingly rare)
SHOWS AFTER 1980 WHERE PLAYED "Scarlet Begonias" AND NOT PLAYED "Fire on the Mountain" LIMIT 10;

-- Truckin' without Drums
SHOWS WHERE PLAYED "Truckin'" AND NOT "Drums" LIMIT 10;
{{< /gdql >}}

---

## Stack conditions with AND / OR

{{< gdql >}}
-- Scarlet > Fire AND Estimated Prophet, all in '77
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet";

-- Shows opened by either Jack Straw or Bertha
SHOWS WHERE OPENER "Jack Straw" OR OPENER "Bertha" LIMIT 20;

-- Winterland Scarlet > Fire shows
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";
{{< /gdql >}}

---

## Multi-song chains with extra conditions

{{< gdql >}}
-- Help > Slip > Frank that ALSO had Dark Star (4 shows: 6/14/91 RFK, 9/10/91 MSG, 10/31/91 Oakland, 9/22/93 MSG)
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower" AND PLAYED "Dark Star";

-- The primal trio at Fillmore West
SHOWS AT "Fillmore West" WHERE "Dark Star" > "Saint Stephen" > "The Eleven" ORDER BY DATE;

-- China > Rider at the Spectrum
SHOWS AT "Spectrum" WHERE "China Cat Sunflower" > "I Know You Rider";
{{< /gdql >}}

---

## Find songs by lyrics

Words are matched as whole words — `"sun"` won't match "Sunday".

{{< gdql >}}
SONGS WITH LYRICS("sun");
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("sun") AND LYRICS("train");
SONGS WITH LYRICS("rose") AS COUNT;
{{< /gdql >}}

---

## First and last

{{< gdql >}}
FIRST "Help on the Way";
LAST "Saint Stephen";
LAST "Dark Star";    -- a famous bookend: March 30, 1994
{{< /gdql >}}

`FIRST` and `LAST` are song-specific. To find the very first or very last *show* (e.g. Jerry's farewell at Soldier Field on 7/9/95), sort `SHOWS` by date:

{{< gdql >}}
SHOWS ORDER BY DATE LIMIT 1;        -- the first show in the database
SHOWS ORDER BY DATE DESC LIMIT 1;   -- the last show — Jerry's final
{{< /gdql >}}

---

## Compare eras

{{< gdql >}}
COUNT SHOWS FROM PRIMAL;
COUNT SHOWS FROM EUROPE72;
COUNT SHOWS FROM BRENT_ERA;
COUNT SHOWS FROM VINCE_ERA;
{{< /gdql >}}

---

## How long did they jam?

Track durations are sourced from archive.org recordings (~48% coverage). Use `ORDER BY LENGTH` to find the marathon versions and `WITH LENGTH` to filter.

{{< gdql >}}
-- The longest Dark Stars ever played
PERFORMANCES OF "Dark Star" ORDER BY LENGTH DESC LIMIT 10;

-- Playing in the Band jams over 20 minutes
PERFORMANCES OF "Playing in the Band" WITH LENGTH > 20min;

-- Quick Sugareees (under 6 minutes)
PERFORMANCES OF "Sugaree" WITH LENGTH < 6min ORDER BY LENGTH LIMIT 5;

-- Longest Eyes of the World from 1974
PERFORMANCES OF "Eyes of the World" FROM 1974 ORDER BY LENGTH DESC LIMIT 5;
{{< /gdql >}}

---

## Surprise me

{{< gdql >}}
RANDOM SHOW FROM PRIMAL;
RANDOM SHOW FROM EUROPE72;
RANDOM SHOW FROM BRENT_ERA;
{{< /gdql >}}

---

## The Cornell '77 question

Three ways to find the most famous show:

{{< gdql >}}
SETLIST FOR 5/8/77;  -- by date
SHOWS AT "Barton Hall";  -- by venue
SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Morning Dew" ORDER BY DATE;  -- by setlist
{{< /gdql >}}

---

## Output formats

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS JSON;
SHOWS FROM 1977 LIMIT 3 AS CSV;
{{< /gdql >}}

Pipe JSON into `jq` on the CLI:

```bash
gdql "SHOWS FROM 1977 AS JSON" | jq '.shows[].venue' | sort -u
```

---

## Quick reference

| Question | Query |
|----------|-------|
| Shows in a year | `SHOWS FROM 1977` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Full setlist | `SETLIST FOR 5/8/77` or `SETLIST 1977-05-08` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| Broken segue | `SHOWS WHERE "Scarlet Begonias" NOT INTO "Fire on the Mountain"` |
| How many times? | `COUNT "Dark Star"` |
| Count with filter | `COUNT SHOWS WHERE OPENER "Bertha"` |
| Most played songs | `SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20` |
| Most played in a year | `SONGS FROM 1977 ORDER BY TIMES_PLAYED DESC` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Opener / closer | `SHOWS WHERE OPENER "Jack Straw"` |
| Opener chain | `SHOWS WHERE OPENER "Help on the Way" > "Slipknot!"` |
| NOT the closer | `SHOWS WHERE PLAYED "X" AND NOT CLOSED "X"` |
| Encore | `SHOWS WHERE ENCORE "U.S. Blues"` |
| Exclusion | `SHOWS WHERE PLAYED "X" AND NOT PLAYED "Y"` |
| First / last | `FIRST "Help on the Way"`, `LAST "Dark Star"` |
| Random show | `RANDOM SHOW FROM EUROPE72` |
| Output format | `SHOWS FROM 1977 LIMIT 3 AS JSON` |
