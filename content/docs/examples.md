---
title: Example queries
description: "Ready-to-run GDQL: shows by year and venue, segues, setlists, song search, performances, output formats."
weight: 12
---


This page is the cookbook. Every query below is verified against the live database and ready to run — click **▶ Try it in sandbox** under any block to open it in the [sandbox](https://sandbox.gdql.dev). For multi-clause questions, jump to [Advanced queries]({{< relref "advanced" >}}). For the full grammar, see the [language reference]({{< relref "reference" >}}).

---

## Shows by year and era

Use `FROM` with a year, a range, or a named era. Two-digit shorthand always means 19xx.

{{< gdql >}}
SHOWS FROM 1977;              -- every show in '77
SHOWS FROM 1977-1980 ORDER BY DATE;  -- year range
SHOWS FROM PRIMAL;            -- 1965-1969
SHOWS FROM EUROPE72;          -- the legendary spring '72 tour
SHOWS FROM BRENT_ERA;         -- 1979-1990
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1972 ORDER BY DATE DESC LIMIT 5;
{{< /gdql >}}

---

## Shows at a venue or city

`AT` does a partial-match lookup against venues and cities. `AT "Fillmore"` matches both Fillmore West and Fillmore East; `AT "New York"` matches every NYC venue.

{{< gdql >}}
SHOWS AT "Fillmore West" FROM 1969;
SHOWS AT "Winterland" FROM 1977;
SHOWS AT "New York" LIMIT 20;
SHOWS AT "Madison Square Garden" LIMIT 10;
{{< /gdql >}}

---

## Segue queries

Find shows where one song flowed into another. The `>` operator matches songs that are adjacent in the setlist (position-based). `>>` (or `THEN`) means *followed by, with a pause*. `->` is an alias for `>`. Chain multiple songs to match multi-song sequences.

{{< gdql >}}
-- The classic Scarlet > Fire
SHOWS FROM 77-80 WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Three-song chain
SHOWS WHERE "Help on the Way" > "Slipknot!" > "Franklin's Tower";

-- INTO is an alias for >
SHOWS WHERE "China Cat Sunflower" INTO "I Know You Rider";
{{< /gdql >}}

{{< gdql >}}
-- Followed by, with a break
SHOWS WHERE "Estimated Prophet" THEN "Eyes of the World";

-- Arrow alias: -> is the same as >
SHOWS WHERE "Dark Star" -> "Saint Stephen";
{{< /gdql >}}

---

## How many times was it played?

`COUNT` is the fast answer for "how many?" questions.

{{< gdql >}}
COUNT "Dark Star";
COUNT "Scarlet Begonias";
COUNT "Dark Star" FROM 1972-1974;
COUNT "Scarlet Begonias" AFTER 1977;
COUNT "Saint Stephen" BEFORE 1972;
{{< /gdql >}}

---

## Set position

Filter by where a song appeared in the show structure: opener, set 1 closer, encore, etc.

{{< gdql >}}
SHOWS WHERE SET1 OPENED "Jack Straw";
SHOWS WHERE OPENER "Bertha";
SHOWS WHERE SET2 CLOSED "Sugar Magnolia";
SHOWS WHERE ENCORE = "U.S. Blues";
SHOWS WHERE CLOSER "Morning Dew";
{{< /gdql >}}

---

## Played

`PLAYED` is the simple "this song appeared somewhere in the show" filter.

{{< gdql >}}
SHOWS WHERE PLAYED "Dark Star" AND PLAYED "Saint Stephen";
SHOWS FROM 1977 WHERE PLAYED "Eyes of the World";
{{< /gdql >}}

---

## Combining conditions

Stack `AND` and `OR` to build sharper questions.

{{< gdql >}}
-- Scarlet > Fire AND Estimated Prophet, all in '77
SHOWS FROM 1977 WHERE "Scarlet Begonias" > "Fire on the Mountain" AND PLAYED "Estimated Prophet";

-- Same segue, only at Winterland
SHOWS AT "Winterland" WHERE "Scarlet Begonias" > "Fire on the Mountain";

-- Shows opened by either Jack Straw or Bertha
SHOWS WHERE SET1 OPENED "Jack Straw" OR SET1 OPENED "Bertha";
{{< /gdql >}}

---

## Setlist for a date

Pull the full setlist for one show. Use M/D/YY or YYYY-MM-DD format.

{{< gdql >}}
-- Cornell '77 — the famous one
SETLIST FOR 5/8/77;
{{< /gdql >}}

{{< gdql >}}
-- Compare two nights of the Winterland run
SETLIST FOR 12/30/78;
SETLIST FOR 12/31/78;
{{< /gdql >}}

{{< gdql >}}
-- Find a show, then get its setlist
SHOWS WHERE CLOSER "U.S. Blues" AND OPENER "One More Saturday Night" LIMIT 1;
SETLIST 1974-10-19;
{{< /gdql >}}

---

## Song search by lyrics

Search the lyric database. Words are matched as whole words (not substrings), and multiple words are AND-ed together — every word must appear.

{{< gdql >}}
SONGS WITH LYRICS("sun");
SONGS WITH LYRICS("train", "road");
SONGS WITH LYRICS("rose") AS COUNT;
{{< /gdql >}}

---

## Performances of a song

`PERFORMANCES OF` returns one row per time a song was played, with date and venue.

{{< gdql >}}
PERFORMANCES OF "Dark Star";
PERFORMANCES OF "Dark Star" FROM 1972-1974;
PERFORMANCES OF "Scarlet Begonias" FROM 77-79 ORDER BY DATE DESC LIMIT 20;
{{< /gdql >}}

---

## Output formats

Default output is an aligned table. Use `AS` to switch to JSON, CSV, or an inline-setlist view.

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS JSON;
{{< /gdql >}}

{{< gdql >}}
SHOWS FROM 1977 LIMIT 3 AS CSV;
{{< /gdql >}}

Pipe JSON output into `jq` to slice and dice in the shell:

```bash
gdql "SHOWS FROM 1977 AS JSON" | jq '.[].venue' | sort -u
```

---

## Most played songs

{{< gdql >}}
SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20;
{{< /gdql >}}

---

## Quick reference

| Goal | Example |
|------|---------|
| Shows in a year | `SHOWS FROM 1977` |
| Shows at a venue | `SHOWS AT "Fillmore West"` |
| Famous segue | `SHOWS WHERE "Scarlet Begonias" > "Fire on the Mountain"` |
| How many times? | `COUNT "Dark Star"` |
| Setlist for a date | `SETLIST FOR 5/8/77` or `SETLIST 1977-05-08` |
| Songs with lyrics | `SONGS WITH LYRICS("train", "road")` |
| Most played songs | `SONGS ORDER BY TIMES_PLAYED DESC LIMIT 20` |
| Performances in a range | `PERFORMANCES OF "Dark Star" FROM 1972-1974` |
| Opener / closer | `SHOWS WHERE OPENER "Jack Straw"` |
| Opener segue chain | `SHOWS WHERE OPENER "Help on the Way" > "Slipknot!"` |
| Encore | `SHOWS WHERE ENCORE = "U.S. Blues"` |
| Random show in an era | `RANDOM SHOW FROM EUROPE72` |
| First / last performance | `FIRST "Help on the Way"`, `LAST "Saint Stephen"` |

Want more complex examples? See [Advanced queries]({{< relref "advanced" >}}).
